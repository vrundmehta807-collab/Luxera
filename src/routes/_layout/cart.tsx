import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useStore } from "@/lib/store";
import { findProduct } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

export const Route = createFileRoute("/_layout/cart")({
  head: () => ({ meta: [{ title: "Cart — LUXERA" }] }),
  component: CartPage,
});

function CartPage() {
  const { cart, updateQty, removeFromCart } = useStore();
  const navigate = useNavigate();
  const items = cart.map((c) => ({ ...c, product: findProduct(c.productId)! })).filter((c) => c.product);
  const subtotal = items.reduce((s, c) => s + c.product.price * c.qty, 0);
  const shipping = subtotal > 200 || subtotal === 0 ? 0 : 12;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <section className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <div className="glass-strong grid h-32 w-32 place-items-center rounded-full animate-float">
          <ShoppingBag className="h-12 w-12 text-primary" />
        </div>
        <h1 className="mt-6 text-3xl font-bold">Your cart is empty</h1>
        <Button asChild className="mt-6 gradient-primary text-primary-foreground"><Link to="/">Start shopping</Link></Button>
      </section>
    );
  }
  return (
    <section className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold md:text-4xl">Your Cart</h1>
      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {items.map((c) => (
            <div key={c.productId} className="glass-strong flex gap-4 rounded-2xl p-4">
              <img src={c.product.image} alt={c.product.name} className="h-28 w-24 rounded-xl object-cover" />
              <div className="flex flex-1 flex-col">
                <div className="flex justify-between gap-3">
                  <div>
                    <h3 className="font-semibold">{c.product.name}</h3>
                    <p className="text-xs capitalize text-muted-foreground">{c.product.category}</p>
                  </div>
                  <span className="font-bold text-gradient">${c.product.price * c.qty}</span>
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center gap-1 rounded-full glass px-1">
                    <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => updateQty(c.productId, c.qty - 1)}><Minus className="h-3 w-3" /></Button>
                    <span className="w-6 text-center text-sm">{c.qty}</span>
                    <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => updateQty(c.productId, c.qty + 1)}><Plus className="h-3 w-3" /></Button>
                  </div>
                  <Button size="sm" variant="ghost" onClick={() => removeFromCart(c.productId)}><Trash2 className="h-4 w-4" /></Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <aside className="glass-strong h-fit rounded-2xl p-6">
          <h2 className="text-lg font-bold">Order Summary</h2>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>${subtotal}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shipping ? `$${shipping}` : "Free"}</span></div>
            <div className="my-2 border-t border-border" />
            <div className="flex justify-between"><span className="font-bold">Total</span><span className="text-lg font-bold text-gradient">${total}</span></div>
          </div>
          <Button onClick={() => navigate({ to: "/checkout" })} className="mt-6 w-full gradient-primary text-primary-foreground">Checkout</Button>
        </aside>
      </div>
    </section>
  );
}
