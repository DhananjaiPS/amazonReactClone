import CarouselCard from "../components/Carousel";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { useState, useEffect } from "react";
import Modal from "../components/Modal";

const HomePage = ({ cart, setCart }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [Productdata, setProductData] = useState([]);
  const [loading, setLoading] = useState(false);
function addToCart(product) {
  let existingCart = JSON.parse(localStorage.getItem('cart'));
  const updatedCart = [...existingCart, product];
  localStorage.setItem('cart', JSON.stringify(updatedCart));
  setCart(updatedCart);
}

  // Fetch data on page load
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch('https://dummyjson.com/products'); // Remove query, fetching all products
        const data = await res.json();
        setProductData(data.products); // Set products to state
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);  // No dependency, so it runs once on page load

  // Handle product click for modal
  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  // Close the modal
  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="bg-[#EAEDED]">
      <Navbar cart={cart} setCart={setCart} />
      <CarouselCard />

      <main className="flex-1 p-6 relative -top-40"> 
        {/* <h2 className="text-xl font-semibold mb-2">All Products</h2> */}

        {loading && (
          <div className="flex justify-center items-center h-64">
            <img src="/animation3.gif" alt="Loading..." className="w-60 h-30" />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {!loading &&
            Productdata.map((product) => {
              const img = product.images?.[0];
              return (
                <div
                  key={product.id}  // Unique product ID as key
                  className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
                  onClick={() => handleProductClick(product)}  // Open modal on click
                >
                  {img && (
                    <img
                      src={img}
                      alt={product.title}
                      className="w-full h-40 object-contain mb-2"
                    />
                  )}
                  <h3 className="font-medium text-sm mb-1 truncate">{product.title}</h3>
                  <div className="text-orange-500 text-xl mb-1">
                    {"★".repeat(Math.floor(product.rating || 0))}
                    {"☆".repeat(5 - Math.floor(product.rating || 0))}
                  </div>
                  <p className="text-base font-semibold text-gray-900">
                    ${product.price}
                  </p>
                  <button className="mt-2 w-full py-1 bg-yellow-400 hover:bg-yellow-500 rounded text-sm"  onClick={() => addToCart(product)}>
                    Add to Cart
                  </button>
                  <button className="mt-2 w-full py-1 bg-orange-400 hover:bg-orange-500 rounded text-sm">
                    Buy Now
                  </button>
                </div>
              );
            })}
        </div>

        {/* Modal for selected product */}
        <Modal selectedProduct={selectedProduct} closeModal={closeModal} />
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
