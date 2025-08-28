// components/Navbar.js
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
    const [openMenu, setOpenMenu] = useState(null); // plus de type

    const toggleMenu = (menu) => {
        setOpenMenu(openMenu === menu ? null : menu);
    };

    return (
        <nav className="w-full bg-white  lg:block">
            <div className="flex items-center justify-center gap-8 py-4 relative">

                {/* ACCUEIL */}
                <div className="flex items-center gap-1 cursor-pointer text-sm font-semibold text-gray-700 hover:text-blue-600">
                    <Link href="/">Home</Link>
                </div>
                {/* ABOUTUS */}
                <div className="flex items-center gap-1 cursor-pointer text-sm font-semibold text-gray-700 hover:text-blue-600">
                    <Link href="/about-us">About us</Link>
                </div>
                {/* SERVICES */}
                <div className="flex items-center gap-1 cursor-pointer text-sm font-semibold text-gray-700 hover:text-blue-600">
                    <Link href="/about-us">Services</Link>
                </div>
                {/* BOUTIQUE */}
                <div className="relative">
                    <div
                        className="flex items-center gap-1 cursor-pointer text-sm font-semibold text-gray-700 hover:text-blue-600"
                        onClick={() => toggleMenu("shop")}
                    >
                        <Link href="/products/forcategory">Shop</Link>
                    </div>


                </div>

                {/* BLOG
                <div className="cursor-pointer text-sm font-semibold text-gray-700 hover:text-blue-600">
                    <Link href="/blog">Blog</Link>
                </div>
                 */}
                {/* CONTACT */}
                <div className="cursor-pointer text-sm font-semibold text-gray-700 hover:text-blue-600">
                    <Link href="/contact-us">Contact us</Link>
                </div>

                {/* CONDITIONS & POLITIQUES */}
                <div className="relative">
                    <div
                        className="flex items-center gap-1 cursor-pointer text-sm font-semibold text-gray-700 hover:text-blue-600"
                        onClick={() => toggleMenu("legal")}
                    >
                        Help
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-3 h-3 text-gray-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>

                    {openMenu === "legal" && (
                        <div className="absolute top-full left-0 bg-white shadow-lg rounded-md py-4 px-6 mt-2 w-56 z-50">
                            <Link href="/help" className="block py-2 text-gray-700 hover:text-blue-600">
                                help
                            </Link>
                            <Link href="/terms" className="block py-2 text-gray-700 hover:text-blue-600">
                                Termes & Conditions
                            </Link>
                            <Link href="/privacy" className="block py-2 text-gray-700 hover:text-blue-600">
                                Privacy Policy
                            </Link>
                            <Link href="/licensing" className="block py-2 text-gray-700 hover:text-blue-600">
                                Licensing agreement
                            </Link>

                        </div>
                    )}
                </div>

            </div>
        </nav>
    );
}
