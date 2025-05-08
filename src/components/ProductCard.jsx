const ProductCard = ({ product, setCart }) => {
    const handleAddToCart = () => {
        setCart(prevCart => [...prevCart, product]);
    };

    return (
        <div className="bg-white p-4 rounded shadow-md">
            <img src={product.image} alt={product.title} className="h-40 object-contain mx-auto" />
            <h2 className="text-sm mt-2 font-semibold">{product.title}</h2>
            <p className="text-green-700 font-bold">₹{product.price}</p>
            <button
                className="mt-2 bg-yellow-400 px-4 py-1 rounded hover:bg-yellow-300"
                onClick={handleAddToCart}
            >
                Add to Cart
            </button>
        </div>
    );
};
export default ProductCard;