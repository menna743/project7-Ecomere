import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function CheckoutPage() {
    const navigate = useNavigate();
    const [cardNumber, setCardNumber] = useState("");
    const [cardName, setCardName] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");

    const handlePayment = (e) => {
        e.preventDefault();


        if (!cardNumber || !cardName || !expiry || !cvv) {
            toast.error("Please fill all fields");
            return;
        }

        if (cardNumber.length < 16) {
            toast.error("Card number must be 16 digits");
            return;
        }

        if (cvv.length < 3) {
            toast.error("CVV must be at least 3 digits");
            return;
        }


        toast.success("Payment Successful!");


        navigate("/", { replace: true });
    };

    return (
        <div className="w-full min-h-screen flex justify-center items-center bg-gray-50 py-10">
            <form
                onSubmit={handlePayment}
                className="bg-white p-6 rounded-xl shadow-md w-full max-w-md flex flex-col gap-4"
            >
                <h2 className="text-2xl font-bold text-gray-900 text-center">
                    Checkout
                </h2>

                <input
                    type="text"
                    placeholder="Card Number"
                    maxLength={16}
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="input input-bordered w-full"
                />

                <input
                    type="text"
                    placeholder="Card Holder Name"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className="input input-bordered w-full"
                />

                <div className="flex gap-3">
                    <input
                        type="text"
                        placeholder="MM/YY"
                        maxLength={5}
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        className="input input-bordered w-1/2"
                    />
                    <input
                        type="text"
                        placeholder="CVV"
                        maxLength={4}
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        className="input input-bordered w-1/2"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-primary text-white py-3 font-semibold rounded-lg  hover:bg-primary/90 transition"
                >
                    Pay Now
                </button>
            </form>
        </div>
    );
}
