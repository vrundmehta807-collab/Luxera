import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/CategoryPage";
export const Route = createFileRoute("/_layout/kids")({
  head: () => ({ meta: [{ title: "Kids' Collection — LUXERA" }] }),
  component: () => <CategoryPage category="kids" title="Kids' Collection" subtitle="Fun looks for the next generation." />,
});
