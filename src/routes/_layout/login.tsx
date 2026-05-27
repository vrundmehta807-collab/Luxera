import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/_layout/login")({
  head: () => ({ meta: [{ title: "Login — LUXERA" }] }),
  component: LoginPage,
});
function LoginPage() {
  const { login } = useStore();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [pw, setPw] = useState("");
  return (
    <section className="container mx-auto grid min-h-[70vh] place-items-center px-4 py-12">
      <form onSubmit={(e) => { e.preventDefault(); const u = login(name, pw); if (u) { toast.success(`Welcome ${u.fullName}`); navigate({ to: u.isAdmin ? "/admin" : "/" }); } else toast.error("Invalid credentials"); }} className="glass-strong w-full max-w-md space-y-5 rounded-3xl p-8 animate-fade-in-up">
        <div className="text-center">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl gradient-primary shadow-glow"><Sparkles className="h-6 w-6 text-primary-foreground" /></div>
          <h1 className="mt-4 text-2xl font-bold">Welcome back</h1>
        </div>
        <div><Label>Full Name</Label><Input value={name} onChange={(e) => setName(e.target.value)} required /></div>
        <div><Label>Password</Label><Input type="password" value={pw} onChange={(e) => setPw(e.target.value)} required /></div>
        <Button type="submit" className="w-full gradient-primary text-primary-foreground">Sign in</Button>
        <p className="text-center text-sm text-muted-foreground">No account? <Link to="/signup" className="text-primary font-semibold">Create one</Link></p>
      </form>
    </section>
  );
}
