import { useState, useEffect } from "react";
import { useCart } from "../Store";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const { cart, setCart } = useCart();
  const navigate = useNavigate();

  const [total, setTotal] = useState(0);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  // حساب الإجمالي
  useEffect(() => {
    let final = 0;
    cart.forEach((el) => {
      final += el.price * el.qty;
    });
    setTotal(final);
  }, [cart]);

  const handlePayment = () => {
    if (!cardNumber || !expiry || !cvv) {
      toast.error("Please fill in all fields");
      return;
    }

    // Mock payment
    toast.success("Payment successful!");
    setCart([]);
    navigate("/");
  };

  if (cart.length === 0) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center bg-gray-100 px-4">
        <p className="text-gray-700 text-lg">
          Your cart is empty. Please add some products first.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex justify-center bg-gray-100 px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-gray-900 text-center">
          Checkout
        </h1>

        <p className="text-gray-700 font-medium">Order Total: ${total}</p>

        {/* Card Number */}
        <div className="flex flex-col gap-1">
          <label className="text-gray-700 font-medium">Card Number</label>
          <input
            type="text"
            placeholder="1234 5678 9012 3456"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className="input input-bordered w-full bg-white text-black placeholder-gray-400"
          />
        </div>

        {/* Expiry Date */}
        <div className="flex flex-col gap-1">
          <label className="text-gray-700 font-medium">Expiry Date</label>
          <input
            type="text"
            placeholder="MM/YY"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            className="input input-bordered w-full bg-white text-black placeholder-gray-400"
          />
        </div>

        {/* CVV */}
        <div className="flex flex-col gap-1">
          <label className="text-gray-700 font-medium">CVV</label>
          <input
            type="password"
            placeholder="123"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            className="input input-bordered w-full bg-white text-black placeholder-gray-400"
          />
        </div>

        <button
          onClick={handlePayment}
          className="w-full py-3 bg-primary text-white font-semibold rounded-lg shadow hover:bg-primary/90 transition"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}
