import { useStore, type Product } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { toast } from "sonner";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const liked = wishlist.includes(product.id);

  return (
    <div className="group glass-strong relative overflow-hidden rounded-3xl hover-lift">
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <button
          onClick={() => {
            toggleWishlist(product.id);
            toast(liked ? "Removed from wishlist" : "Added to wishlist");
          }}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full glass hover:scale-110 transition-transform"
          aria-label="Wishlist"
        >
          <Heart className={`h-4 w-4 ${liked ? "fill-primary text-primary" : ""}`} />
        </button>
        {product.tags.includes("new") && (
          <span className="absolute left-3 top-3 rounded-full gradient-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
            NEW
          </span>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold leading-tight">{product.name}</h3>
          <div className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
            <Star className="h-3 w-3 fill-accent text-accent" />
            {product.rating}
          </div>
        </div>
        <p className="mt-1 text-xs text-muted-foreground capitalize">{product.category}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold text-gradient">${product.price}</span>
          <Button
            size="sm"
            className="gradient-primary text-primary-foreground"
            onClick={() => {
              addToCart(product.id);
              toast.success(`${product.name} added to cart`);
            }}
          >
            <ShoppingBag className="mr-1 h-3.5 w-3.5" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}