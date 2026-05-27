import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Sparkles, Twitter, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-border/50">
      <div className="container mx-auto px-4 py-16">
        <div className="glass-strong rounded-3xl p-8 md:p-12">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h3 className="text-2xl font-bold md:text-3xl">Join the <span className="text-gradient">LUXERA</span> circle</h3>
              <p className="mt-2 text-muted-foreground">New drops, exclusive offers and styling tips — straight to your inbox.</p>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("Subscribed! Welcome aboard.");
              }}
              className="flex gap-2"
            >
              <Input placeholder="Your email" type="email" required className="glass" />
              <Button type="submit" className="gradient-primary text-primary-foreground">Subscribe</Button>
            </form>
          </div>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-xl gradient-primary">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">LUXE<span className="text-gradient">RA</span></span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">Premium fashion for the future-forward.</p>
          </div>
          <FooterCol title="Shop" items={[["Men","/men"],["Women","/women"],["Kids","/kids"]]} />
          <FooterCol title="Company" items={[["About","/about"],["Contact","/contact"],["Reviews","/reviews"]]} />
          <FooterCol title="Account" items={[["Login","/login"],["Sign Up","/signup"],["Orders","/orders"]]} />
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-6 text-sm text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} LUXERA. All rights reserved.</p>
          <div className="flex gap-2">
            {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
              <Button key={i} size="icon" variant="ghost" className="rounded-full hover:text-primary">
                <Icon className="h-4 w-4" />
              </Button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: [string, string][] }) {
  return (
    <div>
      <h4 className="mb-3 font-semibold">{title}</h4>
      <ul className="space-y-2 text-sm text-muted-foreground">
        {items.map(([label, to]) => (
          <li key={to}>
            <Link to={to} className="hover:text-primary">{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}