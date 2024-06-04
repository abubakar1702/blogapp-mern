import { FaFacebook, FaInstagram, FaTwitter, FaReddit } from "react-icons/fa";
import { Link } from "react-router-dom";

import logo from "../assets/newlogo2.png"

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-8">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6">
                <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
                    <div className="flex items-center space-x-4">
                        <Link to="/">
                            <img className="h-8" src={logo} alt="Logo" />
                        </Link>
                        <span className="text-sm">© 2024 Tech Geek Inc.</span>
                    </div>
                    <nav>
                        <ul className="flex space-x-4">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/services">Services</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                        </ul>
                    </nav>
                </div>
                <div className="flex space-x-4">
                    <a href="https://www.facebook.com"><FaFacebook className="text-xl" /></a>
                    <a href="https://www.instagram.com"><FaInstagram className="text-xl" /></a>
                    <a href="https://www.twitter.com"><FaTwitter className="text-xl" /></a>
                    <a href="https://www.reddit.com"><FaReddit className="text-xl" /></a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
