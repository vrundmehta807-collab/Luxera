import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/_layout/signup")({
  head: () => ({ meta: [{ title: "Sign Up — LUXERA" }] }),
  component: SignupPage,
});
function SignupPage() {
  const { signup } = useStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: "", password: "", birthdate: "", gender: "" });
  return (
    <section className="container mx-auto grid min-h-[70vh] place-items-center px-4 py-12">
      <form onSubmit={(e) => { e.preventDefault(); signup(form); toast.success(`Welcome, ${form.fullName}!`); navigate({ to: "/" }); }} className="glass-strong w-full max-w-md space-y-5 rounded-3xl p-8 animate-fade-in-up">
        <div className="text-center">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl gradient-primary shadow-glow"><Sparkles className="h-6 w-6 text-primary-foreground" /></div>
          <h1 className="mt-4 text-2xl font-bold">Create account</h1>
        </div>
        <div><Label>Full Name</Label><Input value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} required /></div>
        <div><Label>Password</Label><Input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required minLength={4} /></div>
        <div><Label>Birthdate</Label><Input type="date" value={form.birthdate} onChange={(e) => setForm({ ...form, birthdate: e.target.value })} required /></div>
        <div><Label>Gender</Label>
          <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })} required className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
            <option value="">Select…</option><option>Female</option><option>Male</option><option>Non-binary</option><option>Prefer not to say</option>
          </select>
        </div>
        <Button type="submit" className="w-full gradient-primary text-primary-foreground">Create account</Button>
        <p className="text-center text-sm text-muted-foreground">Have an account? <Link to="/login" className="text-primary font-semibold">Sign in</Link></p>
      </form>
    </section>
  );
}
