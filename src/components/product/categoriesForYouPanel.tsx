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

            <div className="mt-10 text-center">
                <button
                    onClick={onClose}
                    className="inline-block px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-600"
                >
                    Fermer
                </button>
            </div>
        </div>
    );

    return <>{createPortal(portalContent, document.body)}</>;
}   