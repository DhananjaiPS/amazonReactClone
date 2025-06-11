import React, { useState , useCallback} from "react";
import { useNavigate } from "react-router-dom";
import { suggestion } from "../data/mockData";
import { MagnifyingGlass, X } from "@phosphor-icons/react";

export default function Searchbar({ SearchTerm = "" }) {
  const [value, setValue] = useState(SearchTerm);
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [available, setAvailable] = useState(true);
  const navigate = useNavigate();

  // Simulate fetching suggestions (debounce in real app)
  function debounce(func, delay = 300) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

 const fetchSuggestions = async (q) => {
  setLoading(true);
  const results = suggestion.filter((item) =>
    item.toLowerCase().includes(q.toLowerCase())
  );
  setSuggestions(results);
  setLoading(false);
  setOpen(true);
};

const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 300), []);


  const doSearch = async (q) => {
  setOpen(false);
  navigate(`/search?q=${encodeURIComponent(q)}`);
  setLoading(true);
  try {
    const res = await fetch(`https://dummyjson.com/products/search?q=${encodeURIComponent(q)}&limit=100`);
    const data = await res.json();
    const isAvailable = data.products && data.products.length > 0;
    setAvailable(isAvailable);
    // Optionally, you can set the fetched products to a state variable
    // setProductData(data.products);
  } catch (error) {
    console.error("Error fetching search results:", error);
    setAvailable(false);
  } finally {
    setLoading(false);
  }
};


  // Input change handler
 const onInput = (e) => {
  const v = e.target.value;
  setValue(v);
  if (v.trim()) debouncedFetchSuggestions(v); // <-- use debounced function
  else setOpen(false);
};


  // Keyboard shortcuts
  const onKeyDown = (e) => {
    if (e.key === "Enter") doSearch(value);
    else if (e.key === "Escape") setOpen(false);
  };

  // Clear input + dropdown
  const clearAll = () => {
    setValue("");
    setSuggestions([]);
    setOpen(false);
  };

  // “Recommend” button
  const sendRecommendation = () =>
    alert("Request sent to Amazon for recommendation!");

  // “Continue Shopping” nav
  const continueShopping = () => navigate("/");
  {console.log(available,"avai")
  console.log(open ,"open")}
  return (
    <div className="relative w-full max-w-xl mx-auto">
      <div className="flex items-center border rounded-md overflow-hidden">
        <input
          className="flex-grow px-3 py-3 outline-none text-black"
          placeholder="Search Amazon.in"
          value={value}
          onChange={onInput}
          onKeyDown={onKeyDown}
        />
        {value && (
          <button onClick={clearAll} className="p-2 text-white">
            <X size={18} />
          </button>
        )}
        <button onClick={() => doSearch(value)} className="bg-orange-300 py-3 px-3">
          <MagnifyingGlass size={24} />
        </button>
      </div>

      {open && (
        <div className="absolute top-full left-0 right-0 bg-white  text-black border mt-1 rounded-md shadow-lg z-20">
          {loading ? (
            <p className="p-4 text-center text-gray-500">Loading…</p>
          ) : suggestions.length > 0 ? (
            suggestions.map((s, i) => (
              <div
                key={i}
                onClick={() => doSearch(s)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {s}
              </div>
            ))
          ) : (
            <div className="p-4 space-y-3">
              <p className="text-gray-600">No products found.</p>
              <div className="flex gap-2">
                <button
                  onClick={sendRecommendation}
                  className="flex-1 bg-black text-white text-sm py-2 rounded"
                >
                  Send Recommendation
                </button>
                <button
                  onClick={continueShopping}
                  className="flex-1 bg-orange-500 text-white text-sm py-2 rounded"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      
      {!available && !open && (
  <div className="absolute mt-2 top-40">
    <p className="text-black text-xl">
      This item isn’t currently available on Amazon.
    </p>
    <button
      onClick={continueShopping}
      className="mt-2 bg-orange-500 text-white py-2 px-4 rounded w-[40vh]"
    >
      Continue Shopping
    </button>
  </div>
)}
    </div>
  );
}
