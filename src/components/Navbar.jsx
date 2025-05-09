import { Link } from "react-router-dom";
import Searchbar from "./Searchbar";
import { ShoppingCart } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import UserModal from "./UserModal";


const Navbar = ({ setSearchTerm, cart }) => {
    const navigate = useNavigate();
const [showModal, setShowModal] = useState(false);
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const username = currentUser ? currentUser.username : "sign in";
    return (
        <div className="w-full flex bg-[#131921] text-white font-roboto py-2 px-3 items-center gap-3 text-sm  z-10 items-center relative justify-center">
            <div className="flex">
                <div className="flex scale-[0.9]">
                    <div
                        className="w-[116px] h-[48px] bg-no-repeat bg-[length:400px_auto] bg-[url('https://m.media-amazon.com/images/G/31/gno/sprites/nav-sprite-global-2x-reorg-privacy._CB546381437_.png')]"
                        style={{ backgroundPosition: "-9px -134px" }}
                        aria-label="Amazon"
                    />
                    <div className="text-lg font-semibold mt-2">.in</div>
                </div>

                <div className="flex w-fit">
                    <div
                        className="w-[36px] h-[38px] scale-50 bg-no-repeat bg-[url('https://m.media-amazon.com/images/G/31/gno/sprites/nav-sprite-global-2x-reorg-privacy._CB546381437_.png')] mt-3"
                        style={{ backgroundPosition: "-140px -612px" }}
                    ></div>
                    <div className="mt-2  flex flex-col ml-2 ">
                        <div className="text-[#CCCCCC] text-sm w-fit mb-1">
                            Delivering to Moradabad
                        </div>
                        {/* <div className="text-sm/3  ">244001 </div> */}


                        <div className="text-sm/3 font-semibold">Update location</div>
                    </div>
                </div>
            </div>

            <Searchbar setSearchTerm={setSearchTerm} />


            <ul className="flex gap-8 text-lg self-end pb-2 items-end">
                <li className="flex items-center gap-1 text-sm">
                    <img src="/indian_flag.png" alt="indian flag" className="h-4" />
                    <p>EN</p>
                    <img src="/dropdown.png" alt="dropdown" />
                </li>
                <li className="text-sm">

                    <p className="text-sm/3"
                        onClick={() => { navigate(`/login`) }}

                    > Hello , {username} </p>
                    <div>
                        <p
                            className="flex font-bold cursor-pointer"
                            onClick={() => setShowModal(true)}
                        >
                            Accounts & Lists
                            <span>
                                <img src="/dropdown.png" alt="dropdown" />
                            </span>
                        </p>

                        {showModal && <UserModal onClose={() => setShowModal(false)} />}
                    </div>
                </li>
                <li className="text-sm">
                    <p className="text-sm/4">Returns</p>
                    <p className="font-bold">& Orders</p>
                </li>


                <li className="text-sm flex items-center relative">
                    <Link to="/cart" className="flex items-center">
                        <ShoppingCart size={32} />
                        {/* <p className="font-bold ml-1 self-end">Cart</p>/ */}
                        {cart?.length > 0 && (
                            <span className="absolute -top-1 -right-1 bg-orange-300 text-black rounded-full px-2 text-xs font-bold">
                                {cart.length}
                            </span>
                        )}
                    </Link>
                </li>

            </ul>
        </div>
    );
};

export default Navbar;
