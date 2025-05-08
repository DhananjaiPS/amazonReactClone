import React from 'react';

const CartPage = ({ cart, setCart }) => {
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <p className="text-lg">Your Cart is empty.</p>
      </div>
    );
  }

  const handleRemove = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto flex flex-col lg:flex-row gap-6 px-4">
        {/* Cart Items Section */}
        <section className="flex-1 bg-white p-6 rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
          {cart.map((item, index) => (
            <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b pb-4 mb-4">
              <img src={item.image} alt={item.title} className="w-24 h-24 object-contain" />
              <div className="flex-1">
                <h2 className="text-lg font-semibold hover:underline cursor-pointer truncate max-w-xs">{item.title}</h2>
                <p className="text-sm text-gray-600">Seller: Amazon.com</p>
                <div className="mt-2 flex items-center space-x-2">
                  <label htmlFor={`qty-${index}`} className="text-sm">Qty:</label>
                  <select
                    id={`qty-${index}`} 
                    value={item.quantity}
                    onChange={(e) => {
                      const newCart = [...cart];
                      newCart[index].quantity = parseInt(e.target.value);
                      setCart(newCart);
                    }}
                    className="border p-1 text-sm"
                  >
                    {[...Array(10).keys()].map((n) => (
                      <option key={n+1} value={n+1}>{n+1}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold">₹{(item.price * item.quantity).toFixed(2)}</p>
                <button
                  onClick={() => handleRemove(index)}
                  className="mt-2 text-blue-600 hover:underline text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </section>

        {/* Order Summary Section */}
        <aside className="w-full lg:w-96 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="flex justify-between mb-2">
            <span>Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
            <span className="font-bold">₹{total.toFixed(2)}</span>
          </div>
          <button className="w-full mt-4 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-lg">
            Proceed to Buy
          </button>
        </aside>
      </div>
    </div>
  );
};

export default CartPage;
