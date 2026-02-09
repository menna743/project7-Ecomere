import { useEffect, useState } from "react";
import ProudctCard from "../Component/ProudctCard";
import axios from "axios";
import {  domain } from "../Store"

export default function ShopPage() {
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
        setActiveCategory(null);
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
                // console.log(res.data);
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
                // console.log(res.data);
                setProducts(productFromAPI);
            });
    }, [activePage]);


    // return (
    //     <div className="w-full text-gray-900 flex justify-center">
    //         <div className="container">
    //             <h1 className="text-center text-gray-900 font-bold mb-3 text-2xl p-4">Our Products</h1>
    //             <div className="flex flex-wrap gap-3 justify-center sm:justify-center lg:justify-center">
    //                 <button onClick={getAllProducts} className="btn btn-error">All</button>
    //                 {
    //                     cats.map((el) => (
    //                         <button onClick={() => showCategotyProducts(el.documentId)} key={el.documentId} className={activeCategory == el.documentId ? "btn bg-gray-800 text-white hover:bg-gray-900 transition-all duration-500" : "btn btn-primary mb-4 "}>
    //                             {el.name}
    //                         </button>

    //                     ))
    //                 }

    //             </div>
    //             <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
    //                 {
    //                     products.map((el) => {
    //                         return (
    //                             <ProudctCard key={el.documentId} product={el} />
    //                         )
    //                     })
    //                 }

    //             </div>
    //             <div className=" w-full flex justify-center p-4 ">
    //                 <div className="join">
    //                     {
    //                         Array(pagesNo).fill(0).map((el, index) => {
    //                             return (
    //                                 <input
    //                                     key={index + 1}
    //                                     onChange={() => setActivePage(index + 1)}
    //                                     className="join-item btn btn-square"
    //                                     type="radio"
    //                                     name="options"
    //                                     checked={activePage == index + 1}
    //                                     aria-label={index + 1}
    //                                 />
    //                             )
    //                         })
    //                     }


    //                 </div>

    //             </div>
    //         </div>
    //     </div>
    // )

    return (
  <div className="w-full bg-gray-50 text-gray-900">
    <div className="container mx-auto px-4 py-8">

      {/* Page Title */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">Our Products</h1>
        <p className="text-gray-500 text-sm">
          Browse our collection and find what you love
        </p>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-3 justify-center mb-10">
        <button
          onClick={getAllProducts}
          className={`px-5 py-2 rounded-full text-sm font-medium transition
            ${activeCategory === null
              ? "bg-primary text-white"
              : "bg-white text-gray-700 border hover:border-primary hover:text-primary"}
          `}
        >
          All
        </button>

        {cats.map((el) => (
          <button
            key={el.documentId}
            onClick={() => showCategotyProducts(el.documentId)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition
              ${activeCategory === el.documentId
                ? "bg-primary text-white"
                : "bg-white text-gray-700 border hover:border-primary hover:text-primary"}
            `}
          >
            {el.name}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((el) => (
          <ProudctCard key={el.documentId} product={el} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-12">
        <div className="flex gap-2">
          {Array(pagesNo)
            .fill(0)
            .map((_, index) => (
              <button
                key={index + 1}
                onClick={() => setActivePage(index + 1)}
                className={`w-10 h-10 rounded-lg border text-sm font-medium transition
                  ${
                    activePage === index + 1
                      ? "bg-primary text-white border-primary"
                      : "bg-white hover:border-primary hover:text-primary"
                  }
                `}
              >
                {index + 1}
              </button>
            ))}
        </div>
      </div>

    </div>
  </div>
);
}
