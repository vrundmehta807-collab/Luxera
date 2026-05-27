import type { Product } from "@/lib/store";
import menImg from "@/assets/cat-men.jpg";
import womenImg from "@/assets/cat-women.jpg";
import kidsImg from "@/assets/cat-kids.jpg";

const make = (
  id: string,
  name: string,
  price: number,
  category: Product["category"],
  rating: number,
  tags: string[],
  image: string,
): Product => ({
  id,
  name,
  price,
  category,
  rating,
  tags,
  image,
  description:
    "Crafted from premium materials with meticulous attention to detail. A staple piece for the modern wardrobe.",
});

export const products: Product[] = [
  make("m1", "Obsidian Wool Blazer", 289, "men", 4.8, ["new", "formal"], menImg),
  make("m2", "Neon Silk Bomber", 199, "men", 4.6, ["trending"], menImg),
  make("m3", "Carbon Tailored Trousers", 149, "men", 4.5, ["formal"], menImg),
  make("m4", "Midnight Cashmere Tee", 89, "men", 4.7, ["essentials"], menImg),
  make("m5", "Aurora Leather Jacket", 449, "men", 4.9, ["premium"], menImg),
  make("m6", "Eclipse Hooded Coat", 329, "men", 4.6, ["winter"], menImg),

  make("w1", "Iridescent Silk Gown", 399, "women", 4.9, ["new", "evening"], womenImg),
  make("w2", "Chrome Mini Dress", 229, "women", 4.7, ["trending"], womenImg),
  make("w3", "Pearl Satin Blouse", 159, "women", 4.6, ["essentials"], womenImg),
  make("w4", "Cyber Pleated Skirt", 139, "women", 4.5, ["trending"], womenImg),
  make("w5", "Aurora Wrap Coat", 379, "women", 4.8, ["winter", "premium"], womenImg),
  make("w6", "Velvet Cropped Jacket", 219, "women", 4.7, ["new"], womenImg),

  make("k1", "Rainbow Puff Jacket", 119, "kids", 4.8, ["winter"], kidsImg),
  make("k2", "Cosmic Graphic Tee", 39, "kids", 4.6, ["essentials"], kidsImg),
  make("k3", "Galaxy Denim Set", 79, "kids", 4.5, ["new"], kidsImg),
  make("k4", "Glow Sneakers", 89, "kids", 4.9, ["trending"], kidsImg),
  make("k5", "Soft Cloud Hoodie", 59, "kids", 4.7, ["essentials"], kidsImg),
  make("k6", "Sparkle Tutu Dress", 69, "kids", 4.8, ["new"], kidsImg),
];

export const findProduct = (id: string) => products.find((p) => p.id === id);