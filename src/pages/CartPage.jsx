import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useSelector } from 'react-redux'; // Import useSelector to access Redux store
import { useDispatch } from 'react-redux'; // Import useDispatch to dispatch actions
import { removeItem } from '../../slices/cartSlice'; // Import the action to remove an item from the cart
import { addToCart } from '../../slices/cartSlice'; // Import the action to add an item to the cart
import { addQuantity } from '../../slices/cartSlice'; // Import the action to add quantity of an item in the cart
import { removeQuantity } from '../../slices/cartSlice'; // Import the action to remove quantity of an item in the cart
function CartPage() {
  // const [cart, setCart] = useState([]);
  const dispatch = useDispatch(); //instance banana hoga
  const cart = useSelector(store => store.cart);
  console.log(typeof (cart.items));
  console.log(cart.items);


  const [buynow, setBuynow] = useState([]);
  const navigate = useNavigate(); // Use the navigate function

  const totalItems = useMemo(() => {
    let quantity = 0;
    for (let i = 0; i < cart.items.length; i++) {
      quantity += cart.items[i].quantity;
    }
    return quantity;
  }
    , [cart]);

  function remove(id) {

    dispatch(removeItem(id))

  }

  function handleBuyNow(product) {

  }

  let totalPrice = 0;
  cart.items.forEach((item) => {
    totalPrice += item.product.price * item.quantity; // Assuming each item has a quantity property
  });

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {cart.items.length === 0 ? (
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
        <div className="flex flex-col lg:flex-row lg:flex-wrap gap-6">
          {/* Products Section */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((element, index) => {
              const img = element.product.images?.[0];
              return (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 border rounded bg-white shadow-sm"
                >
                  {img && (
                    <img
                      src={img}
                      alt={element.product.title}
                      className="w-28 h-28 object-contain"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-md">{element.product.title}</h3>
                    <div className="text-yellow-500 text-sm mb-1">
                      {'★'.repeat(Math.floor(element.product.rating || 0))}
                      {'☆'.repeat(5 - Math.floor(element.product.rating || 0))}
                    </div>
                    <p className="text-lg font-bold text-gray-800 mb-2">
                      $ {element.product.price.toLocaleString()}
                    </p>
                    <p>
                      Quantity
                      <button className="bg-black text-sx w-8 text-white" onClick={()=>{dispatch(addQuantity(element.product.id))}}>+</button>
                      <input type="number" value={element.quantity} className="bg-gray-400 w-8" />
                      <button className="bg-black text-sx w-8 text-white" onClick={()=>dispatch(removeQuantity(element.product.id))}>-</button>
                    </p>

                    <div className="flex gap-3">

                      <button
                        onClick={() => remove(element.product.id)}
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
            <p className="mb-2">Items: <strong>{totalItems}</strong></p>
            <p className="mb-4">Total: <strong>$ {totalPrice.toLocaleString()}</strong></p>
            <button
              className="bg-yellow-400 hover:bg-yellow-300 w-full py-2 rounded font-medium"
              onClick={() =>
                navigate('/checkout', {
                  state: { items: cart.items, totalPrice }, // Pass cart and price to CheckoutPage
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
