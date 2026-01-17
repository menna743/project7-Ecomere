import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="w-full bg-gray-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <h1 className="text-2xl font-bold tracking-wide">
          <Link to="/">Our<span className="text-primary">Shop</span></Link>
        </h1>

        {/* Nav */}
        <nav className="flex gap-6 text-sm font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-primary border-b-2 border-primary pb-1"
                : "hover:text-primary transition"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive
                ? "text-primary border-b-2 border-primary pb-1"
                : "hover:text-primary transition"
            }
          >
            Cart
          </NavLink>
        </nav>

      </div>
    </header>
  );
}
