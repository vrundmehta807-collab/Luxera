import { createFileRoute, Link } from "@tanstack/react-router";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import menImg from "@/assets/cat-men.jpg";
import womenImg from "@/assets/cat-women.jpg";
import kidsImg from "@/assets/cat-kids.jpg";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/_layout/")({
  head: () => ({
    meta: [
      { title: "LUXERA — Futuristic Premium Fashion" },
      { name: "description", content: "Shop premium, future-forward fashion for men, women, and kids." },
      { property: "og:title", content: "LUXERA — Futuristic Premium Fashion" },
      { property: "og:description", content: "Premium fashion crafted for the modern era." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const trending = products.filter((p) => p.tags.includes("trending") || p.tags.includes("new")).slice(0, 8);
  const featured = products.slice(0, 4);
  const { reviews } = useStore();

  return (
    <>
      <section className="container mx-auto grid gap-10 px-4 py-12 lg:grid-cols-2 lg:items-center lg:py-20">
        <div className="animate-fade-in-up">
          <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-semibold">
            <Sparkles className="h-3 w-3 text-primary" /> New Season · 2026
          </span>
          <h1 className="mt-4 text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
            Wear the <span className="text-gradient">future</span>.
          </h1>
          <p className="mt-5 max-w-md text-lg text-muted-foreground">
            Premium, future-forward fashion crafted to move with you — from runway to everyday.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild size="lg" className="gradient-primary text-primary-foreground shadow-glow">
              <Link to="/women">Shop Women <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="glass">
              <Link to="/men">Shop Men</Link>
            </Button>
          </div>
          <div className="mt-10 flex gap-6 text-sm text-muted-foreground">
            <div><div className="text-2xl font-bold text-foreground">200+</div>Designers</div>
            <div><div className="text-2xl font-bold text-foreground">50k</div>Happy customers</div>
            <div><div className="text-2xl font-bold text-foreground">4.9★</div>Rated</div>
          </div>
        </div>
        <div className="relative">
          <div className="glass-strong relative overflow-hidden rounded-[2rem] shadow-elegant animate-float">
            <img src={heroImg} alt="Hero fashion models" width={1536} height={1024} className="h-full w-full object-cover" />
          </div>
          <div className="glass-strong absolute -bottom-6 -left-6 hidden rounded-2xl p-4 md:block animate-fade-in-up">
            <div className="text-xs text-muted-foreground">Trending now</div>
            <div className="text-lg font-bold">Iridescent Silk</div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { to: "/men" as const, img: menImg, label: "Men" },
            { to: "/women" as const, img: womenImg, label: "Women" },
            { to: "/kids" as const, img: kidsImg, label: "Kids" },
          ].map((c) => (
            <Link key={c.to} to={c.to} className="group relative block aspect-[4/5] overflow-hidden rounded-3xl glass-strong hover-lift">
              <img src={c.img} alt={c.label} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-3xl font-bold">{c.label}</h3>
                <p className="text-sm text-muted-foreground">Shop the collection →</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="glass-strong grid gap-6 rounded-3xl p-6 md:grid-cols-3">
          {[
            { Icon: Truck, t: "Free shipping over $200", s: "Worldwide express delivery" },
            { Icon: ShieldCheck, t: "Secure checkout", s: "256-bit encryption" },
            { Icon: RotateCcw, t: "30-day returns", s: "No questions asked" },
          ].map(({ Icon, t, s }) => (
            <div key={t} className="flex items-center gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-xl gradient-primary">
                <Icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <div className="font-semibold">{t}</div>
                <div className="text-sm text-muted-foreground">{s}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">Trending now</h2>
            <p className="text-muted-foreground">Hand-picked pieces, dropping every week.</p>
          </div>
          <Button asChild variant="ghost"><Link to="/women">View all <ArrowRight className="ml-1 h-4 w-4" /></Link></Button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trending.map((p, i) => (
            <div key={p.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 60}ms` }}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="glass-strong relative overflow-hidden rounded-3xl p-10 md:p-14">
          <div className="absolute inset-0 -z-10 gradient-hero opacity-40" />
          <div className="max-w-xl">
            <span className="rounded-full glass px-3 py-1 text-xs font-semibold">Seasonal offer</span>
            <h2 className="mt-4 text-4xl font-bold md:text-5xl">Up to <span className="text-gradient">40% off</span> the new edit.</h2>
            <p className="mt-3 text-muted-foreground">Limited drop. Limited time. Take your pick before it disappears.</p>
            <Button asChild size="lg" className="mt-6 gradient-primary text-primary-foreground shadow-glow">
              <Link to="/women">Shop the sale</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <h2 className="mb-8 text-3xl font-bold md:text-4xl">Featured</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <h2 className="mb-8 text-center text-3xl font-bold md:text-4xl">Loved by our community</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {reviews.slice(0, 3).map((r) => (
            <div key={r.id} className="glass-strong rounded-2xl p-6 hover-lift">
              <p className="text-sm">"{r.text}"</p>
              <div className="mt-4 text-sm font-semibold">{r.user}</div>
              <div className="text-xs text-muted-foreground">{r.date}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}