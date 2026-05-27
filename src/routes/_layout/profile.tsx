import { createFileRoute, Link } from "@tanstack/react-router";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_layout/profile")({
  head: () => ({ meta: [{ title: "Profile — LUXERA" }] }),
  component: ProfilePage,
});
function ProfilePage() {
  const { user, orders } = useStore();
  if (!user) return (<div className="container mx-auto py-24 text-center"><h1 className="text-2xl font-bold">Please log in.</h1><Button asChild className="mt-4 gradient-primary text-primary-foreground"><Link to="/login">Login</Link></Button></div>);
  const mine = orders.filter((o) => o.user === user.fullName);
  return (
    <section className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold md:text-4xl">Profile</h1>
      <div className="glass-strong rounded-2xl p-8">
        <div className="flex items-center gap-6">
          <div className="grid h-20 w-20 place-items-center rounded-full gradient-primary text-3xl font-bold text-primary-foreground">{user.fullName[0]}</div>
          <div><h2 className="text-2xl font-bold">{user.fullName}</h2><p className="text-sm text-muted-foreground">{user.gender || "—"} · Born {user.birthdate || "—"}</p></div>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[{l:"Orders",v:mine.length},{l:"Spent",v:`$${mine.reduce((s,o)=>s+o.total,0)}`},{l:"Status",v:user.isAdmin?"Admin":"Member"}].map((s) => (
            <div key={s.l} className="glass rounded-xl p-4"><div className="text-xs text-muted-foreground">{s.l}</div><div className="mt-1 text-2xl font-bold text-gradient">{s.v}</div></div>
          ))}
        </div>
      </div>
    </section>
  );
}
