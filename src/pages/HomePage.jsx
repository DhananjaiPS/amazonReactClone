import CarouselCard from "../components/Carousel";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import Modal from "../components/Modal";
import { addToCart } from "../../slices/cartSlice";
import { useDispatch } from "react-redux";
import { Heart } from '@phosphor-icons/react';
import { saveToWatchlist } from "../../slices/cartSlice"; // Import the action to save to watchlist
import { useSelector } from "react-redux";
import gifLoader from "../components/gifLoader";
const HomePage = ({ cart, setCart }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [Productdata, setProductData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch("https://dummyjson.com/products");
        const data = await res.json();
        setProductData(data.products);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const watchlist = useSelector((state) => state.cart.watchlist);

  const handelHeartClick = (product) => {

    const isHearted = watchlist.some((item) => item.product.id === product.id);
    setToggle(isHearted);
    dispatch(saveToWatchlist(product));
    // alert(`${product.title}Product Added to Watchlist !!!`)
  };


  return (
    <div className="bg-[#EAEDED] min-h-screen bg-white">
      <Navbar cart={cart} setCart={setCart} />
      <CarouselCard />

      <main className="flex-1 px-2 sm:px-6 -py-6 relative sm:-top-40">
        {loading && (
          <div className="flex justify-center items-center h-64">
            {/* <img src="/animation3.gif" alt="Loading..." className="w-40 h-40" /> */}
            <video
              autoPlay
              loop
              muted
              className="w-40 h-40"
            >
              <source src="/Amazon.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {/* <gifLoader/> */}
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 relative -top-[70px]">
          {!loading &&
            Productdata.map((product) => {
              const img = product.images?.[0];
              return (

                <div
                  key={product.id}
                  className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
                  onClick={() => handleProductClick(product)}
                >

                  <div className="flex justify-end" onClick={(e) => {
                    e.stopPropagation(); // Prevent modal open
                    handelHeartClick(product);


                  }}>
                    {/* {toggle ? <Heart size={32} weight="fill" /> : <Heart size={32} />} */}
                    {watchlist.some((item) => item.product.id === product.id) ? (
                      <Heart size={32} weight="fill" className="text-red-500" />
                    ) : (
                      <Heart size={32} className="text-gray-600" />
                    )}

                  </div>
                  {img && (
                    <img
                      src={img}
                      alt={product.title}
                      className="w-full aspect-[3/2] object-contain mb-2"
                    />
                  )}
                  <h3 className="font-medium text-sm mb-1 truncate">
                    {product.title}
                  </h3>
                  <div className="text-orange-500 text-xl mb-1">
                    {"★".repeat(Math.floor(product.rating || 0))}
                    {"☆".repeat(5 - Math.floor(product.rating || 0))}
                  </div>
                  <p className="text-base font-semibold text-gray-900">
                    ${product.price}
                  </p>
                  <div className="flex flex-col gap-2 mt-2">
                    <button
                      className="w-full py-1 bg-yellow-400 hover:bg-yellow-500 rounded text-sm"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent modal open
                        dispatch(addToCart(product));
                        alert(`${product.title}Product Added !!!`)
                      }}
                    >
                      Add to Cart
                    </button>
                    <button
                      className="w-full py-1 bg-orange-400 hover:bg-orange-500 rounded text-sm"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              );
            })}
        </div>

        <Modal selectedProduct={selectedProduct} closeModal={closeModal} />
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
