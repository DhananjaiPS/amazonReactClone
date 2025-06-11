import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowBendUpLeft  } from "@phosphor-icons/react";
import { useDispatch } from 'react-redux';
import { saveToWatchlist } from '../../slices/cartSlice'; // Import the action to save to watchlist

const BuyNowPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  const [selectedAddress, setSelectedAddress] = useState('Default Address, India');
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [locate, setLocation] = useState(null);
  const [city, setCity] = useState(null);
  const [error, setError] = useState('');
  const [isPaying, setIsPaying] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=9740e24e1099431fa367fd5aa00d7a10`
          );
          const data = await response.json();

          const components = data.results[0].components;
          const city =
            components.city ||
            components.town ||
            components.village ||
            components.state;
          const country = components.country;
          const stateName = components.state;

          setCity(city ? ` ${city}` : 'Location not found');
          setLocation(`${stateName}, ${country}`);
        } catch (error) {
          setCity('Error fetching location');
          console.error(error);
        }
      },
      (error) => {
        setLocation('Location access denied. Please enable it in your browser.');
        console.error(error);
      }
    );
  }, []);

  const handlePlaceOrder = () => {
    setIsPaying(true);
    setTimeout(() => {
      setIsPaying(false);
      setPaymentComplete(true);
      setTimeout(() => {
        navigate('/');
      }, 5000);
    }, 3000);
  };

  return (
    <div className="bg-[#f0f2f2] min-h-screen px-4 sm:px-12 py-6">
        <div 
                className="flex items-center text-blue-500 cursor-pointer mb-6"
                
                onClick={()=>{navigate('/cart')}}><ArrowBendUpLeft size={32} /> Back</div>
              
      <h2 className="text-2xl font-semibold mb-4">Buy Now</h2>

      {paymentComplete ? (
        <div className="flex flex-col items-center justify-center h-[70vh] bg-white rounded-lg shadow-md p-10 animate-fade-in">
          <div className="relative w-20 h-20 mb-6">
            <div className="absolute w-full h-full rounded-full bg-green-100 animate-ping"></div>
            <div className="absolute w-full h-full rounded-full bg-green-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
              ✔
            </div>
          </div>
          <h3 className="text-2xl font-bold text-green-600 mb-2">Payment Successful!</h3>
          <p className="text-gray-600 text-center mb-4">
            Your order has been placed. You’ll be redirected to the home screen shortly.
          </p>
          <div className="animate-bounce text-sm text-gray-500">Redirecting...</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="col-span-2 bg-white p-6 rounded shadow">
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Deliver to</h3>
              <select
                className="border rounded px-3 py-2 w-[40vh]"
                value={selectedAddress}
                onChange={(e) => setSelectedAddress(e.target.value)}
              >
                <option>Default Address, India</option>
                <option>Home,{city}</option>
                <option>Office, Bangalore</option>
              </select>
            </div>

            {product && (
              <div className="flex gap-4">
                <img src={product.images[0]} alt={product.title} className="w-32 h-32 object-contain" />
                <div>
                  <h4 className="text-md font-semibold">{product.title}</h4>
                  <p className="text-orange-600 font-bold text-lg">$ {product.price * 83}</p>
                  <p className="text-sm text-gray-600 mt-1">In Stock</p>
                </div>
              </div>
            )}

            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Select Payment Method</h3>
              <select
                className="border rounded px-3 py-2 w-full"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option>UPI</option>
                <option>Credit/Debit Card</option>
                <option>Net Banking</option>
                <option>Cash on Delivery</option>
              </select>
            </div>
          </div>

          <div className="bg-white p-6 rounded shadow sticky top-10">
            <h3 className="text-lg font-medium mb-4">Order Summary</h3>
            <div className="flex justify-between mb-2">
              <span>Item(s)</span>
              <span>₹ {product ? product.price * 83 : 0}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Delivery</span>
              <span className="text-green-600">FREE</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>$ {product ? product.price * 83 : 0}</span>
            </div>

            {isPaying ? (
              <div className="flex flex-col items-center justify-center mt-6">
                <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mb-2"></div>
                <p className="text-gray-700">Processing payment...</p>
              </div>
            ) : (
              <button
                onClick={handlePlaceOrder}
                className="mt-6 w-full py-2 bg-yellow-400 hover:bg-yellow-500 rounded font-medium"
              >
                Place Your Order
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyNowPage;
