import React, { useState } from "react";

const products = [
    {
        id: 1,
        name: "Leberkas sausage pance",
        image: "https://opencart4.magentech.com/themes/so_emarket/layout30/image/cache/catalog/demo/product/smartphone-25/06-1000x1000.jpg",
        oldPrice: 60,
        price: 50,
        discount: "-17%",
        rating: 0,
    },
    {
        id: 2,
        name: "Matte Primer Taylatte",
        image: "https://xd21.co.za/cdn/shop/files/IMG-7083.png?v=1728911540&width=600",
        oldPrice: null,
        price: 88,
        discount: null,
        rating: 5,
    },
    {
        id: 3,
        name: "Jerky porks bellygroud",
        image: "https://assets.tops.co.th/CHAINARONG-ChainarongPorkJerky200BhtC-0000048492591-1",
        oldPrice: 107,
        price: 80,
        discount: "-25%",
        rating: 1,
    },
    {
        id: 4,
        name: "shirt in loincloth",
        image: "https://congo-shop.com/wp-content/uploads/2023/06/Design-sans-titre-2023-06-14T133153.758.png",
        oldPrice: null,
        price: 114,
        discount: null,
        rating: 5,
    },
];

function StarRating({ rating }) {
    return (
        <div className="flex items-center mb-1">
            {[1, 2, 3, 4, 5].map((i) => (
                <svg
                    key={i}
                    className={`w-4 h-4 ${i <= rating ? "text-yellow-400" : "text-gray-300"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <polygon points="10,1 12.59,7.36 19.51,7.64 14,12.14 15.82,19.02 10,15.27 4.18,19.02 6,12.14 0.49,7.64 7.41,7.36" />
                </svg>
            ))}
        </div>
    );
}

export default function BestSellerGrid() {
    const [hovered, setHovered] = useState(null);

    return (
        <div className="w-full flex gap-4 py-6 px-2 overflow-x-auto">
            {products.map((product) => (
                <div
                    key={product.id}
                    className={`relative bg-white border border-gray-200 rounded-xl shadow-sm p-4 w-[250px] min-w-[250px] transition-all duration-300 group hover:shadow-lg ${hovered === product.id ? "border-pink-400" : ""}`}
                    onMouseEnter={() => setHovered(product.id)}
                    onMouseLeave={() => setHovered(null)}
                >
                    {/* Discount badge */}
                    {product.discount && (
                        <span className="absolute top-3 left-3 bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow">
                            {product.discount}
                        </span>
                    )}
                    {/* Wishlist button */}
                    <button className="absolute top-3 right-3 bg-white border border-gray-200 rounded-full  w-8 h-8 flex items-center justify-center shadow hover:bg-pink-50 transition">
                        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" className="text-gray-400 hover:text-pink-500 transition">
                            <path d="M12 21s-6.5-4.35-9-7.5C1.5 10.5 3 7 6.5 7c1.74 0 3.41 1.01 4.13 2.44h.74C14.09 8.01 15.76 7 17.5 7 21 7 22.5 10.5 21 13.5c-2.5 3.15-9 7.5-9 7.5z" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                    </button>
                    {/* Product image */}
                    <div className="flex justify-center items-center h-40 mb-2 relative">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="object-contain h-full transition-transform duration-300 group-hover:scale-105"
                        />
                        {/* Hover action buttons */}
                        <div className={`absolute top-10 right-0.5 flex flex-col gap-2 transition-all duration-300 ${hovered === product.id ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"} z-20`}>
                            {/** <button className="bg-white border border-gray-200 rounded-full w-8 h-8 flex items-center justify-center shadow hover:bg-pink-50 transition">
                                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" className="text-gray-400 hover:text-pink-500 transition">
                                    <path d="M12 21s-6.5-4.35-9-7.5C1.5 10.5 3 7 6.5 7c1.74 0 3.41 1.01 4.13 2.44h.74C14.09 8.01 15.76 7 17.5 7 21 7 22.5 10.5 21 13.5c-2.5 3.15-9 7.5-9 7.5z" stroke="currentColor" strokeWidth="1.5" />
                                </svg>
                            </button>**/}
                            <button className="bg-white border border-gray-200 rounded-full w-8 h-8 flex items-center justify-center shadow hover:bg-pink-50 transition">
                                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" className="text-gray-400 hover:text-pink-500 transition">
                                    <path d="M12 4.5v15m7.5-7.5h-15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                            </button>
                            <button className="bg-white border border-gray-200 rounded-full w-8 h-8 flex items-center justify-center shadow hover:bg-pink-50 transition">
                                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" className="text-gray-400 hover:text-pink-500 transition">
                                    <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
                                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    {/* Product name */}
                    <div className="font-medium text-base text-gray-900 mb-1">{product.name}</div>
                    {/* Rating */}
                    <StarRating rating={product.rating} />
                    {/* Price */}
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-pink-600 font-bold text-base">${product.price.toFixed(2)}</span>
                        {product.oldPrice && (
                            <span className="text-gray-400 line-through text-sm">${product.oldPrice.toFixed(2)}</span>
                        )}
                    </div>
                    {/* Add to cart */}
                    <button className="absolute bottom-4 right-4 bg-white border border-gray-200 rounded-md w-10 h-10 flex items-center justify-center shadow hover:bg-pink-50 transition group-hover:scale-110">
                        <svg width="22" height="22" fill="none" viewBox="0 0 24 24" className="text-pink-500">
                            <path d="M6 6h15l-1.5 9h-13z" stroke="currentColor" strokeWidth="1.5" />
                            <circle cx="9" cy="20" r="1" fill="currentColor" />
                            <circle cx="18" cy="20" r="1" fill="currentColor" />
                        </svg>
                    </button>
                </div>
            ))}
        </div>
    );
}