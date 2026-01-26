import noImg from "../assets/product-not-found.jpg"
import {domain} from "../Store"

export default function ProudesctCard({ product }) {
    return (
        <div className="card bg-base-100 border rounded-xl shadow-sm hover:shadow-lg transition duration-300">

            <figure className="h-56 bg-gray-100  overflow-hidden rounded-t-xl">
                <img
                    src={product.coverImg ? domain + product.coverImg?.url : noImg}
                    className="w-full h-full object-contain px-4 hover:scale-105 transition duration-300"
                    alt={product.name}
                />
            </figure>

            <div className="card-body p-4">
                <h2 className="card-title text-lg font-semibold line-clamp-1">
                    {product.name}
                </h2>

                <p className="text-gray-600 text-sm">
                    ${product.price}
                </p>

                <div className="card-actions justify-end mt-3">
                    <button className=" w-full btn btn-primary btn-sm">
                        Add To Card
                    </button>
                </div>
            </div>

        </div>

    )
}
