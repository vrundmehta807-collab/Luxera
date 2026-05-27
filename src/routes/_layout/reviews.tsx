import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_layout/reviews")({
  head: () => ({ meta: [{ title: "Reviews — LUXERA" }] }),
  component: ReviewsPage,
});
function ReviewsPage() {
  const { reviews, addReview, user } = useStore();
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  return (
    <section className="container mx-auto px-4 py-12">
      <h1 className="text-center text-4xl font-bold md:text-5xl">What people are saying</h1>
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((r) => (
          <div key={r.id} className="glass-strong rounded-2xl p-6 hover-lift">
            <div className="flex">{Array.from({ length: 5 }).map((_, i) => (<Star key={i} className={`h-4 w-4 ${i < r.rating ? "fill-accent text-accent" : "text-muted"}`} />))}</div>
            <p className="mt-3 text-sm">{r.text}</p>
            <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground"><span className="font-semibold text-foreground">{r.user}</span><span>{r.date}</span></div>
          </div>
        ))}
      </div>
      <form onSubmit={(e) => { e.preventDefault(); addReview({ user: user?.fullName ?? name ?? "Anonymous", rating, text }); setText(""); setName(""); toast.success("Thanks!"); }} className="glass-strong mx-auto mt-16 max-w-2xl space-y-4 rounded-2xl p-6">
        <h2 className="text-2xl font-bold">Share your experience</h2>
        {!user && (<div><Label>Name</Label><Input value={name} onChange={(e) => setName(e.target.value)} required /></div>)}
        <div><Label>Rating</Label><div className="flex gap-1">{Array.from({ length: 5 }).map((_, i) => (<button type="button" key={i} onClick={() => setRating(i + 1)}><Star className={`h-6 w-6 ${i < rating ? "fill-accent text-accent" : "text-muted"}`} /></button>))}</div></div>
        <div><Label>Review</Label><Textarea value={text} onChange={(e) => setText(e.target.value)} required rows={4} /></div>
        <Button type="submit" className="gradient-primary text-primary-foreground">Submit</Button>
      </form>
    </section>
  );
}
