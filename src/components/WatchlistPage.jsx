import React from 'react';
import { useSelector } from 'react-redux';
import { ArrowBendUpLeft, Trash } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../slices/cartSlice'; // Import the action to add an item to the cart
import { removeItemWatchlist } from '../../slices/cartSlice'; // Import the action to remove an item from the cart
import { useState } from 'react';
function ProductCard({ product }) {
    const dispatch = useDispatch();
    const image = product.thumbnail || product.images?.[0] || '';
    const price = product.price || 0;
    const discount = product.discountPercentage || 0;
    const [addedToCart, setAddedToCart] = useState([]);


    const mrp = (price / (1 - discount / 100)).toFixed(2); // derived MRP

    return (
        <div className="border rounded-lg p-4 w-full sm:w-[300px] shadow hover:shadow-md transition bg-white">
            <div className='flex justify-end' onClick={() => dispatch(removeItemWatchlist(product.id))}>

                <Trash size={25} className='text-red-600' />
            </div>
            <img
                src={image}
                alt={product.title}
                className="w-full h-48 object-contain mb-4"
            />
            <h3 className="font-semibold text-base">{product.title}</h3>

            <div className="text-orange-500 text-xl mb-1">
                {"★".repeat(Math.floor(product.rating || 0))}
                {"☆".repeat(5 - Math.floor(product.rating || 0))}
            </div>

            <p className="text-green-600 text-xs mt-1">500+ bought in past month</p>

            <div className="mt-2">
                <p className="text-xl font-bold text-black">$ {price.toLocaleString()}</p>
                <p className="text-sm line-through text-gray-600">M.R.P: ${parseFloat(mrp).toLocaleString()}</p>
                <p className="text-red-500 text-sm font-semibold">{discount}% off</p>
            </div>

            <p className="text-sm text-gray-700 mt-1">
                {product.availabilityStatus}
            </p>
            <p className="text-sm text-gray-700">
                {product.shippingInformation}
            </p>

            {/* <button className="mt-3 w-full bg-yellow-400 hover:bg-yellow-500 text-black py-2 rounded font-medium"
                onClick={() => dispatch(addToCart(product))}>
                Add to Cart
            </button> */}
            <button
                className="mt-3 w-full bg-yellow-400 hover:bg-yellow-500 text-black py-2 rounded font-medium"
                onClick={(e) => {
                    e.stopPropagation(); // Prevent modal open
                    dispatch(addToCart(product));
                    // alert(`${product.title}Product Added !!!`)
                    setAddedToCart((prev) => [...new Set([...prev, product.id])]);
                }}
            >
                {addedToCart.includes(product.id) ? 'Added' : 'Add to Cart'}
            </button>
        </div>
    );
}

function WatchlistPage() {
    const navigate = useNavigate();
    const watchlist = useSelector((state) => state.cart.watchlist);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div
                className="flex items-center text-blue-500 cursor-pointer mb-6"
                onClick={() => navigate('/')}
            >
                <ArrowBendUpLeft size={32} />
                <span className="ml-2 font-medium">Back</span>
            </div>

            <h2 className="text-2xl font-bold mb-4">Your Watchlist</h2>

            {watchlist.length === 0 ? (
                <div className="text-center mt-20 text-gray-600 text-lg">
                    Watchlist is empty
                </div>
            ) : (
                <div className="flex flex-wrap gap-6">
                    {watchlist.map((item, index) => (
                        <ProductCard key={item.id || index} product={item.product} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default WatchlistPage;
