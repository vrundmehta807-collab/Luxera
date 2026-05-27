import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, Heart, Globe, Award } from "lucide-react";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/_layout/about")({
  head: () => ({ meta: [{ title: "About — LUXERA" }] }),
  component: AboutPage,
});
function AboutPage() {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="animate-fade-in-up">
          <span className="rounded-full glass px-3 py-1 text-xs font-semibold text-primary">Our Story</span>
          <h1 className="mt-4 text-4xl font-bold md:text-6xl">Fashion, <span className="text-gradient">reimagined</span>.</h1>
          <p className="mt-4 text-lg text-muted-foreground">LUXERA blends timeless craftsmanship with future-forward design to create wardrobes that move with you.</p>
        </div>
        <div className="glass-strong overflow-hidden rounded-3xl"><img src={heroImg} alt="story" className="h-full w-full object-cover" loading="lazy" /></div>
      </div>
      <div className="mt-20 grid gap-6 md:grid-cols-4">
        {[{Icon:Sparkles,t:"Vision",b:"Premium fashion that feels effortless."},{Icon:Heart,t:"Mission",b:"Empower individuality through design."},{Icon:Globe,t:"Sustainable",b:"Responsibly sourced materials."},{Icon:Award,t:"Excellence",b:"Hand-finished and quality checked."}].map(({Icon,t,b}) => (
          <div key={t} className="glass-strong rounded-2xl p-6 hover-lift">
            <div className="grid h-10 w-10 place-items-center rounded-xl gradient-primary"><Icon className="h-5 w-5 text-primary-foreground" /></div>
            <h3 className="mt-4 font-bold">{t}</h3><p className="mt-2 text-sm text-muted-foreground">{b}</p>
          </div>
        ))}
      </div>
      <div className="mt-20">
        <h2 className="text-center text-3xl font-bold md:text-4xl">Meet the team</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {["Aria Chen","Marcus Vale","Sofia Reyes","Vrund Patel"].map((n,i) => (
            <div key={n} className="glass-strong overflow-hidden rounded-2xl text-center hover-lift">
              <div className="aspect-square gradient-hero" />
              <div className="p-4"><h3 className="font-semibold">{n}</h3><p className="text-xs text-muted-foreground">{["Creative Director","Head of Design","Brand Lead","Founder"][i]}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
