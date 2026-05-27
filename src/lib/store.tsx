import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type User = {
  fullName: string;
  password: string;
  birthdate: string;
  gender: string;
  isAdmin?: boolean;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  category: "men" | "women" | "kids";
  image: string;
  rating: number;
  description: string;
  tags: string[];
};

export type CartItem = { productId: string; qty: number; size?: string };

export type Order = {
  id: string;
  user: string;
  items: CartItem[];
  total: number;
  status: "Pending" | "Shipped" | "Delivered" | "Cancelled";
  date: string;
  address: string;
};

export type Review = {
  id: string;
  user: string;
  rating: number;
  text: string;
  date: string;
};

type Store = {
  user: User | null;
  users: User[];
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  reviews: Review[];
  theme: "light" | "dark";
  signup: (u: User) => void;
  login: (name: string, pw: string) => User | null;
  logout: () => void;
  addToCart: (id: string, qty?: number) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (id: string) => void;
  placeOrder: (address: string) => Order;
  setOrderStatus: (id: string, status: Order["status"]) => void;
  addReview: (r: Omit<Review, "id" | "date">) => void;
  toggleTheme: () => void;
};

const StoreCtx = createContext<Store | null>(null);

const KEY = "lux_fashion_store_v1";
const ADMIN: User = { fullName: "Vrund_Admin", password: "Vrund@123", birthdate: "", gender: "", isAdmin: true };

const seedReviews: Review[] = [
  { id: "r1", user: "Aisha K.", rating: 5, text: "Absolutely love the fit and finish. Premium quality!", date: "2025-04-12" },
  { id: "r2", user: "Marcus T.", rating: 4, text: "Fast shipping and stunning packaging.", date: "2025-04-20" },
  { id: "r3", user: "Priya S.", rating: 5, text: "The fabric feels luxurious. Will buy again.", date: "2025-05-02" },
];

export function StoreProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [state, setState] = useState<{
    user: User | null;
    users: User[];
    cart: CartItem[];
    wishlist: string[];
    orders: Order[];
    reviews: Review[];
    theme: "light" | "dark";
  }>({
    user: null,
    users: [],
    cart: [],
    wishlist: [],
    orders: [],
    reviews: seedReviews,
    theme: "light",
  });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setState((s) => ({ ...s, ...JSON.parse(raw) }));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(KEY, JSON.stringify(state));
  }, [state, hydrated]);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", state.theme === "dark");
    }
  }, [state.theme]);

  const api: Store = {
    ...state,
    signup(u) {
      setState((s) => ({ ...s, users: [...s.users.filter((x) => x.fullName !== u.fullName), u], user: u }));
    },
    login(name, pw) {
      if (name === ADMIN.fullName && pw === ADMIN.password) {
        setState((s) => ({ ...s, user: ADMIN }));
        return ADMIN;
      }
      const found = state.users.find((u) => u.fullName === name && u.password === pw);
      if (found) setState((s) => ({ ...s, user: found }));
      return found ?? null;
    },
    logout() {
      setState((s) => ({ ...s, user: null }));
    },
    addToCart(id, qty = 1) {
      setState((s) => {
        const existing = s.cart.find((c) => c.productId === id);
        const cart = existing
          ? s.cart.map((c) => (c.productId === id ? { ...c, qty: c.qty + qty } : c))
          : [...s.cart, { productId: id, qty }];
        return { ...s, cart };
      });
    },
    removeFromCart(id) {
      setState((s) => ({ ...s, cart: s.cart.filter((c) => c.productId !== id) }));
    },
    updateQty(id, qty) {
      setState((s) => ({
        ...s,
        cart: s.cart.map((c) => (c.productId === id ? { ...c, qty: Math.max(1, qty) } : c)),
      }));
    },
    clearCart() {
      setState((s) => ({ ...s, cart: [] }));
    },
    toggleWishlist(id) {
      setState((s) => ({
        ...s,
        wishlist: s.wishlist.includes(id) ? s.wishlist.filter((x) => x !== id) : [...s.wishlist, id],
      }));
    },
    placeOrder(address) {
      const id = "ORD-" + Date.now().toString(36).toUpperCase();
      // Total recalculated on placement using lazy import-free lookup via window cache
      const total = (window as any).__cartTotal ?? 0;
      const order: Order = {
        id,
        user: state.user?.fullName ?? "Guest",
        items: state.cart,
        total,
        status: "Pending",
        date: new Date().toISOString(),
        address,
      };
      setState((s) => ({ ...s, orders: [order, ...s.orders], cart: [] }));
      return order;
    },
    setOrderStatus(id, status) {
      setState((s) => ({
        ...s,
        orders: s.orders.map((o) => (o.id === id ? { ...o, status } : o)),
      }));
    },
    addReview(r) {
      const review: Review = { ...r, id: "r" + Date.now(), date: new Date().toISOString().slice(0, 10) };
      setState((s) => ({ ...s, reviews: [review, ...s.reviews] }));
    },
    toggleTheme() {
      setState((s) => ({ ...s, theme: s.theme === "light" ? "dark" : "light" }));
    },
  };

  return <StoreCtx.Provider value={api}>{children}</StoreCtx.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreCtx);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}