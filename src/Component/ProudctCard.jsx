import toast from "react-hot-toast";
import noImg from "../assets/product-not-found.jpg";
import { domain, useCart } from "../Store";

export default function ProductCard({ product }) {
  const { cart, setCart } = useCart();

  const handleAddToCart = () => {
    let copy = [...cart];
    let productIndex = copy.findIndex(
      (el) => el.documentId === product.documentId
    );

    if (productIndex !== -1) {
      copy[productIndex].qty++;
      toast.success("Product quantity increased successfully");
    } else {
      copy.push({ ...product, qty: 1 });
      toast.success("Product added to cart successfully");
    }

    setCart(copy);
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 flex flex-col overflow-hidden">
      
      {/* Product Image */}
      <figure className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden rounded-t-xl p-2">
        <img
          src={product.coverImg ? domain + product.coverImg?.url : noImg}
          alt={product.name}
          className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105"
        />
      </figure>

      {/* Product Info */}
      <div className="flex flex-col p-5 flex-1">
        {/* Name */}
        <h2 className="text-lg font-semibold line-clamp-1 text-gray-900 mb-2">
          {product.name}
        </h2>

        {/* Price */}
        <p className="text-gray-600 text-sm mb-4">${product.price}</p>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="mt-auto w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
