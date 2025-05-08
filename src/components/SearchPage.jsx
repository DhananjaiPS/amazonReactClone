import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from './Navbar';


function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [Productdata, setProductData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch(`https://dummyjson.com/products/search?q=${query}&limit=20`);
        const data = await res.json();
        setProductData(data.products);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }
    if (query) fetchData();
  }, [query]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-6 flex gap-6">
        {/* Sidebar */}
        <aside className="w-64 bg-white p-4 space-y-6 text-sm text-gray-700">
          {/* Explore Related Products */}
          <div>
            <h3 className="font-bold mb-2">Explore Related Products</h3>
            <ul className="space-y-1">
              {['Apple AirPods','Apple Watch','Apple iPad','Apple MacBook Pro'].map(item => (
                <li key={item} className="hover:underline cursor-pointer">{item}</li>
              ))}
            </ul>
            <button className="mt-2 text-blue-600 hover:underline">See more</button>
          </div>

          {/* Brands */}
          <div>
            <h3 className="font-bold mb-2">Brands</h3>
            <ul className="space-y-1 max-h-32 overflow-y-auto">
              {['Apple','365 by Whole Foods Market','GoGo SqueeZ','Amazon Fresh','Quaker','Mott\'s','Bragg'].map(brand => (
                <li key={brand} className="flex items-center">
                  <input type="checkbox" className="mr-2" />{brand}
                </li>
              ))}
            </ul>
            <button className="mt-2 text-blue-600 hover:underline">See more</button>
          </div>

          {/* Department */}
          <div>
            <h3 className="font-bold mb-2">Department</h3>
            <ul className="space-y-1">
              {['Electronics','Earbud & In-Ear Headphones','Over-Ear Headphones','Computer Tablets','Fresh Apples','Fresh Honeycrisp Apples','Men\'s Smartwatches','Cell Phone Accessories'].map(dep => (
                <li key={dep} className="flex items-center">
                  <input type="checkbox" className="mr-2" />{dep}
                </li>
              ))}
            </ul>
          </div>

          {/* Price */}
          <div>
            <h3 className="font-bold mb-2">Price</h3>
            <div className="flex items-center space-x-2">
              <input type="number" placeholder="$1" className="w-20 p-1 border" />
              <span>–</span>
              <input type="number" placeholder="$330+" className="w-20 p-1 border" />
            </div>
            <button className="mt-2 px-3 py-1 bg-yellow-400 hover:bg-yellow-500 rounded">Go</button>
          </div>

          {/* Deals & Discounts */}
          <div>
            <h3 className="font-bold mb-2">Deals & Discounts</h3>
            <ul className="space-y-1">
              {['All Discounts','Today\'s Deals'].map(deal => (
                <li key={deal} className="flex items-center">
                  <input type="checkbox" className="mr-2" />{deal}
                </li>
              ))}
            </ul>
          </div>

          {/* Seller */}
          <div>
            <h3 className="font-bold mb-2">Seller</h3>
            <ul className="space-y-1 max-h-20 overflow-y-auto">
              {['ZooScape','Amazon.com'].map(seller => (
                <li key={seller} className="flex items-center">
                  <input type="checkbox" className="mr-2" />{seller}
                </li>
              ))}
            </ul>
            <button className="mt-2 text-blue-600 hover:underline">See more</button>
          </div>

          {/* Customer Reviews */}
          <div>
            <h3 className="font-bold mb-2">Customer Reviews</h3>
            <label className="flex items-center">
              <input type="radio" name="rating" className="mr-2" />4 Stars & Up
            </label>
          </div>

          {/* More facets can be added similarly... */}
        </aside>

        {/* Product Listing */}
        <main className="flex-1">
          <h2 className="text-xl font-semibold mb-2">Search Results</h2>
          {query ? (
            <p className="mb-4">Showing results for: <strong>{query}</strong></p>
          ) : (
            <p>No search query provided.</p>
          )}

          {loading && (
            <div className="flex justify-center items-center h-64">
              <img src="/animation.gif" alt="Loading..." className="w-60 h-30" />
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {!loading && Productdata.map((product, index) => {
              const img = product.images?.[0];
              return (
                <div key={index} className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
                  {img && <img src={img} alt={product.title} className="w-full h-40 object-contain mb-2" />}
                  <h3 className="font-medium text-sm mb-1 truncate">{product.title}</h3>
                  <p className="text-base font-semibold text-gray-900">₹{product.price}</p>
                  <button className="mt-2 w-full py-1 bg-yellow-400 hover:bg-yellow-500 rounded text-sm" >Add to Cart</button>
                </div>
              )
            })}
          </div>
        </main>
      </div>
    </div>
  );
}

export default SearchPage;
