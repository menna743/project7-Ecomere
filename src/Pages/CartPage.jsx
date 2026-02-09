import { useEffect, useState } from "react";
import { domain, useCart } from "../Store";
import toast from "react-hot-toast";
import noImg from "../assets/product-not-found.jpg";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const { cart, setCart } = useCart();
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const handleProceedToCheckout = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      localStorage.setItem("redirectAfterLogin", "/checkout");
      navigate("/login", { replace: true });
    } else {
      navigate("/checkout");
    }
  };

  const decrementQty = (index) => {
    let copy = [...cart];
    if (copy[index].qty > 1) {
      copy[index].qty--;
      toast.success("Quantity decreased");
    } else {
      copy.splice(index, 1);
      toast.success("Product removed from cart");
    }
    setCart(copy);
  };

  const incrementQty = (index) => {
    let copy = [...cart];
    copy[index].qty++;
    setCart(copy);
    toast.success("Quantity increased");
  };

  useEffect(() => {
    let final = 0;
    cart.forEach((el) => (final += el.qty * el.price));
    setTotal(final);
  }, [cart]);

  return (
    <div className="w-full min-h-screen bg-gray-50 py-10 flex justify-center">
      <div className="container px-4 flex flex-col gap-6">
        <h1 className="text-3xl font-bold text-gray-900 text-center">Your Cart</h1>

        {cart.length === 0 ? (
          <p className="text-center text-gray-500 mt-10 text-lg">Your cart is empty</p>
        ) : (
          <div className="flex flex-col gap-6">
            {cart.map((el, index) => (
              <div key={el.documentId} className="flex flex-col sm:flex-row items-center sm:items-start bg-white rounded-xl shadow-md p-4 gap-4 hover:shadow-lg transition">
                <div className="w-32 h-32 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                  <img
                    src={el.coverImg ? domain + el.coverImg.url : noImg}
                    alt={el.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                <div className="flex-1 flex flex-col gap-2">
                  <h2 className="font-semibold text-gray-900 text-lg line-clamp-1">{el.name}</h2>
                  <p className="text-gray-600">${el.price}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => decrementQty(index)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition">-</button>
                    <span className="px-3 py-1 bg-gray-200 rounded text-gray-800 font-medium">{el.qty}</span>
                    <button onClick={() => incrementQty(index)} className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition">+</button>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2 mt-2 sm:mt-0">
                  <p className="font-semibold text-gray-900 text-lg">${el.price * el.qty}</p>
                  <button onClick={() => decrementQty(index)} className="text-red-500 hover:underline text-sm">Remove</button>
                </div>
              </div>
            ))}

            <div className="flex justify-end items-center gap-6 mt-4">
              <p className="text-gray-700 font-semibold text-lg">Total:</p>
              <p className="text-gray-900 font-bold text-xl">${total}</p>
            </div>

            <button className="w-full sm:w-1/3 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition self-end" onClick={handleProceedToCheckout}>
              Proceed To Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
