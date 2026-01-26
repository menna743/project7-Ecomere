import { useEffect, useState } from "react";
import ProudctCard from "../Component/ProudctCard";
import axios from "axios";
import { Counter, domain } from "../Store"

export default function ShopPage() {
    const {setCounter , value} = Counter();
    const [products, setProducts] = useState([]);
    const [cats, setCats] = useState([]);
    const [activeCategory, setActiveCategory] = useState(null);
    const [pagesNo, setPagesNo] = useState(3);
    const [activePage, setActivePage] = useState(1);


   const showCategotyProducts = (id) => {
    setActiveCategory(id);
    let endPoint = '/api/products';
    let url = domain + endPoint;
    axios
      .get(url, {
        params: {
          populate: '*',
          filters: {
            category: {
              documentId: {
                $eq: `${id}`,
              },
            },
          },
          pagination: {
            page: 1,
            pageSize: 12,
          },
        },
      })
      .then((res) => {
        let productIntoCategory = res.data.data;
        setPagesNo(res.data.meta.pagination.pageCount);
        setProducts(productIntoCategory);
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

        axios.get(url, {
            params: {
                pagination: {
                    page: 1,
                    pageSize: 12,
                }
            }
        }
        )
            .then((res) => {
                let productFromAPI = res.data.data;
                setPagesNo(res.data.meta.pagination.pageCount);
                console.log(res.data);
                setProducts(productFromAPI);
            });
        axios.get(url2).then((res) => {
            let catsFromApi = res.data.data;
            setCats(catsFromApi);
            // console.log(catsFromApi);
        })
    }, []);

    useEffect(() => {
        let endPoint = "/api/products?populate=*";
        let url = domain + endPoint;

        axios.get(url, {
            params: {
                pagination: {
                    page: activePage,
                    pageSize: 12,
                }
            }
        }
        )
            .then((res) => {
                let productFromAPI = res.data.data;
                setPagesNo(res.data.meta.pagination.pageCount);
                console.log(res.data);
                setProducts(productFromAPI);
            });
    }, [activePage]);


    return (
        <div className="w-full text-gray-900 flex justify-center">
            <div className="container">
                <button onClick={()=>setCounter (value +1)} className="btn btn-primary p-4 w-full">Change Counter</button>
                <h1 className="text-center text-gray-900 font-bold mb-3 text-2xl p-4">Our Products</h1>
                <div className="flex flex-wrap gap-3 justify-center sm:justify-center lg:justify-center">
                    <button onClick={getAllProducts} className="btn btn-error">All</button>
                    {
                        cats.map((el) => (
                            <button onClick={() => showCategotyProducts(el.documentId)} key={el.documentId} className={activeCategory == el.documentId ? "btn bg-gray-800 text-white hover:bg-gray-900 transition-all duration-500" : "btn btn-primary mb-4 "}>
                                {el.name}
                            </button>

                        ))
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
                <div className=" w-full flex justify-center p-4 ">
                    <div className="join">
                        {
                            Array(pagesNo).fill(0).map((el, index) => {
                                return (
                                    <input
                                        key={index + 1}
                                        onClick={() => setActivePage(index + 1)}
                                        className="join-item btn btn-square"
                                        type="radio"
                                        name="options"
                                        checked={activePage == index + 1}
                                        aria-label={index + 1}
                                    />
                                )
                            })
                        }


                    </div>

                </div>
            </div>
        </div>
    )
}
