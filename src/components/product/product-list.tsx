import type { Product } from '@/types';
import { useState, useEffect } from 'react';
import Card from '@/components/product/card';
import { useRouter } from 'next/router';
import 'react-phone-input-2/lib/style.css';
import ReactPhone from 'react-phone-input-2';

export default function ProductList() {
    const router = useRouter();
    const query = router.query;

    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<string[]>([]);

    // Filtres
    const [search, setSearch] = useState(query.search?.toString() || '');
    const [category, setCategory] = useState(query.category?.toString() || '');
    const [sort, setSort] = useState(query.sort?.toString() || 'asc');
    const [priceMin, setPriceMin] = useState(query.priceMin?.toString() || '');
    const [priceMax, setPriceMax] = useState(query.priceMax?.toString() || '');
    const [page, setPage] = useState(Number(query.page) || 1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchCategories = async () => {
        const res = await fetch('http://127.0.0.1:5000/api/categories');
        const data = await res.json();
        // On vérifie si data est un tableau
        setCategories(Array.isArray(data) ? data : []);
    };

    const fetchProducts = async () => {
        const params = new URLSearchParams();

        if (search) params.append('search', search);
        if (category) params.append('category', category);
        if (sort) params.append('sort', sort);
        if (priceMin) params.append('priceMin', priceMin);
        if (priceMax) params.append('priceMax', priceMax);
        params.append('page', page.toString());
        params.append('limit', '6');

        // Met à jour l'URL du navigateur sans recharger la page 
        router.replace({
            pathname: '/products',
            query: Object.fromEntries(params),
        }, undefined, { shallow: true });

        const res = await fetch(`http://127.0.0.1:5000/api/products?${params}`);
        const data = await res.json();
        setProducts(data.data || []);
        setTotalPages(data.totalPages || 1);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        fetchProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, category, sort, priceMin, priceMax, page]);
    return (
        <div className="p-6 max-w-6xl mx-auto">
            {/* Filtres */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
                <input
                    type="text"
                    value={search}
                    placeholder="🔍 Rechercher..."
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1);
                    }}
                    className="border px-4 py-2 rounded"
                />

                <select
                    value={category}
                    onChange={(e) => {
                        setCategory(e.target.value);
                        setPage(1);
                    }}
                    className="border px-4 py-2 rounded"
                >
                    <option value="">Toutes les catégories</option>
                    {categories.map((cat, i) => (
                        <option key={i} value={cat}>{cat}</option>
                    ))}
                </select>

                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="border px-4 py-2 rounded"
                >
                    <option value="asc">⬆ Prix croissant</option>
                    <option value="desc">⬇ Prix décroissant</option>
                </select>

                <input
                    type="number"
                    placeholder="Prix min"
                    value={priceMin}
                    onChange={(e) => {
                        setPriceMin(e.target.value);
                        setPage(1);
                    }}
                    className="border px-4 py-2 rounded"
                />
                <input
                    type="number"
                    placeholder="Prix max"
                    value={priceMax}
                    onChange={(e) => {
                        setPriceMax(e.target.value);
                        setPage(1);
                    }}
                    className="border px-4 py-2 rounded"
                />
                <ReactPhone
                    country="us"
                    value={query.phone?.toString() || ''}
                    onChange={(value) => {
                        router.push({
                            pathname: '/products',
                            query: { ...query, country: value },
                        }, undefined, { shallow: true });
                    }}
                    enableSearch
                    inputClass="border px-4 py-2 rounded w-full"
                    buttonClass="!bg-white !border-r"

                />;
            </div>

            {/* Produits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <Card key={product.id} product={product} />
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-4 mt-8">
                <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 border rounded"
                >
                    ⬅ Précédent
                </button>
                <span className="self-center">Page {page} / {totalPages}</span>
                <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="px-4 py-2 border rounded"
                >
                    Suivant ➡
                </button>
            </div>
        </div>
    );
}
