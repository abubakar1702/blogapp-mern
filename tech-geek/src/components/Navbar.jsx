import { useState, useContext } from "react";
import logo from "../assets/newlogo2.png";
import { FaBars, FaFacebook, FaReddit, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { AuthContext } from "../store/auth.jsx";
import { Link } from "react-router-dom";
import { LuPenLine } from "react-icons/lu";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
    const [toggle, setToggle] = useState(false);
    const [open, setOpen] = useState(false);
    const { logout, user, setFilter } = useContext(AuthContext);
    const navigate = useNavigate()
    const handleToggle = () => {
        setToggle(!toggle);
    };

    const [isHovered, setIsHovered] = useState(false);

    const handleHover = () => {
        setIsHovered(!isHovered);
    };

    const toHome = ()=>{
        navigate("/")
    }

    return (
        <nav>
            <div className="flex flex-row justify-between items-center px-6">
                <div className="md:hidden">
                    <FaBars onClick={handleToggle} className="text-xl cursor-pointer" />
                </div>
                <div>
                    <img className="h-14 md:h-20" src={logo} alt="Logo" />
                </div>
                <div className="hidden md:flex space-x-6">
                    <FaFacebook className="text-3xl text-gray-900 cursor-pointer" />
                    <FaInstagram className="text-3xl text-gray-900 cursor-pointer" />
                    <FaXTwitter className="text-3xl text-gray-900 cursor-pointer" />
                    <FaReddit className="text-3xl text-gray-900 cursor-pointer" />
                </div>
                {/* <div>
                    <FaSearch />
                </div> */}

                {user ? (
                    <div className="relative flex justify-center items-center space-x-4">
                        <div>
                            <Link to="/write"><LuPenLine className="text-4xl" /></Link>
                        </div>
                        <div onClick={() => setOpen(!open)} className={"border-b-4 border-transparent py-3 cursor-pointer" + (open ? ' border-indigo-700' : '')}>
                            <div className="flex justify-center items-center space-x-3">
                                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-900">
                                    <img src="https://images.unsplash.com/photo-1610397095767-84a5b4736cbd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" alt="" className="w-full h-full object-cover" />
                                </div>

                            </div>
                        </div>
                        {open && (
                            <div className="absolute top-14 right-0 mt-1 w-48 bg-white dark:bg-gray-800 border dark:border-transparent rounded-lg shadow-lg z-10">
                                <ul className="py-1">
                                    <li>
                                        <a href="#" className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">{user.name}</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">View Profile</a>
                                    </li>
                                    <hr className="my-1 dark:border-gray-700" />
                                    <li onClick={toHome}>
                                        <a href="#" className="block px-4 py-2 text-red-600 hover:bg-red-100" onClick={logout}>Logout</a>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                ) : <div><Link to="/login"><a
                    className={`relative inline-block px-4 py-2 font-medium group ${isHovered ? 'hovered' : ''}`}
                    onMouseEnter={handleHover}
                    onMouseLeave={handleHover}
                >
                    <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                    <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                    <span className="relative text-black group-hover:text-white">Log in</span>
                </a></Link></div>}
            </div>

            {toggle && (
                <div className="absolute md:hidden top-16 w-full bg-gray-900 text-white flex flex-col justify-center transition-all items-center p-2 text-xl z-10">
                    <ul className="text-center space-y-4">
                        <Link to="/"><li className="cursor-pointer hover:text-gray-300" onClick={() => setFilter('')}>Home</li></Link>
                        <li className="cursor-pointer hover:text-gray-300" onClick={() => setFilter('smartphone')}>Smartphone</li>
                        <li className="cursor-pointer hover:text-gray-300" onClick={() => setFilter('computer')}>Computer</li>
                        <li className="cursor-pointer hover:text-gray-300" onClick={() => setFilter('hardware')}>Hardware</li>
                        <li className="cursor-pointer hover:text-gray-300" onClick={() => setFilter('ai')}>AI</li>
                        <li className="cursor-pointer hover:text-gray-300" onClick={() => setFilter('gaming')}>Gaming</li>
                        <li className="cursor-pointer hover:text-gray-300" onClick={() => setFilter('others')}>Others</li>
                    </ul>
                </div>
            )}
            <div className="bg-gray-900 hidden md:block">
                <ul className="flex text-white justify-center space-x-6 items-center py-2">
                    <Link to="/"><li className="text-xl cursor-pointer" onClick={() => setFilter('')}>Home</li></Link>
                    <li className="text-xl cursor-pointer" onClick={() => setFilter('smartphone')}>Smartphone</li>
                    <li className="text-xl cursor-pointer" onClick={() => setFilter('computer')}>Computer</li>
                    <li className="text-xl cursor-pointer" onClick={() => setFilter('hardware')}>Hardware</li>
                    <li className="text-xl cursor-pointer" onClick={() => setFilter('ai')}>AI</li>
                    <li className="text-xl cursor-pointer" onClick={() => setFilter('gaming')}>Gaming</li>
                    <li className="text-xl cursor-pointer" onClick={() => setFilter('others')}>Others</li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
