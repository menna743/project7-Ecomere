import { useEffect, useState } from "react";
import ProudctCard from "../Component/ProudctCard";
import axios from "axios";

export default function ShopPage() {
    let domain = "https://store.skyready.online";
    const [products, setProducts] = useState([]);
    const [cats, setCats] = useState([]);
    const [acticeCategory , setActiceCategory] = useState(null);

    const showCategoryProducts = (id) => {
        setActiceCategory(id);
        let endPoint = "/api/categories/" + id;
        let url = domain + endPoint;
        axios.get(url, {
            params: { populate: { products: { populate: '*' } } }
        }).then((res) => {
            let productsIntoCategory = res.data.data.products;
            setProducts(productsIntoCategory);
            // console.log(res.data);
        });
    };

    const getAllProducts = () => {
        setActiceCategory(null);
        let endPoint = "/api/products?populate=*";
        let url = domain + endPoint;

        axios.get(url).then((res) => {
            let productFromAPI = res.data.data;
            setProducts(productFromAPI);
        });
    }

    useEffect(() => {
        let endPoint = "/api/products?populate=*";
        let endPoint2 = "/api/categories";

        let url = domain + endPoint;
        let url2 = domain + endPoint2;

        axios.get(url).then((res) => {
            let productFromAPI = res.data.data;
            setProducts(productFromAPI);
        });
        axios.get(url2).then((res) => {
            let catsFromApi = res.data.data;
            setCats(catsFromApi);
            // console.log(catsFromApi);
        })
    }, [])



    return (
        <div className="w-full text-gray-900 flex justify-center">
            <div className="container">
                <h1 className="text-center text-gray-900 font-bold mb-3 text-2xl p-4">Our Products</h1>
                <div className="w-full flex justify-center gap-3">
                    <button onClick={getAllProducts} className="btn btn-error">All</button>
                    {
                        cats.map((el) => {
                            return (
                                <button onClick={() => showCategoryProducts(el.documentId)} key={el.documentId} className={acticeCategory == el.documentId? "btn bg-gray-800 text-white hover:bg-gray-900 transition-all duration-500" : "btn btn-primary mb-4 "}>
                                    {el.name}
                                </button>
                            )
                        })
                    }

                </div>
                <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {
                        products.map((el) => {
                            return (
                                <ProudctCard key={el.documentId} product={el} />
                            )
                        })
                    }

                </div>
            </div>
        </div>
    )
}
