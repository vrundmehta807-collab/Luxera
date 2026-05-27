import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/CategoryPage";

export const Route = createFileRoute("/_layout/men")({
  head: () => ({
    meta: [
      { title: "Men's Collection — LUXERA" },
      { name: "description", content: "Premium men's fashion: blazers, jackets, tees and more." },
    ],
  }),
  component: () => (
    <CategoryPage category="men" title="Men's Collection" subtitle="Modern silhouettes with timeless craft." />
  ),
});