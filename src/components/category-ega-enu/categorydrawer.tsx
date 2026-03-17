'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import ModalPortal from '@/components/modal/ModalPortal';
import { getAuthToken } from '../../data/client/token.utils';

const token = getAuthToken();

export default function CategoryMegaMenu() {
    const router = useRouter();
    const API_URL = process.env.NEXT_PUBLIC_REST_API_ENDPOINT;
    if (!API_URL)
        throw new Error("NEXT_PUBLIC_REST_API_ENDPOINT n'est pas défini !");
    const API_BASE = `${API_URL}`;

    const [openMenu, setOpenMenu] = useState(false);
    const [categories, setCategories] = useState<any[]>([]);
    const [subCategories, setSubCategories] = useState<any[] | null>(null);
    const [subSubCategories, setSubSubCategories] = useState<any[] | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [selectedSubCategories, setSelectedSubCategories] = useState<Set<number>>(new Set());
    const [selectedSubSubCategories, setSelectedSubSubCategories] = useState<Set<number>>(new Set());

    const [openCategories, setOpenCategories] = useState<Set<number>>(new Set());
    const [openSubCategories, setOpenSubCategories] = useState<Set<number>>(new Set());
    const [mobileSubCategories, setMobileSubCategories] = useState<Record<number, any[]>>({});
    const [mobileSubSubCategories, setMobileSubSubCategories] = useState<Record<number, any[]>>({});

    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        async function loadCategories() {
            try {
                const res = await fetch(`${API_BASE}/categories`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (!res.ok) throw new Error('Failed to load categories');
                const payload = await res.json();
                setCategories(payload?.data ?? []);
            } catch (err) {
                console.error(err);
            }
        }
        loadCategories();
    }, [API_BASE]);

    async function loadSubCategories(categoryId: number) {
        try {
            const res = await fetch(
                `${API_BASE}/souscategories/bycategory?categories_id=${categoryId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (!res.ok) throw new Error('Failed to load subcategories');
            const payload = await res.json();
            return payload?.data ?? [];
        } catch (err) {
            console.error(err);
            return [];
        }
    }

    async function loadSubSubCategories(subCategoryId: number) {
        try {
            const res = await fetch(
                `${API_BASE}/subcategories/bycategory?categories_id=${subCategoryId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (res.status === 404) return [];
            if (!res.ok) throw new Error(`Erreur API: ${res.status}`);
            const payload = await res.json();
            return payload?.data ?? [];
        } catch (err) {
            console.error(err);
            return [];
        }
    }

    function toggleSet(setState: React.Dispatch<React.SetStateAction<Set<number>>>, value: number) {
        setState(prev => {
            const next = new Set(prev);
            if (next.has(value)) next.delete(value);
            else next.add(value);
            return next;
        });
    }

    async function handleCategoryClick(catId: number) {
        setSelectedCategory(catId);
        setSelectedSubCategories(new Set());
        setSelectedSubSubCategories(new Set());
        setSubCategories(await loadSubCategories(catId));
    }

    async function handleSubCategoryClick(subId: number) {
        toggleSet(setSelectedSubCategories, subId);
        if (!selectedSubCategories.has(subId)) {
            const subSubs = await loadSubSubCategories(subId);
            setSubSubCategories(subSubs);
        } else {
            setSubSubCategories(null);
        }
    }

    function handleSubSubCategoryClick(subSubId: number) {
        toggleSet(setSelectedSubSubCategories, subSubId);
    }

    function applyFilter() {
        const query: string[] = [];
        if (selectedCategory) query.push(`categories_id=${selectedCategory}`);
        if (selectedSubCategories.size)
            query.push(`sous_categories_id=${Array.from(selectedSubCategories).join(',')}`);
        if (selectedSubSubCategories.size)
            query.push(`sub_categories_id=${Array.from(selectedSubSubCategories).join(',')}`);
        const queryString = query.join('&');
        router.push(`/products/forcategory?${queryString}`);
        setOpenMenu(false);
    }

    return (
        <div ref={containerRef} className="relative z-50">

            {/* Trigger */}
            <button
                onClick={() => setOpenMenu(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-md border border-neutral-700 bg-neutral-900 hover:bg-neutral-800 transition"
            >
                Toutes les catégories
            </button>

            {openMenu && (
                <ModalPortal>

                    {/* Overlay */}
                    <div
                        className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm"
                        onClick={() => setOpenMenu(false)}
                    />

                    {/* Drawer */}
                    <div className="fixed top-0 right-0 z-[9999] h-full w-[380px] bg-neutral-950 border-l border-neutral-800 shadow-2xl animate-slide-in-right flex flex-col">

                        {/* Header */}
                        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-800">
                            <h3 className="text-white text-lg font-semibold">
                                Catégories
                            </h3>

                            <button
                                onClick={() => setOpenMenu(false)}
                                className="text-neutral-400 hover:text-white text-xl"
                            >
                                ×
                            </button>
                        </div>

                        {/* LISTE */}
                        <div className="flex-1 overflow-y-auto p-4">

                            {categories.map((cat) => {
                                const isCatOpen = openCategories.has(cat.id);

                                return (
                                    <div key={cat.id} className="mb-2">

                                        {/* CATEGORY */}
                                        <div
                                            className={`flex items-center justify-between px-3 py-3 rounded cursor-pointer hover:bg-neutral-800 ${selectedCategory === cat.id ? 'bg-neutral-800' : ''
                                                }`}
                                            onClick={async () => {
                                                const newSet = new Set(openCategories);

                                                if (newSet.has(cat.id)) {
                                                    newSet.delete(cat.id);
                                                } else {
                                                    newSet.add(cat.id);

                                                    setSelectedCategory(cat.id);
                                                    setSelectedSubCategories(new Set());
                                                    setSelectedSubSubCategories(new Set());

                                                    if (!mobileSubCategories[cat.id]) {
                                                        const subs = await loadSubCategories(cat.id);

                                                        setMobileSubCategories((prev) => ({
                                                            ...prev,
                                                            [cat.id]: subs,
                                                        }));
                                                    }
                                                }

                                                setOpenCategories(newSet);
                                            }}
                                        >
                                            <div className="flex items-center gap-2">
                                                <img
                                                    src={cat.icon || '/placeholder-icon.png'}
                                                    className="w-5 h-5"
                                                />
                                                <span className="text-white">{cat.name}</span>
                                            </div>

                                            <span className="text-neutral-400">
                                                {isCatOpen ? '▴' : '▾'}
                                            </span>
                                        </div>


                                        {/* SUBCATEGORIES */}
                                        {isCatOpen &&
                                            mobileSubCategories[cat.id]?.map((sub) => {
                                                const isSubOpen = openSubCategories.has(sub.id);

                                                return (
                                                    <div key={sub.id} className="ml-6">

                                                        <div
                                                            className="flex items-center justify-between px-3 py-2 rounded hover:bg-neutral-800 cursor-pointer"
                                                            onClick={async () => {

                                                                toggleSet(setSelectedSubCategories, sub.id);

                                                                const newSet = new Set(openSubCategories);

                                                                if (newSet.has(sub.id)) {
                                                                    newSet.delete(sub.id);
                                                                } else {
                                                                    newSet.add(sub.id);

                                                                    if (!mobileSubSubCategories[sub.id]) {
                                                                        const subSubs = await loadSubSubCategories(sub.id);

                                                                        setMobileSubSubCategories((prev) => ({
                                                                            ...prev,
                                                                            [sub.id]: subSubs,
                                                                        }));
                                                                    }
                                                                }

                                                                setOpenSubCategories(newSet);
                                                            }}
                                                        >

                                                            <span className="text-white">{sub.name}</span>

                                                            <div className="flex items-center gap-2">

                                                                {selectedSubCategories.has(sub.id) && (
                                                                    <span className="w-5 h-5 flex items-center justify-center bg-pink-500 text-white rounded-full text-xs">
                                                                        ✓
                                                                    </span>
                                                                )}

                                                                <span className="text-neutral-400">
                                                                    {isSubOpen ? '▴' : '▾'}
                                                                </span>

                                                            </div>

                                                        </div>


                                                        {/* SUBSUB */}
                                                        {isSubOpen &&
                                                            mobileSubSubCategories[sub.id]?.map((subSub) => (
                                                                <div
                                                                    key={subSub.id}
                                                                    className="ml-6 flex items-center justify-between px-3 py-2 rounded hover:bg-neutral-800 cursor-pointer"
                                                                    onClick={() =>
                                                                        handleSubSubCategoryClick(subSub.id)
                                                                    }
                                                                >

                                                                    <span className="text-white">
                                                                        {subSub.name}
                                                                    </span>

                                                                    {selectedSubSubCategories.has(subSub.id) && (
                                                                        <span className="w-5 h-5 flex items-center justify-center bg-pink-500 text-white rounded-full text-xs">
                                                                            ✓
                                                                        </span>
                                                                    )}

                                                                </div>
                                                            ))}

                                                    </div>
                                                );
                                            })}

                                    </div>
                                );
                            })}

                        </div>

                        {/* APPLY */}
                        <div className="p-4 border-t border-neutral-800">
                            <button
                                className="w-full h-[48px] bg-pink-500 text-white rounded-md hover:scale-[1.02] transition"
                                onClick={applyFilter}
                            >
                                Appliquer
                            </button>
                        </div>

                    </div>

                </ModalPortal>
            )}

            <style jsx global>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.25s ease-out forwards;
        }
      `}</style>

        </div>
    );
}