import { Order } from "./types";

const ORDERS_KEY = "bfl_orders_v1";

export function generateOrderId(): string {
  const stamp = Date.now().toString(36).toUpperCase().slice(-5);
  const rand = Math.random().toString(36).toUpperCase().slice(2, 5);
  return `BFL-${stamp}${rand}`;
}

export function saveOrder(order: Order) {
  const orders = getOrders();
  localStorage.setItem(ORDERS_KEY, JSON.stringify([order, ...orders]));
}

export function getOrders(): Order[] {
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function getOrdersForEmail(email: string): Order[] {
  return getOrders().filter(
    (o) => o.email.toLowerCase() === email.toLowerCase()
  );
}

export function getOrderById(id: string): Order | undefined {
  return getOrders().find((o) => o.id === id);
}
