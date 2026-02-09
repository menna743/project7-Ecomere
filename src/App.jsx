import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Header from "./Component/Header";
import ShopPage from "./Pages/ShopPage";
import CartPage from "./Pages/CartPage";
import { Toaster } from "react-hot-toast";
import LoginPage from "./Pages/LoginPage";
import CheckoutPage from "./Pages/CheckoutPage";

export default function App() {
  return (
    <div className="w-full h-dvh overflow-auto bg-gray-100 text-black">
      <Toaster />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<ShopPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="*" element={<h1>Error 404 | Page Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
