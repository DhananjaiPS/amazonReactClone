import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#232F3E] text-white ">
      {/* Top Section */}
      <div className="max-w-screen-xl mx-auto px-4 py-6">
        <div className="flex justify-center mb-6">
          <Link to="/" className="flex items-center">
            <img
              className="w-[120px] h-[50px] bg-no-repeat bg-[length:400px_auto] bg-[url('https://m.media-amazon.com/images/G/31/gno/sprites/nav-sprite-global-2x-reorg-privacy._CB546381437_.png')]"
              style={{ backgroundPosition: "-9px -134px", border: "none" }}
            //   aria-label="Amazon"
            />
            {/* <span className="text-lg font-semibold">Amazon</span> */}
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-sm">
          <div>
            <h5 className="font-semibold mb-2">Get to Know Us</h5>
            <ul>
              <li><Link to="/about" className="hover:underline">About Amazon</Link></li>
              <li><Link to="/careers" className="hover:underline">Careers</Link></li>
              <li><Link to="/press" className="hover:underline">Press Releases</Link></li>
              <li><Link to="/science" className="hover:underline">Amazon Science</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-2">Make Money with Us</h5>
            <ul>
              <li><Link to="/sell" className="hover:underline">Sell on Amazon</Link></li>
              <li><Link to="/accelerator" className="hover:underline">Sell under Amazon Accelerator</Link></li>
              <li><Link to="/brand" className="hover:underline">Protect and Build Your Brand</Link></li>
              <li><Link to="/global" className="hover:underline">Amazon Global Selling</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-2">Let Us Help You</h5>
            <ul>
              <li><Link to="/account" className="hover:underline">Your Account</Link></li>
              <li><Link to="/returns" className="hover:underline">Returns Centre</Link></li>
              <li><Link to="/recalls" className="hover:underline">Recalls and Product Safety Alerts</Link></li>
              <li><Link to="/purchase" className="hover:underline">100% Purchase Protection</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-2">Amazon Payment Products</h5>
            <ul>
              <li><Link to="/pay" className="hover:underline">Amazon Pay on Merchants</Link></li>
              <li><Link to="/credit" className="hover:underline">Amazon Business Card</Link></li>
              <li><Link to="/reload" className="hover:underline">Reload Your Balance</Link></li>
              <li><Link to="/gift" className="hover:underline">Gift Cards</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-[#131A22] py-4 h-full">
        <div className="max-w-screen-xl mx-auto px-4 text-center text-xs">
          <p>&copy; 2025 Amazon Clone. Built with ❤️ by Dhananjai</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
