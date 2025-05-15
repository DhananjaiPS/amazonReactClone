import { Link } from "react-router-dom";
import Searchbar from "./Searchbar";
import { ShoppingCart, List } from "@phosphor-icons/react"; // Added List for hamburger icon
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import UserModal from "./UserModal";
import { useSelector } from "react-redux";

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

  return (
    <>
      <div className="w-full flex items-center bg-[#131921] text-white font-roboto py-2 px-3 justify-between relative z-20">
        {/* Left side: Logo hidden on mobile */}
        <div className="hidden sm:flex items-center gap-3">
          <div className="flex scale-[0.9] cursor-pointer" onClick={() => navigate("/")}>
            <div
              className="w-[116px] h-[48px] bg-no-repeat bg-[length:400px_auto] bg-[url('https://m.media-amazon.com/images/G/31/gno/sprites/nav-sprite-global-2x-reorg-privacy._CB546381437_.png')]"
              style={{ backgroundPosition: "-9px -134px" }}
              aria-label="Amazon"
            />
            <div className="text-lg font-semibold mt-2">.in</div>
          </div>
        </div>

        {/* Middle: Searchbar */}
        <div className="flex-grow max-w-[550px] mx-4 text-black">
          <Searchbar setSearchTerm={setSearchTerm} />
        </div>

        {/* Right side on mobile: Cart and Hamburger */}
        <div className="flex items-center gap-4 sm:hidden">
          <Link to="/cart" className="relative">
            <ShoppingCart size={28} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-300 text-black rounded-full px-2 text-xs font-bold">
                {totalItems}
              </span>
            )}
          </Link>
          <button
            aria-label="Open Menu"
            onClick={() => setMenuOpen(true)}
            className="p-1"
          >
            <List size={32} />
          </button>
        </div>

        {/* Right side on desktop: full nav */}
        <ul className="hidden sm:flex gap-8 text-lg items-center">
          <li className="flex items-center gap-1 text-sm cursor-pointer">
            <img src="/indian_flag.png" alt="indian flag" className="h-4" />
            <p>EN</p>
            <img src="/dropdown.png" alt="dropdown" />
          </li>

          <li className="text-sm cursor-pointer">
            <p onClick={() => navigate(`/login`)}>Hello, {username}</p>
            <div>
              <p className="flex font-bold cursor-pointer" onClick={() => setShowModal(true)}>
                Accounts & Lists
                <span>
                  <img src="/dropdown.png" alt="dropdown" />
                </span>
              </p>
              {showModal && <UserModal onClose={() => setShowModal(false)} />}
            </div>
          </li>

          <li className="text-sm cursor-pointer">
            <p>Returns</p>
            <p className="font-bold">& Orders</p>
          </li>

          <li className="text-sm flex items-center relative cursor-pointer">
            <Link to="/cart" className="flex items-center">
              <ShoppingCart size={32} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-300 text-black rounded-full px-2 text-xs font-bold">
                  {totalItems}
                </span>
              )}
            </Link>
          </li>
        </ul>
      </div>

      {/* Mobile Sidebar Menu */}
      {menuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-70 z-30"
            onClick={() => setMenuOpen(false)}
          />
          {/* Sidebar */}
          <div className="fixed top-0 right-0 w-64 h-full bg-[#131921] text-white z-40 flex flex-col p-6 space-y-6 shadow-lg">
            <button
              className="self-end text-white text-3xl font-bold"
              aria-label="Close Menu"
              onClick={() => setMenuOpen(false)}
            >
              &times;
            </button>
            <nav className="flex flex-col gap-4">
              {[
                { text: "EN", icon: "/indian_flag.png" },
                { text: `Hello, ${username}`, action: () => navigate("/login") },
                { text: "Accounts & Lists", action: () => setShowModal(true) },
                { text: "Returns & Orders", action: () => navigate("/orders") },
                { text: "Cart", action: () => navigate("/cart") },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="cursor-pointer px-3 py-2 rounded hover:bg-orange-500"
                  onClick={() => {
                    if (item.action) item.action();
                    setMenuOpen(false);
                  }}
                >
                  <div className="flex items-center gap-2">
                    {item.icon && (
                      <img src={item.icon} alt={item.text} className="h-4" />
                    )}
                    <span>{item.text}</span>
                  </div>
                </div>
              ))}
            </nav>
          </div>
        </>
      )}

      
      {showModal && <UserModal onClose={() => setShowModal(false)} />}
    </>
  );
};

export default Navbar;
