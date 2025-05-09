import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import SearchPage from './components/SearchPage';
import Login from './components/Login';
// import CheckoutPage from './pages/CheckoutPage';
import CheckoutPage from './components/CheckoutPage';
// import CarouselCard from './components/CarouselCard';
function App() {
 
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const [searchTerm, setSearchTerm] = useState("");

  
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <HomePage
            cart={cart}
            setCart={setCart}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        } />
        <Route path="/cart" element={
          <CartPage
            cart={cart}
            setCart={setCart}
          />
        } />
          <Route
          path="/search"
          element={<SearchPage />}
        />
        <Route path='/login' element={<Login/>} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
