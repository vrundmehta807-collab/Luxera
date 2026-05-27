import { useMemo, useState } from "react";
import { products } from "@/data/products";
import { ProductCard } from "./ProductCard";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Search } from "lucide-react";

export function CategoryPage({
  category,
  title,
  subtitle,
}: {
  category: "men" | "women" | "kids";
  title: string;
  subtitle: string;
}) {
  const base = useMemo(() => products.filter((p) => p.category === category), [category]);
  const [query, setQuery] = useState("");
  const [price, setPrice] = useState<number[]>([500]);
  const [tag, setTag] = useState<string>("all");

  const tags = useMemo(() => ["all", ...Array.from(new Set(base.flatMap((p) => p.tags)))], [base]);

  const filtered = base.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) &&
      p.price <= price[0] &&
      (tag === "all" || p.tags.includes(tag)),
  );

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold md:text-6xl">{title}</h1>
        <p className="mt-3 text-muted-foreground">{subtitle}</p>
      </div>

      <div className="glass-strong mb-8 grid gap-4 rounded-2xl p-4 md:grid-cols-3 md:items-center">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-muted-foreground">Max price: ${price[0]}</label>
          <Slider value={price} onValueChange={setPrice} min={20} max={500} step={10} />
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => setTag(t)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                tag === t ? "gradient-primary text-primary-foreground" : "glass hover:bg-primary/10"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((p, i) => (
          <div key={p.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 60}ms` }}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="mt-16 text-center text-muted-foreground">No products match your filters.</p>
      )}
    </section>
  );
}