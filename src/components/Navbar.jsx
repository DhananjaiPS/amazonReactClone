import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, List, Bag, MapPin } from "@phosphor-icons/react";
import { useState, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import Searchbar from "./Searchbar";
import UserModal from "./UserModal";
import './NavBar.css';

const Navbar = ({ setSearchTerm }) => {
  const cart = useSelector((store) => store.cart);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const username = currentUser ? currentUser.username : "sign in";

  const totalItems = useMemo(() => {
    if (!Array.isArray(cart.items)) return 0;
    return cart.items.reduce((acc, item) => acc + (isNaN(item.quantity) ? 0 : item.quantity), 0);
  }, [cart]);

  const [location, setLocation] = useState(null);
  const [city, setCity] = useState(null);

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
          const city = components.city || components.town || components.village || components.state;
          const country = components.country;
          const stateName = components.state;

          setCity(city ? `${city}` : 'Location not found');
          setLocation(`${stateName}, ${country}`);
        } catch (error) {
          setCity('Error fetching location');
        }
      },
      () => setCity('Location access denied')
    );
  }, []);

  return (
    <>
      {/* === NAVBAR === */}
      <div className="bg-[#131921] text-white px-4 py-2 w-full z-50">
        <div className="flex items-center justify-between">
          {/* === LEFT: Logo + Location === */}
          <div className="flex items-center gap-6">
            {/* Logo */}
            <div className=" hidden sm:flex items-center gap-1 text-sm text-gray-300 flex items-center gap-1 cursor-pointer" onClick={() => navigate("/")}>
              <div
                className="w-[120px] h-[50px]  mr-[3vh] bg-no-repeat bg-[length:400px_auto] bg-[url('https://m.media-amazon.com/images/G/31/gno/sprites/nav-sprite-global-2x-reorg-privacy._CB546381437_.png')]"
                style={{ backgroundPosition: "-9px -134px" }}
              />
              {/* <span className="text-sm font-semibold ">.in</span> */}
            </div>
            {/* === MOBILE SEARCHBAR === */}
            {/* === MOBILE RIGHT SIDE (Searchbar + Cart + Menu) === */}
            <div className="flex sm:hidden items-center justify-between gap-2 w-full mt-2">
              <div className="flex-grow">
                <Searchbar setSearchTerm={setSearchTerm} />
              </div>
              {/* <Link to="/cart" className="relative ml-2">
                <ShoppingCart size={26} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-300 text-black rounded-full px-2 text-xs font-bold">
                    {totalItems}
                  </span>
                )}
              </Link>
              <button onClick={() => setMenuOpen(true)} className="ml-2">
                <List size={26} />
              </button> */}
            </div>


            {/* Location (desktop only) */}
            {city && (
              <div className="hidden sm:flex items-center gap-1 text-sm text-gray-300 mr-[3vh]">
                <MapPin size={26} />
                <span>{city}</span>
              </div>
            )}
          </div>

          {/* === CENTER: Searchbar === */}
          <div className="hidden sm:block w-[50%]">
            <Searchbar setSearchTerm={setSearchTerm} />
          </div>

          {/* === RIGHT: Icons === */}
          <div className="flex items-center gap-5 text-sm w-[40%] justify-evenly ">
            <div className="hidden sm:flex items-center gap-2 cursor-pointer" onClick={() => navigate("/wishlist")}>
              <Bag size={29} />
              Wishlist
            </div>

            <div className="hidden sm:block cursor-pointer  flex justify-center ">
              <p onClick={() => navigate(`/login`)}>Hello  , {username}</p>
              <p className="font-bold" onClick={() => setShowModal(true)}>Accounts & Lists</p>
              {showModal && <UserModal onClose={() => setShowModal(false)} />}
            </div>

            <div className="hidden sm:block cursor-pointer">
              <p>Returns</p>
              <p className="font-bold">& Orders</p>
            </div>
<div className="ml-[3vh]">

            <Link to="/cart" className="relative">
              <ShoppingCart size={32} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-300 text-black rounded-full px-2 text-xs font-bold">
                  {totalItems}
                </span>
              )}
            </Link>
</div>

            {/* Hamburger for mobile */}
            <button className="sm:hidden" onClick={() => setMenuOpen(true)}>
              <List size={40} />
            </button>
          </div>
        </div>

        {/* === MOBILE SEARCHBAR ===
        <div className="mt-3 block sm:hidden">
          <Searchbar setSearchTerm={setSearchTerm} />
        </div> */}
      </div>

      {/* === MOBILE SIDEBAR === */}
      {menuOpen && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-60 z-40" onClick={() => setMenuOpen(false)}></div>
          <div className="fixed top-0 right-0 w-64 h-full bg-[#131921] text-white z-50 flex flex-col p-6 space-y-6 shadow-lg">
            <button className="self-end text-white text-3xl font-bold" onClick={() => setMenuOpen(false)}>
              &times;
            </button>
            <nav className="flex flex-col gap-4">
              <div className="px-3 py-2 hover:bg-orange-500 cursor-pointer" onClick={() => navigate("/login")}>
                Hello, {username}
              </div>
              <div className="px-3 py-2 hover:bg-orange-500 cursor-pointer" onClick={() => setShowModal(true)}>
                Accounts & Lists
              </div>
              <div className="px-3 py-2 hover:bg-orange-500 cursor-pointer" onClick={() => navigate("/orders")}>
                Returns & Orders
              </div>
              <div className="px-3 py-2 hover:bg-orange-500 cursor-pointer" onClick={() => navigate("/wishlist")}>
                Wishlist
              </div>
              <div className="px-3 py-2 hover:bg-orange-500 cursor-pointer" onClick={() => navigate("/cart")}>
                Cart
              </div>
              <div className="px-3 py-2 text-sm text-gray-400">
                {city ? `📍 ${city}` : "Fetching location..."}
              </div>
            </nav>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
