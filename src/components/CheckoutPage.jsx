import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../slices/cartSlice.js'; // Make sure this action is defined in cartSlice
import { ArrowBendUpLeft  } from "@phosphor-icons/react";

function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { items = [], totalPrice = 0 } = location.state || {};

  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [seconds, setSeconds] = useState(5);

  const handlePayment = () => {
    setPaymentProcessing(true);
  };

  const handleRedirect = () => {
    dispatch(clearCart()); // clear Redux store cart
    navigate('/');
  };

  useEffect(() => {
    let timer;
    if (paymentProcessing) {
      timer = setInterval(() => {
        setSeconds(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            handleRedirect();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [paymentProcessing]);

  const filteredItems = items.filter(
    item => item && item.product && typeof item.product.price === 'number'
  );

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col">
      {/* Left: Items List */}
        <div 
        className="flex items-center text-blue-500 cursor-pointer mb-6"
        
        onClick={()=>{navigate('/cart')}}><ArrowBendUpLeft size={32} /> Back</div>
      
      <div className="flex-1 space-y-4 w-full   items-center">
        <h2 className="text-2xl font-semibold mb-6  flex  justify-center items-center">Checkout</h2>
        {filteredItems.length > 0 ? (
          filteredItems.map((cartItem, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 border rounded bg-white shadow-sm"
            >
              <img
                src={cartItem.product.images?.[0] || 'https://via.placeholder.com/100'}
                alt={cartItem.product.title}
                className="w-28 h-28 object-contain"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-md">{cartItem.product.title}</h3>
                <p className="text-lg font-bold text-gray-800 mb-2">
                  $ {cartItem.product.price.toLocaleString()} × {cartItem.quantity}
                </p>
              </div>
            </div>
          ))
        ) : (
          
          <p className="text-gray-600">Your cart is empty or invalid.</p>
        )}
      </div>

      {/* Right: Summary + Payment */}
      <div className="w-[300px] ml-8 space-y-4 flex flex-col gap-4 justify-start">
        <div className="bg-white p-4 rounded shadow-md  w-[70vh] flex flex-col relative -left-8 gap-4">
          <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
          <p className="mb-2">Items: <strong>{filteredItems.length}</strong></p>
          <p className="text-xl font-bold">Total: $ {totalPrice.toLocaleString()}</p>
        </div>

        {!paymentProcessing ? (
          <button
            className="bg-orange-500 text-xl hover:bg-green-600 w-full py-2 rounded font-medium text-white mt-6 p-10"
            onClick={handlePayment}
          >
            Complete Payment
          </button>
        ) : (
          <div className="absolute inset-0  flex items-center justify-center z-50 w-full top-100">
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center  w-[40vh]">
              <img
                src="https://i.gifer.com/7efs.gif"
                alt="Payment Success"
                className="w-40 h-40 object-contain"
              />
              <p className="text-xl font-semibold mt-4 text-green-600  relative -left-[32px]">
                Payment Completed!
              </p>
              <p className="text-sm mt-2 text-gray-500">
                Redirecting to homepage in <span className="font-bold">{seconds}</span>...
              </p>
            </div>
          </div>
        )}


        
      </div>
    </div>
  );
}

export default CheckoutPage;
