import React, { useState } from "react";
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
  const fetchSuggestions = async (q) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 300));
    const results = suggestion.filter((item) =>
      item.toLowerCase().includes(q.toLowerCase())
    );
    setSuggestions(results);
    setLoading(false);
    setOpen(true);
  };

  // Trigger search & stock check
  const doSearch = (q) => {
    setOpen(false);
    navigate(`/search?q=${encodeURIComponent(q)}`);
    const isAvail = Math.random() > 0.5; // replace w/ real API
    setAvailable(isAvail);
  };

  // Input change handler
  const onInput = (e) => {
    const v = e.target.value;
    setValue(v);
    if (v.trim()) fetchSuggestions(v);
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

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <div className="flex items-center border rounded-md overflow-hidden">
        <input
          className="flex-grow px-3 py-2 outline-none text-black"
          placeholder="Search Amazon.in"
          value={value}
          onChange={onInput}
          onKeyDown={onKeyDown}
        />
        {value && (
          <button onClick={clearAll} className="p-2">
            <X size={18} />
          </button>
        )}
        <button onClick={() => doSearch(value)} className="bg-orange-300 p-2">
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
                  className="flex-1 bg-blue-600 text-white py-2 rounded"
                >
                  Send Recommendation
                </button>
                <button
                  onClick={continueShopping}
                  className="flex-1 bg-yellow-500 text-white py-2 rounded"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {!available && !open && (
        <div className="absolute mt-2  flex justify-start flex-col gap-10 text-black border border-white-400 p-3 -mdrounded top-20 w-[110vh] h-[90vh]">
          <p className="text-white-800 text-xl">
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
