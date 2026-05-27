import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, Phone, Instagram, Twitter, Facebook } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_layout/contact")({
  head: () => ({ meta: [{ title: "Contact — LUXERA" }] }),
  component: ContactPage,
});
function ContactPage() {
  return (
    <section className="container mx-auto px-4 py-12">
      <h1 className="text-center text-4xl font-bold md:text-5xl">Get in touch</h1>
      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
        <form onSubmit={(e) => { e.preventDefault(); toast.success("Message sent!"); (e.target as HTMLFormElement).reset(); }} className="glass-strong space-y-4 rounded-2xl p-6">
          <div className="grid gap-4 md:grid-cols-2"><div><Label>Name</Label><Input required /></div><div><Label>Email</Label><Input required type="email" /></div></div>
          <div><Label>Subject</Label><Input required /></div>
          <div><Label>Message</Label><Textarea required rows={5} /></div>
          <Button type="submit" className="gradient-primary text-primary-foreground">Send</Button>
        </form>
        <aside className="space-y-4">
          {[{I:Phone,l:"Phone",v:"+1 (555) 010-2025"},{I:Mail,l:"Email",v:"hello@luxera.shop"},{I:MapPin,l:"Store",v:"221 Madison Ave, NYC"}].map(({I,l,v}) => (
            <div key={l} className="glass-strong flex items-center gap-4 rounded-2xl p-4">
              <div className="grid h-10 w-10 place-items-center rounded-xl gradient-primary"><I className="h-5 w-5 text-primary-foreground" /></div>
              <div><div className="text-xs text-muted-foreground">{l}</div><div className="font-semibold">{v}</div></div>
            </div>
          ))}
          <div className="glass-strong rounded-2xl p-2 overflow-hidden">
            <iframe title="map" src="https://www.openstreetmap.org/export/embed.html?bbox=-73.99,40.74,-73.97,40.76&layer=mapnik" className="h-56 w-full rounded-xl border-0" loading="lazy" />
          </div>
          <div className="glass-strong flex justify-around rounded-2xl p-4">
            {[Instagram,Twitter,Facebook].map((Icon,i) => (<Button key={i} size="icon" variant="ghost" className="rounded-full"><Icon className="h-5 w-5" /></Button>))}
          </div>
        </aside>
      </div>
    </section>
  );
}
