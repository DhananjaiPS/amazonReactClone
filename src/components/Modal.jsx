import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../slices/cartSlice';

function Modal({ selectedProduct, closeModal }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart); // Grab cart from Redux
  const [addedItems, setAddedItems] = useState([]);

  useEffect(() => {
    
    const addedIds = cart.items.map((item) => item.product.id);
    setAddedItems(addedIds);
  }, [cart]);

  const isAlreadyAdded = selectedProduct && addedItems.includes(selectedProduct.id);

  return (
    <div>
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-2">
          <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md relative ">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
            >
              ✕
            </button>

            <img
              src={selectedProduct.images?.[0]}
              alt={selectedProduct.title}
              className="w-full h-48 object-contain mb-4"
            />

            <h2 className="text-lg font-bold mb-1">{selectedProduct.title}</h2>
            <div className="text-yellow-500 text-sm mb-1">
              {"★".repeat(Math.floor(selectedProduct.rating || 0))}
              {"☆".repeat(5 - Math.floor(selectedProduct.rating || 0))}
            </div>
            <p className="text-sm text-gray-600 mb-2">{selectedProduct.description}</p>
            <p className="text-lg font-semibold mb-4"> $ {selectedProduct.price}</p>

            <div className="flex flex-col sm:flex-row gap-2">
              <button
                className={`flex-1 py-2 rounded text-sm transition-all ${
                  isAlreadyAdded
                    ? 'bg-green-400 cursor-not-allowed text-white'
                    : 'bg-yellow-400 hover:bg-yellow-500 text-black'
                }`}
                disabled={isAlreadyAdded}
                onClick={() => {
                  if (!isAlreadyAdded) {
                    dispatch(addToCart(selectedProduct));
                  }
                }}
              >
                {isAlreadyAdded ? 'Added to Cart' : 'Add to Cart'}
              </button>

              <button className="flex-1 py-2 bg-orange-400 hover:bg-orange-500 text-white rounded text-sm">
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
