'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Filter, Check, X, ChevronDown, ChevronUp, Star } from 'lucide-react';
import Seo from '@/layouts/_seo';
import Layout from '@/layouts/_layout';
import Card from '@/components/product/card';
import routes from '@/config/routes';
import { getAuthToken } from '../data/client/token.utils';

const LIMIT = 20;

type Product = {
    id: number;
    slug: string;
    name: string;
    description?: string;
    price: number;
    sale_price?: number;
    categories?: string[];
    image?: { url: string };
    stock?: number;
    rating?: number;
    review_count?: number;
    shop?: { id: number; slug: string; name: string };
};

export default function ProductsPage() {
    const router = useRouter();
    const token = getAuthToken();
    const API_BASE = process.env.NEXT_PUBLIC_REST_API_ENDPOINT; // Assurez-vous que cette variable d'environnement est définie

    const [products, setProducts] = useState<Product[]>([]);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [categories, setCategories] = useState<any[]>([]);
    const [subCategories, setSubCategories] = useState<Record<number, any[]>>({});
    const [subSubCategories, setSubSubCategories] = useState<Record<number, any[]>>({});

    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [selectedSubCategories, setSelectedSubCategories] = useState<Set<number>>(new Set());
    const [selectedSubSubCategories, setSelectedSubSubCategories] = useState<Set<number>>(new Set());

    const sentinelRef = useRef<HTMLDivElement | null>(null);
    const isFetchingRef = useRef(false);

    // --- Load Categories ---
    useEffect(() => {
        async function loadCategories() {
            try {
                const res = await fetch(`${API_BASE}/categories`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await res.json();
                setCategories(data?.data ?? []);
            } catch (err) {
                console.error(err);
            }
        }
        loadCategories();
    }, [API_BASE, token]);

    // --- Load SubCategories ---
    const loadSubCategories = async (catId: number) => {
        if (subCategories[catId]) return;
        try {
            const res = await fetch(`${API_BASE}/souscategories/bycategory?categories_id=${catId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            setSubCategories((prev) => ({ ...prev, [catId]: data?.data ?? [] }));
        } catch (err) {
            console.error(err);
        }
    };

    const loadSubSubCategories = async (subId: number) => {
        if (subSubCategories[subId]) return;
        try {
            const res = await fetch(`${API_BASE}/subcategories/bycategory?categories_id=${subId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            setSubSubCategories((prev) => ({ ...prev, [subId]: data?.data ?? [] }));
        } catch (err) {
            console.error(err);
        }
    };

    const toggleSet = (setState: React.Dispatch<React.SetStateAction<Set<number>>>, value: number) => {
        setState((prev) => {
            const next = new Set(prev);
            if (next.has(value)) next.delete(value);
            else next.add(value);
            return next;
        });
    };

    // --- Fetch Products ---
    const fetchProducts = useCallback(async () => {
        if (isFetchingRef.current || !hasMore) return;
        setLoading(true);
        isFetchingRef.current = true;

        try {
            const params: any = {
                limit: LIMIT,
                offset,
                categories_id: selectedCategory ?? undefined,
                sous_categories_id: Array.from(selectedSubCategories).join(',') || undefined,
                sub_categories_id: Array.from(selectedSubSubCategories).join(',') || undefined,
            };

            const { data } = await axios.get(`${API_BASE}/products/corridor`, {
                params,
                headers: { Authorization: `Bearer ${token}` },
            });

            const fetchedProducts = data.data ?? [];
            setProducts((prev) => (offset === 0 ? fetchedProducts : [...prev, ...fetchedProducts]));
            setHasMore(fetchedProducts.length === LIMIT);
            setOffset((prev) => prev + fetchedProducts.length);
        } catch (err) {
            console.error(err);
            setError('Erreur lors du chargement des produits');
        } finally {
            setLoading(false);
            isFetchingRef.current = false;
        }
    }, [API_BASE, token, offset, hasMore, selectedCategory, selectedSubCategories, selectedSubSubCategories]);

    // --- Re-fetch on filter change ---
    useEffect(() => {
        setProducts([]);
        setOffset(0);
        setHasMore(true);
        fetchProducts();
    }, [fetchProducts]);

    // --- Infinite Scroll ---
    useEffect(() => {
        if (!sentinelRef.current || loading || !hasMore) return;
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) fetchProducts();
            },
            { rootMargin: '300px' }
        );
        observer.observe(sentinelRef.current);
        return () => {
            if (sentinelRef.current) observer.unobserve(sentinelRef.current);
        };
    }, [loading, hasMore, fetchProducts]);

    return (
        <>
            <Seo title="Produits" description="Explorez nos produits par catégorie" url={routes.productscategory} />

            <div className="flex flex-col md:flex-row gap-6">
                {/* Sidebar Filters */}
                <aside className="w-full md:w-64 bg-neutral-900 p-4 rounded-lg text-white shadow-lg sticky top-4 h-max">
                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Filter className="w-5 h-5" /> Filtres
                    </h2>

                    {/* Categories */}
                    <ul className="space-y-2">
                        {categories.map((cat) => (
                            <li key={cat.id}>
                                <div
                                    className="flex justify-between items-center px-3 py-2 rounded cursor-pointer hover:bg-neutral-800 transition"
                                    onClick={() => {
                                        setSelectedCategory(cat.id);
                                        setSelectedSubCategories(new Set());
                                        setSelectedSubSubCategories(new Set());
                                        loadSubCategories(cat.id);
                                    }}
                                >
                                    <span>{cat.name}</span>
                                    {selectedCategory === cat.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                </div>

                                {/* Subcategories */}
                                {selectedCategory === cat.id && subCategories[cat.id]?.length > 0 && (
                                    <ul className="ml-4 mt-1 space-y-1">
                                        {subCategories[cat.id].map((sub) => (
                                            <li key={sub.id}>
                                                <div
                                                    className="flex justify-between items-center px-2 py-1 rounded cursor-pointer hover:bg-neutral-800 transition"
                                                    onClick={() => {
                                                        toggleSet(setSelectedSubCategories, sub.id);
                                                        loadSubSubCategories(sub.id);
                                                    }}
                                                >
                                                    <span>{sub.name}</span>
                                                    {selectedSubCategories.has(sub.id) && <Check className="w-4 h-4 text-pink-500" />}
                                                </div>

                                                {/* Sub-Subcategories */}
                                                {selectedSubCategories.has(sub.id) && subSubCategories[sub.id]?.length > 0 && (
                                                    <ul className="ml-4 mt-1 space-y-1">
                                                        {subSubCategories[sub.id].map((subSub) => (
                                                            <li key={subSub.id}>
                                                                <div
                                                                    className="flex justify-between items-center px-2 py-1 rounded cursor-pointer hover:bg-neutral-800 transition"
                                                                    onClick={() => toggleSet(setSelectedSubSubCategories, subSub.id)}
                                                                >
                                                                    <span>{subSub.name}</span>
                                                                    {selectedSubSubCategories.has(subSub.id) && <Check className="w-4 h-4 text-pink-500" />}
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </aside>

                {/* Products Grid */}
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((p) => (
                        <Card key={p.id} product={p} />
                    ))}

                    {loading && Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="h-72 bg-neutral-800 animate-pulse rounded-lg" />
                    ))}
                </div>
            </div>

            <div ref={sentinelRef} />
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </>
    );
}

ProductsPage.authorization = true;
ProductsPage.getLayout = (page: any) => <Layout>{page}</Layout>