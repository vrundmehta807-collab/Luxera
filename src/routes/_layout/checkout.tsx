import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { findProduct } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const Route = createFileRoute("/_layout/checkout")({
  head: () => ({ meta: [{ title: "Checkout — LUXERA" }] }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { cart, placeOrder, user } = useStore();
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const items = cart.map((c) => ({ ...c, product: findProduct(c.productId)! })).filter((c) => c.product);
  const subtotal = items.reduce((s, c) => s + c.product.price * c.qty, 0);
  const shipping = subtotal > 200 ? 0 : 12;
  const total = subtotal + shipping;
  if (items.length === 0) return <div className="container mx-auto py-24 text-center"><h1 className="text-2xl font-bold">Nothing to check out.</h1></div>;
  return (
    <section className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold md:text-4xl">Checkout</h1>
      <div className="grid gap-8 lg:grid-cols-2">
        <form onSubmit={(e) => { e.preventDefault(); if (!user) { toast.error("Please login first."); navigate({ to: "/login" }); return; } const o = placeOrder(address); toast.success(`Order ${o.id} placed!`); navigate({ to: "/orders" }); }} className="glass-strong space-y-4 rounded-2xl p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div><Label>Full Name</Label><Input defaultValue={user?.fullName ?? ""} required /></div>
            <div><Label>Phone</Label><Input required /></div>
          </div>
          <div><Label>Shipping Address</Label><Textarea value={address} onChange={(e) => setAddress(e.target.value)} required rows={3} /></div>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2"><Label>Card Number</Label><Input placeholder="4242 4242 4242 4242" required /></div>
            <div><Label>CVV</Label><Input placeholder="123" required maxLength={4} /></div>
          </div>
          <Button type="submit" className="w-full gradient-primary text-primary-foreground">Place Order — ${total}</Button>
        </form>
        <aside className="glass-strong h-fit rounded-2xl p-6">
          <h2 className="text-lg font-bold">Summary</h2>
          <ul className="mt-4 space-y-3">
            {items.map((c) => (<li key={c.productId} className="flex justify-between text-sm"><span className="text-muted-foreground">{c.product.name} × {c.qty}</span><span>${c.product.price * c.qty}</span></li>))}
          </ul>
          <div className="mt-4 space-y-1 border-t border-border pt-4 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>${subtotal}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>{shipping ? `$${shipping}` : "Free"}</span></div>
            <div className="mt-2 flex justify-between text-lg font-bold"><span>Total</span><span className="text-gradient">${total}</span></div>
          </div>
        </aside>
      </div>
    </section>
  );
}
