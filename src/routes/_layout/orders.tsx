import { createFileRoute, Link } from "@tanstack/react-router";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";

export const Route = createFileRoute("/_layout/orders")({
  head: () => ({ meta: [{ title: "Orders — LUXERA" }] }),
  component: OrdersPage,
});
function OrdersPage() {
  const { orders, user } = useStore();
  const mine = user?.isAdmin ? orders : orders.filter((o) => o.user === user?.fullName);
  return (
    <section className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold md:text-4xl">Previous Orders</h1>
      {mine.length === 0 ? (
        <div className="glass-strong rounded-2xl p-12 text-center">
          <Package className="mx-auto h-12 w-12 text-muted-foreground" />
          <p className="mt-4 text-muted-foreground">No orders yet.</p>
          <Button asChild className="mt-6 gradient-primary text-primary-foreground"><Link to="/">Start shopping</Link></Button>
        </div>
      ) : (
        <div className="space-y-4">
          {mine.map((o) => (
            <div key={o.id} className="glass-strong flex flex-wrap items-center justify-between gap-4 rounded-2xl p-5">
              <div><div className="font-bold">{o.id}</div><div className="text-xs text-muted-foreground">{new Date(o.date).toLocaleString()}</div></div>
              <div className="text-sm text-muted-foreground">{o.items.length} item(s)</div>
              <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">{o.status}</span>
              <div className="text-lg font-bold text-gradient">${o.total}</div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
