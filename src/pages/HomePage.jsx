import CarouselCard from "../components/Carousel";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import products from "../data/products"; // your array of product objects

const HomePage = ({ cart, setCart, searchTerm, setSearchTerm }) => {
    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );



    

    return (
        <div className="bg-[#EAEDED]">
            <Navbar setSearchTerm={setSearchTerm} cart={cart} />
            
            <CarouselCard />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 relative bottom-[23vh]">
                {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} setCart={setCart} />
                ))}
            </div>
            <Footer />
        </div>
    );
};

export default HomePage;
