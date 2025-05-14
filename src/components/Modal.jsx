import React, { useState, useEffect } from 'react';

function Modal({ selectedProduct, closeModal }) {
  // Track the added items (we'll load this from localStorage initially)
  const [addedItems, setAddedItems] = useState([]);

  useEffect(() => {
    // Load the already added items from localStorage on initial render
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    setAddedItems(existingCart.map(item => item.id)); // Store only product ids
  }, []);

  function addToCart(product) {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = [...existingCart, product];
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    // Update the state to reflect the added item
    setAddedItems([...addedItems, product.id]);
  }

  return (
    <div>
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-md relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              ✕
            </button>
            <img
              src={selectedProduct.images?.[0]}
              alt={selectedProduct.title}
              className="w-full h-48 object-contain mb-4"
            />
            <h2 className="text-lg font-bold mb-2">{selectedProduct.title}</h2>
            <div className="text-yellow-500 text-sm mb-1">
              {"★".repeat(Math.floor(selectedProduct.rating || 0))}
              {"☆".repeat(5 - Math.floor(selectedProduct.rating || 0))}
            </div>
            <p className="text-gray-700 mb-2">{selectedProduct.description}</p>
            <p className="text-lg font-semibold mb-4"> $ {selectedProduct.price}</p>
            <div className="flex gap-2">
              <button
                className={`flex-1 py-2 rounded text-sm ${
                  addedItems.includes(selectedProduct.id)
                    ? 'bg-green-400 cursor-default'
                    : 'bg-yellow-400 hover:bg-yellow-500'
                }`}
                disabled={addedItems.includes(selectedProduct.id)} // Prevent re-click
                onClick={() => {
                  if (!addedItems.includes(selectedProduct.id)) {
                    addToCart(selectedProduct);
                  }
                }}
              >
                {addedItems.includes(selectedProduct.id)
                  ? 'Added to Cart'
                  : 'Add to Cart'}
              </button>
              <button
                className="flex-1 py-2 bg-orange-400 hover:bg-orange-500 rounded text-sm"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;
