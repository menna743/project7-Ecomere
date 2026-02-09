import { Link, NavLink } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { useCart } from "../Store";

export default function Header() {
  const { cart } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight text-gray-900"
        >
          Our<span className="text-primary">Shop</span>
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-8 text-sm font-medium text-gray-700">

          <NavLink
            to="/"
            className={({ isActive }) =>
              `relative transition hover:text-primary ${
                isActive ? "text-primary" : ""
              }`
            }
          >
            Home
            <span className="absolute -bottom-2 left-0 h-0.5 w-full bg-primary scale-x-0 group-hover:scale-x-100 transition" />
          </NavLink>

          {/* Cart */}
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `relative flex items-center gap-2 transition hover:text-primary ${
                isActive ? "text-primary" : ""
              }`
            }
          >
            <FaCartShopping className="text-lg" />

            {/* Cart Count */}
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-3 min-w-[18px] h-[18px] px-1 rounded-full bg-primary text-white text-xs flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
