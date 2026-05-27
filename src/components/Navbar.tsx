import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useStore } from "@/lib/store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Moon, ShoppingBag, Sun, User, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  { to: "/", label: "Home" },
  { to: "/men", label: "Men" },
  { to: "/women", label: "Women" },
  { to: "/kids", label: "Kids" },
  { to: "/cart", label: "Cart" },
  { to: "/checkout", label: "Checkout" },
  { to: "/orders", label: "Orders" },
  { to: "/reviews", label: "Reviews" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const { user, logout, cart, theme, toggleTheme } = useStore();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [scrolled, setScrolled] = useState(false);
  const cartCount = cart.reduce((n, c) => n + c.qty, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "glass-strong" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl gradient-primary shadow-glow">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            LUXE<span className="text-gradient">RA</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => {
            const active = pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`relative rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                  active ? "text-primary" : "text-foreground/70 hover:text-foreground"
                }`}
              >
                {l.label}
                {l.to === "/cart" && cartCount > 0 && (
                  <span className="ml-1 rounded-full bg-primary px-1.5 py-0.5 text-[10px] text-primary-foreground">
                    {cartCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </Button>
          <Link to="/cart" className="relative lg:hidden">
            <Button size="icon" variant="ghost" aria-label="Cart">
              <ShoppingBag className="h-4 w-4" />
            </Button>
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-primary text-[10px] text-primary-foreground">
                {cartCount}
              </span>
            )}
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="outline" className="rounded-full" aria-label="Profile">
                <User className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="glass-strong w-48">
              {user ? (
                <>
                  <div className="px-2 py-1.5 text-xs text-muted-foreground">
                    Hi, <span className="font-semibold text-foreground">{user.fullName}</span>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate({ to: "/profile" })}>Profile</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate({ to: "/orders" })}>Orders</DropdownMenuItem>
                  {user.isAdmin && (
                    <DropdownMenuItem onClick={() => navigate({ to: "/admin" })}>Admin Panel</DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => {
                      logout();
                      navigate({ to: "/" });
                    }}
                  >
                    Logout
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem onClick={() => navigate({ to: "/login" })}>Login</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate({ to: "/signup" })}>Sign Up</DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="ghost" className="lg:hidden" aria-label="Menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="glass-strong w-72">
              <nav className="mt-8 flex flex-col gap-1">
                {links.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    className="rounded-lg px-3 py-2 text-base font-medium hover:bg-primary/10"
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}