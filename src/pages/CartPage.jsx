import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function CartPage() {
  const [cart, setCart] = useState([]);
  const [buynow, setBuynow] = useState([]);
  const navigate = useNavigate(); // Use the navigate function

  useEffect(() => {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(existingCart);

    const buyNowItems = JSON.parse(localStorage.getItem('buynow')) || [];
    setBuynow(buyNowItems);
  }, []);

  function remove(product) {
    const updatedCart = cart.filter((item) => item.id !== product.id);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart);
  }

  function handleBuyNow(product) {
    const updatedBuyNow = [...buynow, product];
    localStorage.setItem('buynow', JSON.stringify(updatedBuyNow));
    setBuynow(updatedBuyNow);
  }

  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {cart.length === 0 ? (
        <div className="text-center mt-20">
          <h2 className="text-2xl font-semibold mb-4">Your Cart is empty</h2>
          <button
            className="bg-yellow-400 hover:bg-yellow-300 px-6 py-2 rounded font-medium"
            onClick={() => navigate('/')} // Use navigate to go to the home page
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Products Section */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((product, index) => {
              const img = product.images?.[0];
              return (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 border rounded bg-white shadow-sm"
                >
                  {img && (
                    <img
                      src={img}
                      alt={product.title}
                      className="w-28 h-28 object-contain"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-md">{product.title}</h3>
                    <div className="text-yellow-500 text-sm mb-1">
                      {'★'.repeat(Math.floor(product.rating || 0))}
                      {'☆'.repeat(5 - Math.floor(product.rating || 0))}
                    </div>
                    <p className="text-lg font-bold text-gray-800 mb-2">
                      ₹ {product.price.toLocaleString()}
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleBuyNow(product)}
                        className="bg-yellow-400 hover:bg-yellow-300 text-sm px-3 py-1 rounded"
                      >
                        Buy Now
                      </button>
                      <button
                        onClick={() => remove(product)}
                        className="bg-red-400 hover:bg-red-500 text-sm px-3 py-1 rounded text-white"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Cart Summary */}
          <div className="sticky top-20 self-start bg-white p-4 rounded shadow-md">
            <h2 className="text-lg font-bold mb-3">Cart Summary</h2>
            <p className="mb-2">Items: <strong>{cart.length}</strong></p>
            <p className="mb-4">Total: <strong>₹ {totalPrice.toLocaleString()}</strong></p>
            <button
              className="bg-yellow-400 hover:bg-yellow-300 w-full py-2 rounded font-medium"
               onClick={() =>
                navigate('/checkout', {
                  state: { cart, totalPrice }, // Pass cart and price to CheckoutPage
                })
              } // Use navigate to go to the checkout page
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
