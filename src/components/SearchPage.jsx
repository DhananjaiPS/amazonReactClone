import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from './Navbar';
import Modal from './Modal';
import { SlidersHorizontal, X } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../slices/cartSlice';
import {Heart } from '@phosphor-icons/react';
import { useSelector } from 'react-redux';
import { saveToWatchlist } from '../../slices/cartSlice'; // Import the action to save to watchlist
function SearchPage() {
  // const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const [productData, setProductData] = useState([]);
  const [filteredProductData, setFilteredProductData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const handleProductClick = (product) => setSelectedProduct(product);
  const closeModal = () => setSelectedProduct(null);

  const [localCart, setCart] = useState(() => {
    // Initialize cart from localStorage on mount
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // const addToCart = (product) => {
  //   const updatedCart = [...localCart, product];
  //   localStorage.setItem('cart', JSON.stringify(updatedCart));
  //   setCart(updatedCart);
  // };
 const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const watchlist = useSelector((state) => state.cart.watchlist);

  const handelHeartClick = (product) => {

    const isHearted = watchlist.some((item) => item.product.id === product.id);
    setToggle(isHearted);
    dispatch(saveToWatchlist(product));
    // alert(`${product.title}Product Added to Watchlist !!!`)
  };

  // Filter states
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(10000);
  const [brands, setBrands] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [deals, setDeals] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [rating, setRating] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const recommendations = ['Apple AirPods', 'Apple Watch', 'Apple iPad', 'Apple MacBook Pro'];

  // Fetch products based on query
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch(`https://dummyjson.com/products/search?q=${query}&limit=100`);
        const data = await res.json();
        setProductData(data.products || []);
      } catch (err) {
        console.error(err);
        setProductData([]);
      }
      setLoading(false);
    }
    fetchData();
  }, [query]);

  // Filter products based on selected filters
  useEffect(() => {
    let data = productData.filter(p => p.price >= min && p.price <= max);

    if (brands.length > 0) data = data.filter(p => brands.includes(p.brand));
    if (departments.length > 0) data = data.filter(p => departments.includes(p.category));
    if (deals.includes('today')) data = data.filter(p => p.discountPercentage >= 10);
    if (sellers.length > 0) data = data.filter(p => sellers.includes(p.title));
    if (rating) data = data.filter(p => Math.floor(p.rating) >= rating);

    setFilteredProductData(data);
  }, [productData, min, max, brands, departments, deals, sellers, rating]);

  const handleRecomClick = (text) => {
    setSearchParams({ q: text });
  };

  const renderFilterSections = () => (
    <>
      <div>
        <h3 className="font-bold mb-2">Brands</h3>
        <ul className="space-y-1 max-h-32 overflow-y-auto">
          {["Apple", "365 by Whole Foods Market", "GoGo SqueeZ", "Amazon Fresh", "Quaker", "Mott's", "Bragg"].map(b => (
            <li key={b} className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                value={b}
                checked={brands.includes(b)}
                onChange={e => {
                  const v = e.target.value;
                  setBrands(prev => e.target.checked ? [...prev, v] : prev.filter(x => x !== v));
                }}
              />
              {b}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-bold mb-2">Department</h3>
        <ul className="space-y-1">
          {["electronics", "smartphones", "laptops", "fragrances"].map(c => (
            <li key={c} className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                value={c}
                checked={departments.includes(c)}
                onChange={e => {
                  const v = e.target.value;
                  setDepartments(prev => e.target.checked ? [...prev, v] : prev.filter(x => x !== v));
                }}
              />
              {c}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-bold mb-2">Price</h3>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            className="w-20 p-1 border"
            value={min}
            min="0"
            onChange={e => setMin(Number(e.target.value))}
          />
          <span>–</span>
          <input
            type="number"
            className="w-20 p-1 border"
            value={max}
            min="0"
            onChange={e => setMax(Number(e.target.value))}
          />
        </div>
      </div>

      <div>
        <h3 className="font-bold mb-2">Deals & Discounts</h3>
        <label className="flex items-center">
          <input
            type="checkbox"
            value="today"
            checked={deals.includes('today')}
            onChange={e => setDeals(prev => e.target.checked ? [...prev, "today"] : prev.filter(x => x !== "today"))}
            className="mr-2"
          />
          Today's Deals
        </label>
      </div>

      <div>
        <h3 className="font-bold mb-2">Seller</h3>
        <ul className="space-y-1">
          {["ZooScape", "Amazon.com"].map(s => (
            <li key={s} className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                value={s}
                checked={sellers.includes(s)}
                onChange={e => setSellers(prev => e.target.checked ? [...prev, s] : prev.filter(x => x !== s))}
              />
              {s}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-bold mb-2">Customer Reviews</h3>
        {[4, 3, 2, 1].map(r => (
          <label key={r} className="flex items-center">
            <input
              type="radio"
              name="rating"
              className="mr-2"
              value={r}
              checked={rating === r}
              onChange={() => setRating(r)}
            />
            {r} Stars & Up
          </label>
        ))}
      </div>
    </>
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className='fixed top-0 w-full'>

        <Navbar />
      </div>
      <div className="container mx-auto px-4 py-6 flex gap-6 mt-10 ">
        {/* Mobile filter toggle button */}
        <div className="md:hidden fixed flex justify-end p-4">
          <button onClick={() => setIsOpen(true)} aria-label="Open Filters">
            <SlidersHorizontal size={28} />
          </button>
        </div>

        {/* Sidebar Filters - Desktop */}
        <aside className="hidden md:block w-64 bg-white p-4 space-y-6 text-sm text-gray-700">
          {!query && (
            <div>
              <h3 className="font-bold mb-2">Explore Related Products</h3>
              <ul className="space-y-1">
                {recommendations.map(item => (
                  <li
                    key={item}
                    className="hover:underline cursor-pointer"
                    onClick={() => handleRecomClick(item)}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {renderFilterSections()}
        </aside>

        {/* Mobile Slide-In Filters */}
        <div
          className={`fixed top-0 left-0 h-full w-[85%] sm:w-[70%] bg-white z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
            } md:hidden p-4 text-sm text-gray-700 overflow-y-auto`}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Filters</h2>
            <button onClick={() => setIsOpen(false)} aria-label="Close Filters">
              <X size={24} />
            </button>
          </div>

          {!query && (
            <div>
              <h3 className="font-bold mb-2">Explore Related Products</h3>
              <ul className="space-y-1">
                {recommendations.map(item => (
                  <li
                    key={item}
                    className="hover:underline cursor-pointer"
                    onClick={() => handleRecomClick(item)}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {renderFilterSections()}
        </div>

        {/* Overlay when mobile filter is open */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 flex-1">
          {loading && (
            <div className="flex justify-center items-center h-64 col-span-full">
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
            </div>
          )}
          {!loading && filteredProductData.length === 0 && (
            <p className="col-span-full text-center text-gray-500">No products found.</p>
          )}
          {!loading &&
            filteredProductData.map((product) => (
              <div
                key={product.id}
                className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer flex flex-col gap-2 "
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
                {product.images?.[0] && (
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-40 object-contain mb-2"
                  />
                )}
                <div className='flex flex-col gap-2 itmes-end-center justify-end flex h-[176px]'>
                <h3 className="font-medium text-sm">{product.title}</h3>
                <div className="text-orange-500 text-xl mb-1">
                    {"★".repeat(Math.floor(product.rating || 0))}
                    {"☆".repeat(5 - Math.floor(product.rating || 0))}
                  </div>
                <p className="text-sm text-gray-500 truncate">{product.description}</p>
                <p className="text-blue-600 font-bold">$ {product.price}</p>
                <button
                  className="w-full py-1 bg-yellow-400 hover:bg-yellow-500 rounded text-sm   " 
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent modal open
                    console.log("Trying to add to cart:", product);
                    dispatch(addToCart(product));
                    console.log("Added to cart ");
                    alert(`${product.title} Added to Cart`)

                    ;
                  }}
                >
                  Add to Cart
                </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      {selectedProduct && (
        <Modal product={selectedProduct} onClose={closeModal} onAddToCart={addToCart} />
      )}
    </div>
  );
}

export default SearchPage;
