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

  let quantity = 0;
  const totalItems = useMemo(() => {
    for (let i = 0; i < cart.items.length; i++) {
      quantity += cart.items[i].quantity;  // <- use qty here
    }
    return quantity;
  }, [cart]);

  // Total price calc
  let totalPrice = 0;
  cart.items.forEach((item) => {
    totalPrice += item.product.price * item.quantity;  // <- qty here too
  });

  function remove(id) {
    dispatch(removeItem(id))
  }




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
  
          <div className="lg:col-span-2 space-y-6 w-full">
            {cart.items.map((element, index) => {
              const img = element.product.images?.[0];
              const rating = Math.floor(element.product.rating || 0);

              return (
                <div
                  key={index}
                  className="flex flex-col lg:flex-row items-start gap-4 p-6 border rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow"
                >
                  {img && (
                    <img
                      src={img}
                      alt={element.product.title}
                      className="w-32 h-32 object-contain border rounded-md"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="font-medium text-lg text-gray-800">{element.product.title}</h3>
                    <div className="text-yellow-500 text-sm mb-2">
                      {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
                    </div>
                    <p className="text-xl font-semibold text-gray-900 mb-2">
                      $ {element.product.price.toLocaleString()}
                    </p>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm text-gray-600">Qty:</span>
                      <button
                        className="w-7 h-7 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded"
                        onClick={() => dispatch(removeQuantity(element.product.id))}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={element.quantity}
                        readOnly
                        className="w-10 text-center border rounded bg-gray-100"
                      />
                      <button
                        className="w-7 h-7 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded"
                        onClick={() => dispatch(addQuantity(element.product.id))}
                      >
                        +
                      </button>
                    </div>

                    <div className="flex gap-4 text-sm">
                      <button
                        onClick={() => remove(element.product.id)}
                        className="text-blue-600 hover:underline"
                      >
                        Delete
                      </button>
                      <button className="text-blue-600 hover:underline">Save for later</button>
                      <button className="text-blue-600 hover:underline">See more like this</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>



          {/* Cart Summary */}
          <div className="sticky  self-start bg-white p-4 rounded shadow-md w-[50vh]">
            <h2 className="text-lg font-bold mb-3">Cart Summary</h2>
            <p className="mb-2">Items: <strong>{totalItems}</strong></p>
            <p className="mb-4">Total: <strong>$ {totalPrice.toLocaleString()}</strong></p>
            <button
              className="bg-yellow-600 hover:bg-orange-600 w-full py-2 rounded font-medium"
              onClick={() =>
                navigate('/checkout', {

                  state: { items: cart.items, totalPrice }, // Pass cart and price to CheckoutPage
                })
              } // Use navigate to go to the checkout page
            >
              Proceed to Checkout
              {console.log(cart.items)}
            </button>
          </div>
        </div>
      )
      }
    </div >
  );
}

export default CartPage;
