import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/CategoryPage";

export const Route = createFileRoute("/_layout/women")({
  head: () => ({
    meta: [
      { title: "Women's Collection — LUXERA" },
      { name: "description", content: "Luxury women's fashion." },
    ],
  }),
  component: () => (
    <CategoryPage category="women" title="Women's Collection" subtitle="Elegance reimagined." />
  ),
});