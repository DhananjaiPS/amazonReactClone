import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Modal from './Modal';
import ProductCard from './ProductCard';

function SearchPage() {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const handleProductClick = (product) => setSelectedProduct(product);
  const closeModal = () => setSelectedProduct(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [Productdata, setProductData] = useState([]);
  const [filteredProductData, setFilteredProductData] = useState([]);
  const [loading, setLoading] = useState(false);

  // filter states
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(10000);
  const [brands, setBrands] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [deals, setDeals] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [rating, setRating] = useState(null);

  // recommendations
  const recommendations = ['Apple AirPods', 'Apple Watch', 'Apple iPad', 'Apple MacBook Pro'];

  // fetch products
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch(`https://dummyjson.com/products/search?q=${query}&limit=100`);
        const data = await res.json();
        setProductData(data.products);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    }
    fetchData();
  }, [query]);




  const [LocalCart,setCart]=useState([]);

function addToCart(product) {
  let existingCart = JSON.parse(localStorage.getItem('cart'));
  const updatedCart = [...existingCart, product];
  localStorage.setItem('cart', JSON.stringify(updatedCart));
  setCart(updatedCart);
}



  // apply filters
  useEffect(() => {
    let data = Productdata.filter(p => p.price >= min && p.price <= max);
    if (brands.length) data = data.filter(p => brands.includes(p.brand));
    if (departments.length) data = data.filter(p => departments.includes(p.category));
    if (deals.includes('today')) data = data.filter(p => p.discountPercentage >= 10);
    if (sellers.length) data = data.filter(p => sellers.includes(p.title));
    if (rating) data = data.filter(p => Math.floor(p.rating) >= rating);
    setFilteredProductData(data);
  }, [Productdata, min, max, brands, departments, deals, sellers, rating]);

  // handle recommendation click
  const handleRecomClick = (text) => {
    setSearchParams({ q: text });
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-6 flex gap-6">
        <aside className="w-64 bg-white p-4 space-y-6 text-sm text-gray-700">
          {/* show recommendations only when no query */}
          {!query && (
            <div>
              <h3 className="font-bold mb-2">Explore Related Products</h3>
              <ul className="space-y-1">
                {recommendations.map(item => (
                  <li key={item}
                    className="hover:underline cursor-pointer"
                    onClick={() => handleRecomClick(item)}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h3 className="font-bold mb-2">Brands</h3>
            <ul className="space-y-1 max-h-32 overflow-y-auto">
              {['Apple', '365 by Whole Foods Market', 'GoGo SqueeZ', 'Amazon Fresh', 'Quaker', 'Mott\'s', 'Bragg'].map(b => (
                <li key={b} className="flex items-center">
                  <input type="checkbox" className="mr-2" value={b}
                    onChange={e => {
                      const v = e.target.value;
                      setBrands(prev => e.target.checked ? [...prev, v] : prev.filter(x => x !== v));
                    }} />{b}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-2">Department</h3>
            <ul className="space-y-1">
              {['electronics', 'smartphones', 'laptops', 'fragrances'].map(c => (
                <li key={c} className="flex items-center">
                  <input type="checkbox" className="mr-2" value={c}
                    onChange={e => {
                      const v = e.target.value;
                      setDepartments(prev => e.target.checked ? [...prev, v] : prev.filter(x => x !== v));
                    }} />{c}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-2">Price</h3>
            <div className="flex items-center space-x-2">
              <input type="number" className="w-20 p-1 border" value={min}
                min="0" onChange={e => setMin(Number(e.target.value))} />
              <span>–</span>
              <input type="number" className="w-20 p-1 border" value={max}
                min="0" onChange={e => setMax(Number(e.target.value))} />
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-2">Deals & Discounts</h3>
            <label className="flex items-center">
              <input type="checkbox" value="today"
                onChange={e => setDeals(prev => e.target.checked ? [...prev, 'today'] : prev.filter(x => x !== 'today'))}
                className="mr-2" />Today's Deals
            </label>
          </div>

          <div>
            <h3 className="font-bold mb-2">Seller</h3>
            <ul className="space-y-1">
              {['ZooScape', 'Amazon.com'].map(s => (
                <li key={s} className="flex items-center">
                  <input type="checkbox" className="mr-2" value={s}
                    onChange={e => setSellers(prev => e.target.checked ? [...prev, s] : prev.filter(x => x !== s))}
                  />{s}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-2">Customer Reviews</h3>
            {[4, 3, 2, 1].map(r => (
              <label key={r} className="flex items-center">
                <input type="radio" name="rating" className="mr-2" value={r}
                  onChange={() => setRating(r)} />{r} Stars & Up
              </label>
            ))}
          </div>
        </aside>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {!loading &&
            filteredProductData.map((product, index) => {
              const img = product.images?.[0];
              return (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
                  onClick={() => handleProductClick(product)}    // sending the product to the modal and avoid realling the fetch api if use id
                >
                  {img && (
                    <img
                      src={img}
                      alt={product.title}
                      className="w-full h-40 object-contain mb-2"
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
                    $ {product.price}
                  </p>
                  <button
                    className="mt-2 w-full py-1 bg-yellow-400 hover:bg-yellow-500 rounded text-sm"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>

                  <button
                    className="mt-2 w-full py-1 bg-orange-400 hover:bg-orange-500 rounded text-sm"
                    onClick={() => buynow(product)}
                  >
                    Buy Now
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
