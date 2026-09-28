"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type ItemPedido = {
  slug: string;
  nombre: string;
  precio: number;
  imagen: string;
  cantidad: number;
};

type PedidoContexto = {
  items: ItemPedido[];
  totalUnidades: number;
  totalPrecio: number;
  agregar: (item: Omit<ItemPedido, "cantidad">, cantidad?: number) => void;
  cambiarCantidad: (slug: string, cantidad: number) => void;
  quitar: (slug: string) => void;
  vaciar: () => void;
};

const STORAGE_KEY = "aura-pedido";

const Contexto = createContext<PedidoContexto | null>(null);

export function PedidoProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ItemPedido[]>([]);
  const [cargado, setCargado] = useState(false);

  // El pedido se guarda en el navegador para no perderlo al recargar.
  useEffect(() => {
    try {
      const guardado = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hidratación única desde localStorage
      if (guardado) setItems(JSON.parse(guardado));
    } catch {
      // localStorage no disponible (modo privado, etc.): el pedido queda en memoria.
    }
    setCargado(true);
  }, []);

  useEffect(() => {
    if (!cargado) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // idem arriba
    }
  }, [items, cargado]);

  const agregar: PedidoContexto["agregar"] = (item, cantidad = 1) => {
    setItems((actual) => {
      const existente = actual.find((i) => i.slug === item.slug);
      if (existente) {
        return actual.map((i) =>
          i.slug === item.slug ? { ...i, ...item, cantidad: i.cantidad + cantidad } : i
        );
      }
      return [...actual, { ...item, cantidad }];
    });
  };

  const cambiarCantidad = (slug: string, cantidad: number) => {
    setItems((actual) =>
      cantidad <= 0
        ? actual.filter((i) => i.slug !== slug)
        : actual.map((i) => (i.slug === slug ? { ...i, cantidad } : i))
    );
  };

  const quitar = (slug: string) => setItems((actual) => actual.filter((i) => i.slug !== slug));
  const vaciar = () => setItems([]);

  const totalUnidades = items.reduce((suma, i) => suma + i.cantidad, 0);
  const totalPrecio = items.reduce((suma, i) => suma + i.cantidad * i.precio, 0);

  return (
    <Contexto.Provider
      value={{ items, totalUnidades, totalPrecio, agregar, cambiarCantidad, quitar, vaciar }}
    >
      {children}
    </Contexto.Provider>
  );
}

export function usePedido() {
  const contexto = useContext(Contexto);
  if (!contexto) throw new Error("usePedido debe usarse dentro de <PedidoProvider>");
  return contexto;
}
