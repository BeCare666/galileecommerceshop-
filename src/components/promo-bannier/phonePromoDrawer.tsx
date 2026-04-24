"use client";

import React, { useEffect, useState, useRef } from "react";
import {
    X,
    ArrowLeft,
    ArrowRight,
    ShoppingBag,
} from "lucide-react";
import { useRouter } from "next/navigation";

const FIVE_MINUTES = 5 * 60 * 1000;

const PRODUCTS = [
    {
        title:
            "Meilleure qualité, meilleur service pour vos projets agricoles et industriels",
        image:
            "https://res.cloudinary.com/dxug9vkcd/image/upload/v1776964059/uploads/heuqmpvbnkzrsj4krvrq.png",
        link:
            "/products/villa-prfabrique-de-luxe-conomique-maison-prfabrique-moderne-cl-en-main-avec-installation-rapide",
        badge: "En promo cette semaine",
        bg: "#fdf3ee",
    },
    {
        title: "Innovation et confort pour votre quotidien",
        image:
            "https://res.cloudinary.com/dxug9vkcd/image/upload/v1777017531/uploads/uheo5dmnfj2zpdc2wrwy.png",
        link:
            "/products/maisons-prfabriques-modernes-en-acier-lger-impermables-villa-bureau-magasin-toilettes-avec-panneaux-sandwich-alimentes-lnergie-solaire",
        badge: "En promo cette semaine",
        bg: "#f3f5fa",
    },
    {
        title: "Système de stockage énergétique haute capacité",
        image:
            "https://res.cloudinary.com/dxug9vkcd/image/upload/v1776968525/uploads/qrpt9b1sfycryp7dirrj.jpg",
        link:
            "/products/long-cycle-life-20ft-container-bess-2500kwh-lfp-energy-storage-container-for-utility-scale-peak-plant",
        badge: "En promo cette semaine",
        bg: "#eef2ff",
    },
    {
        title: "Maison modulaire industrielle haute performance",
        image:
            "https://res.cloudinary.com/dxug9vkcd/image/upload/v1777009070/uploads/jwubvp3mws2cncqtj9mm.jpg",
        link:
            "/products/villa-prfabrique-de-luxe-conomique-maison-prfabrique-moderne-cl-en-main-avec-installation-rapide",
        badge: "En promo cette semaine",
        bg: "#fdf3ee",
    },
];

export default function PhonePromoSSRDrawer() {
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const product = PRODUCTS[index];

    useEffect(() => {
        const showDrawer = () => setOpen(true);

        showDrawer();

        timerRef.current = setInterval(() => {
            setOpen(true);
        }, FIVE_MINUTES);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    return (
        <>
            {/* BACKDROP */}
            <div
                className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                onClick={() => setOpen(false)}
            />

            {/* DRAWER */}
            <div
                className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-500 ${open ? "translate-y-0" : "translate-y-full"
                    }`}
            >
                <div className="relative bg-white shadow-2xl border border-slate-100 px-4 md:px-5 pt-10 pb-6 md:pb-8 max-h-[92vh] overflow-y-auto">

                    {/* HANDLE */}
                    <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-slate-300" />

                    {/* CLOSE BUTTON (responsive + always visible) */}
                    <button
                        onClick={() => setOpen(false)}
                        className="absolute right-3 top-3 z-50 p-2 rounded-full bg-white shadow-md border border-slate-200 text-slate-600 active:scale-95 transition"
                    >
                        <X size={20} />
                    </button>

                    {/* HEADER */}
                    <div className="flex justify-center mb-4 hidden lg:flex">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-[6px] bg-pink-50 border border-pink-100 text-pink-600 text-xs md:text-sm font-medium text-center">
                            Découvrez nos meilleurs produits cette semaine
                        </div>
                    </div>

                    <h2 className="text-center text-lg md:text-2xl font-bold text-slate-900 mb-5 md:mb-6 hidden">
                        Découvrez nos meilleurs produits cette semaine
                    </h2>

                    {/* SWITCH NAV */}
                    <div className="flex items-center justify-center gap-3 md:gap-4 mb-5 md:mb-6">
                        <button
                            onClick={() =>
                                setIndex((prev) =>
                                    prev === 0 ? PRODUCTS.length - 1 : prev - 1
                                )
                            }
                            className="p-2 md:p-2.5 rounded-full border hover:bg-slate-50 transition"
                        >
                            <ArrowLeft size={18} />
                        </button>

                        <div className="text-xs md:text-sm font-medium text-slate-600">
                            {index + 1} / {PRODUCTS.length}
                        </div>

                        <button
                            onClick={() =>
                                setIndex((prev) =>
                                    prev === PRODUCTS.length - 1 ? 0 : prev + 1
                                )
                            }
                            className="p-2 md:p-2.5 rounded-full border hover:bg-slate-50 transition"
                        >
                            <ArrowRight size={18} />
                        </button>
                    </div>

                    {/* PRODUCT CARD */}
                    <div
                        className="rounded-3xl overflow-hidden shadow-lg border border-slate-100"
                        style={{ background: product.bg }}
                    >
                        <div className="flex flex-col md:flex-row items-center">

                            {/* IMAGE */}
                            <div className="flex-1 p-3 md:p-4 flex justify-center">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="md:max-h-[240px] object-contain w-full"
                                />
                            </div>

                            {/* CONTENT */}
                            <div className="flex-1 p-4 md:p-6">
                                <span className="inline-block bg-pink-500 text-white text-[11px] md:text-xs px-3 py-1 rounded-full mb-3 md:mb-4">
                                    {product.badge}
                                </span>

                                <h3 className="text-base md:text-xl font-bold text-slate-900 mb-4 md:mb-5 leading-snug">
                                    {product.title}
                                </h3>

                                <button
                                    onClick={() => {
                                        setOpen(false);
                                        router.push(product.link);
                                    }}
                                    className="inline-flex items-center gap-2 px-4 md:px-5 py-2.5 md:py-3 rounded-xl bg-slate-900 text-white hover:bg-black transition text-sm md:text-base"
                                >
                                    <ShoppingBag size={18} />
                                    Visiter ce produit
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* DOTS MOBILE */}
                    <div className="flex justify-center gap-2 mt-5 md:hidden">
                        {PRODUCTS.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setIndex(i)}
                                className={`h-2 rounded-full transition ${i === index
                                    ? "bg-pink-500 w-4"
                                    : "bg-slate-300 w-2"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}