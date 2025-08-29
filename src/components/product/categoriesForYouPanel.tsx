"use client";

import React from "react";
import { createPortal } from "react-dom";
import Image from "@/components/ui/image";

interface CategoriesForYouPanelProps {
    categories: any[];
    onClose: () => void;
    onSelectCategory: (id: number) => void;
}

export default function CategoriesForYouPanel({
    categories,
    onClose,
    onSelectCategory,
}: CategoriesForYouPanelProps) {
    if (typeof document === "undefined") return null;

    const portalContent = (
        <div className="fixed inset-0 z-[9999] text-white bg-dark overflow-auto px-6 py-10">
            <h2 className="text-lg font-semibold mb-6">Toutes les catégories</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-8">
                {categories.map((cat) => (
                    <div
                        key={cat.id}
                        role="button"
                        tabIndex={0}
                        className="flex flex-col items-center text-center group hover:-translate-y-1 transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-pink-500"
                        onClick={() => onSelectCategory(cat.id)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                onSelectCategory(cat.id);
                            }
                        }}
                    >
                        <div className="relative">
                            <Image
                                src={cat.icon || "/placeholder.png"}
                                alt={cat.name}
                                width={80}
                                height={80}
                                className="rounded-full border p-2 bg-gray-50 object-contain"
                            />
                        </div>
                        <span className="mt-2 text-sm text-gray-700">{cat.name}</span>
                    </div>
                ))}
            </div>

            <div>
                <button
                    onClick={onClose}
                    className="
      fixed bottom-6 right-6
      w-14 h-14
      bg-pink-500 text-white
      rounded-full
      flex items-center justify-center
      shadow-lg
      hover:bg-pink-600
      focus:outline-none focus:ring-2 focus:ring-pink-600
      transition-transform duration-200
    "
                >
                    {/* SVG icon close */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-7 h-7"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

        </div>
    );

    return <>{createPortal(portalContent, document.body)}</>;
}   