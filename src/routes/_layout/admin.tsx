import { createFileRoute, Link } from "@tanstack/react-router";
import { useStore } from "@/lib/store";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { SalesChart, DonutChart } from "@/components/SalesChart";
import { DollarSign, Package, ShoppingBag, Users } from "lucide-react";

export const Route = createFileRoute("/_layout/admin")({
  head: () => ({ meta: [{ title: "Admin — LUXERA" }] }),
  component: AdminPage,
});
function AdminPage() {
  const { user, orders, users, setOrderStatus } = useStore();
  if (!user?.isAdmin) return (<div className="container mx-auto py-24 text-center"><h1 className="text-2xl font-bold">Admin access required</h1><p className="mt-2 text-sm text-muted-foreground">Use Vrund_Admin / Vrund@123</p><Button asChild className="mt-6 gradient-primary text-primary-foreground"><Link to="/login">Login</Link></Button></div>);
  const revenue = orders.reduce((s, o) => s + o.total, 0);
  const seed = [{label:"Jan",value:1200},{label:"Feb",value:1800},{label:"Mar",value:2400},{label:"Apr",value:2000},{label:"May",value:3200},{label:"Jun",value:4100}];
  const salesData = orders.length === 0 ? seed : (() => { const map = new Map<string, number>(); orders.forEach((o) => { const m = new Date(o.date).toLocaleString("en", { month: "short" }); map.set(m, (map.get(m) ?? 0) + o.total); }); return Array.from(map.entries()).map(([label,value]) => ({label,value})); })();
  const catData = (["men","women","kids"] as const).map((c) => ({ label: c, value: orders.flatMap((o) => o.items).filter((i) => products.find((p) => p.id === i.productId)?.category === c).length || 1 }));
  return (
    <section className="container mx-auto px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold md:text-4xl">Admin Dashboard</h1>
      <p className="text-muted-foreground">Welcome back, {user.fullName}.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-4">
        {[{I:DollarSign,l:"Revenue",v:`$${revenue}`},{I:ShoppingBag,l:"Orders",v:orders.length},{I:Users,l:"Customers",v:users.length},{I:Package,l:"Products",v:products.length}].map((k) => (
          <div key={k.l} className="glass-strong rounded-2xl p-5 hover-lift">
            <div className="flex items-center justify-between"><div className="text-xs uppercase text-muted-foreground">{k.l}</div><div className="grid h-9 w-9 place-items-center rounded-xl gradient-primary"><k.I className="h-4 w-4 text-primary-foreground" /></div></div>
            <div className="mt-3 text-2xl font-bold text-gradient">{k.v}</div>
          </div>
        ))}
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="glass-strong rounded-2xl p-6"><h2 className="mb-4 font-bold">Sales overview</h2><SalesChart data={salesData} /></div>
        <div className="glass-strong rounded-2xl p-6"><h2 className="mb-4 font-bold">Category mix</h2><DonutChart data={catData} /></div>
      </div>
      <div className="mt-8 glass-strong rounded-2xl p-6">
        <h2 className="mb-4 font-bold">Customer Orders</h2>
        {orders.length === 0 ? <p className="text-sm text-muted-foreground">No orders yet.</p> : (
          <div className="overflow-x-auto"><table className="w-full text-sm">
            <thead className="text-left text-xs uppercase text-muted-foreground"><tr><th className="p-2">Order</th><th className="p-2">Customer</th><th className="p-2">Total</th><th className="p-2">Status</th></tr></thead>
            <tbody>{orders.map((o) => (<tr key={o.id} className="border-t border-border"><td className="p-2 font-mono text-xs">{o.id}</td><td className="p-2">{o.user}</td><td className="p-2">${o.total}</td><td className="p-2"><select value={o.status} onChange={(e) => setOrderStatus(o.id, e.target.value as any)} className="rounded-lg bg-secondary px-2 py-1 text-xs">{["Pending","Shipped","Delivered","Cancelled"].map((s) => <option key={s}>{s}</option>)}</select></td></tr>))}</tbody>
          </table></div>
        )}
      </div>
      <div className="mt-8 glass-strong rounded-2xl p-6">
        <h2 className="mb-4 font-bold">Products</h2>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {products.slice(0, 9).map((p) => (<div key={p.id} className="glass flex items-center gap-3 rounded-xl p-3"><img src={p.image} alt={p.name} className="h-12 w-12 rounded-lg object-cover" /><div className="flex-1 min-w-0"><div className="truncate text-sm font-semibold">{p.name}</div><div className="text-xs text-muted-foreground capitalize">{p.category} · ${p.price}</div></div></div>))}
        </div>
      </div>
    </section>
  );
}
