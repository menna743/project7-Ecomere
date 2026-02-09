import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Component/Header";
import ShopPage from "./Pages/ShopPage";
import CartPage from "./Pages/CartPage";
import CheckoutPage from "./Pages/CheckoutPage";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <div className="w-full min-h-screen bg-gray-100 text-black">
      <Toaster />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<ShopPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<h1 className="text-center mt-10 text-2xl font-bold">Error 404 | Page Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
