"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
    Search,
    Star,
    ChevronDown,
    SlidersHorizontal,
    X,
    Globe,
    Layers,
    Package,
    Map,
    DollarSign,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { getAuthToken } from '../data/client/token.utils';

// ⚡ TYPES
interface Product {
    id: number;
    name: string;
    price: number;
    rating: number;
    image: string | null;
    slug: string;
    shop: { id: number; slug: string; name: string };
}

// ⚡ RATING COMPONENT
const Rating = ({ value }: { value: number }) => (
    <div className="flex gap-1 mt-1">
        {Array.from({ length: 5 }).map((_, i) => (
            <Star
                key={i}
                size={16}
                className={i < value ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
            />
        ))}
    </div>
);

// ⚡ CHECKBOX COMPONENT
function Checkbox({
    label,
    checked,
    onChange,
}: {
    label: string;
    checked?: boolean;
    onChange?: () => void;
}) {
    return (
        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input
                type="checkbox"
                className="w-4 h-4 border-gray-300 rounded"
                checked={checked}
                onChange={onChange}
            />
            {label}
        </label>
    );
}

// ⚡ FILTER ACCORDION
function FilterAccordion({
    icon: Icon,
    title,
    children,
}: {
    icon: any;
    title: string;
    children: React.ReactNode;
}) {
    const [open, setOpen] = useState(true);

    return (
        <div className="border-b pb-3">
            <button
                onClick={() => setOpen(!open)}
                className="flex w-full items-center justify-between py-2 text-left"
            >
                <div className="flex items-center gap-2 font-medium text-gray-700">
                    <Icon size={18} />
                    {title}
                </div>
                <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={18} />
                </motion.div>
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden space-y-2 pl-1"
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// ⚡ FILTER CONTENT COMPONENT
function FilterContent({
    countries,
    categories,
    subCategories,
    subSubCategories,
    corridors,
    selectedCountry,
    setSelectedCountry,
    selectedCategory,
    setSelectedCategory,
    selectedSubCategory,
    setSelectedSubCategory,
    selectedSubSubCategory,
    setSelectedSubSubCategory,
}: any) {
    return (
        <div className="space-y-4">
            <FilterAccordion icon={Globe} title="Pays">
                {countries.map((c: any) => (
                    <Checkbox
                        key={c.id}
                        label={c.name}
                        checked={selectedCountry?.id === c.id}
                        onChange={() => setSelectedCountry(c)}
                    />
                ))}
            </FilterAccordion>

            <FilterAccordion icon={Layers} title="Catégorie">
                {categories.map((cat: any) => (
                    <Checkbox
                        key={cat.id}
                        label={cat.name}
                        checked={selectedCategory?.id === cat.id}
                        onChange={() => setSelectedCategory(cat)}
                    />
                ))}
            </FilterAccordion>

            <FilterAccordion icon={Package} title="Sous-Catégorie">
                {subCategories.map((sc: any) => (
                    <Checkbox
                        key={sc.id}
                        label={sc.name}
                        checked={selectedSubCategory?.id === sc.id}
                        onChange={() => setSelectedSubCategory(sc)}
                    />
                ))}
            </FilterAccordion>

            <FilterAccordion icon={Package} title="Sub-Sous-Catégorie">
                {subSubCategories.map((ssc: any) => (
                    <Checkbox
                        key={ssc.id}
                        label={ssc.name}
                        checked={selectedSubSubCategory?.id === ssc.id}
                        onChange={() => setSelectedSubSubCategory(ssc)}
                    />
                ))}
            </FilterAccordion>
        </div>
    );
}

export default function ProductPage() {
    const router = useRouter();
    const API_URL = process.env.NEXT_PUBLIC_REST_API_ENDPOINT;
    if (!API_URL)
        throw new Error("NEXT_PUBLIC_REST_API_ENDPOINT n'est pas défini !");
    const API_BASE = `${API_URL}`;
    const token = getAuthToken();
    // États
    const [products, setProducts] = useState<Product[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);

    const [countries, setCountries] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [subCategories, setSubCategories] = useState<any[]>([]);
    const [subSubCategories, setSubSubCategories] = useState<any[]>([]);
    const [corridors, setCorridors] = useState<any[]>([]);

    const [selectedCountry, setSelectedCountry] = useState<any>(null);
    const [selectedCategory, setSelectedCategory] = useState<any>(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState<any>(null);
    const [selectedSubSubCategory, setSelectedSubSubCategory] = useState<any>(null);

    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("created_at");
    const [sortOrder, setSortOrder] = useState("desc");
    const [page, setPage] = useState(1);

    const [mobileFilters, setMobileFilters] = useState(false);

    // 🔹 FETCH PRODUCTS
    async function fetchProducts() {
        const API_URL = process.env.NEXT_PUBLIC_REST_API_ENDPOINT;
        if (!API_URL)
            throw new Error("NEXT_PUBLIC_REST_API_ENDPOINT n'est pas défini !");
        const API_BASE = `${API_URL}`;
        const token = getAuthToken();
        if (!token) return;
        setLoading(true);
        try {
            const params: any = {
                search,
                corridor_id: selectedSubSubCategory?.corridor_id || undefined,
                countries_id: selectedCountry?.id || undefined,
                categories_id: selectedCategory?.id || undefined,
                sous_categories_id: selectedSubCategory?.id || undefined,
                sub_categories_id: selectedSubSubCategory?.id || undefined,
                limit: 20,
                offset: (page - 1) * 20,
                orderBy: sortBy,
                sortedBy: sortOrder,
            };

            const query = new URLSearchParams(params).toString();
            const res = await fetch(`${API_BASE}/products/corridor?${query}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error("Erreur API produits");
            const data = await res.json();
            setProducts(data.data);
            setTotal(data.total);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    // 🔹 FETCH CATEGORIES, SUB-CATEGORIES, SUB-SUB
    useEffect(() => {
        async function loadCategories() {
            const API_URL = process.env.NEXT_PUBLIC_REST_API_ENDPOINT;
            if (!API_URL)
                throw new Error("NEXT_PUBLIC_REST_API_ENDPOINT n'est pas défini !");
            const API_BASE = `${API_URL}`;
            const token = getAuthToken();
            try {
                const res = await fetch(`${API_BASE}/categories`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const payload = await res.json();
                setCategories(payload?.data ?? []);
            } catch (err) {
                console.error(err);
            }
        }
        loadCategories();
    }, [API_BASE, token]);

    useEffect(() => {
        if (selectedCategory) {
            const API_URL = process.env.NEXT_PUBLIC_REST_API_ENDPOINT;
            if (!API_URL)
                throw new Error("NEXT_PUBLIC_REST_API_ENDPOINT n'est pas défini !");
            const API_BASE = `${API_URL}`;
            const token = getAuthToken();
            fetch(`${API_BASE}/souscategories/bycategory?categories_id=${selectedCategory.id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then((res) => res.json())
                .then((data) => setSubCategories(data.data || []))
                .catch(console.error);
        }
    }, [selectedCategory, API_BASE, token]);

    useEffect(() => {
        if (selectedSubCategory) {
            const API_URL = process.env.NEXT_PUBLIC_REST_API_ENDPOINT;
            if (!API_URL)
                throw new Error("NEXT_PUBLIC_REST_API_ENDPOINT n'est pas défini !");
            const API_BASE = `${API_URL}`;
            const token = getAuthToken();
            fetch(`${API_BASE}/subcategories/bycategory?categories_id=${selectedSubCategory.id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then((res) => res.json())
                .then((data) => setSubSubCategories(data.data || []))
                .catch(console.error);
        }
    }, [selectedSubCategory, API_BASE, token]);

    useEffect(() => {
        async function fetchCountries() {
            const API_URL = process.env.NEXT_PUBLIC_REST_API_ENDPOINT;
            if (!API_URL)
                throw new Error("NEXT_PUBLIC_REST_API_ENDPOINT n'est pas défini !");
            const API_BASE = `${API_URL}`;
            const token = getAuthToken();
            try {
                const res = await fetch(`${API_BASE}/countries`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await res.json();
                setCountries(data);
                setSelectedCountry(data[0]);
            } catch (err) {
                console.error(err);
            }
        }
        fetchCountries();
    }, [API_BASE, token]);

    // 🔹 FETCH PRODUCTS à chaque changement filtre/search/pagination
    useEffect(() => {
        fetchProducts();
    }, [
        search,
        selectedCountry,
        selectedCategory,
        selectedSubCategory,
        selectedSubSubCategory,
        sortBy,
        sortOrder,
        page,
    ]);

    return (
        <div className="bg-gray-50 min-h-screen p-4 md:p-10 max-w-[1400px] mx-auto">
            <div className="text-sm text-gray-500 mb-2">
                Accueil / <span className="text-gray-700">Produits</span>
            </div>
            <h1 className="text-3xl font-semibold text-gray-800">Produits Filtrés</h1>
            <p className="text-gray-500 mb-6">{total} Résultats Trouvés</p>

            {/* MOBILE SEARCH + FILTER BUTTON */}
            <div className="flex items-center justify-between mb-4 lg:hidden">
                <div className="flex items-center border rounded-lg px-3 py-2 w-full max-w-sm">
                    <Search size={18} className="text-gray-400 mr-2" />
                    <input
                        type="text"
                        placeholder="Recherche..."
                        className="text-sm w-full outline-none"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <button
                    onClick={() => setMobileFilters(true)}
                    className="ml-3 flex items-center gap-2 bg-white border px-3 py-2 rounded-lg"
                >
                    <SlidersHorizontal size={18} />
                    Filtrer
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
                {/* DESKTOP FILTERS */}
                <aside className="hidden lg:block bg-white border rounded-xl p-5 h-fit">
                    <FilterContent
                        countries={countries}
                        categories={categories}
                        subCategories={subCategories}
                        subSubCategories={subSubCategories}
                        corridors={corridors}
                        selectedCountry={selectedCountry}
                        setSelectedCountry={setSelectedCountry}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        selectedSubCategory={selectedSubCategory}
                        setSelectedSubCategory={setSelectedSubCategory}
                        selectedSubSubCategory={selectedSubSubCategory}
                        setSelectedSubSubCategory={setSelectedSubSubCategory}
                    />
                </aside>

                {/* PRODUCTS */}
                <main>
                    <div className="hidden lg:flex items-center justify-between bg-white border rounded-xl p-4 mb-5">
                        <div className="flex items-center border rounded-lg px-3 py-2 w-full max-w-md">
                            <Search size={18} className="text-gray-400 mr-2" />
                            <input
                                type="text"
                                placeholder="Recherche..."
                                className="text-sm w-full outline-none"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            Trier par
                            <button
                                className="border px-3 py-1.5 rounded-md flex items-center gap-1"
                                onClick={() =>
                                    setSortBy(sortBy === "created_at" ? "price" : "created_at")
                                }
                            >
                                {sortBy === "created_at" ? "Date" : "Prix"} <ChevronDown size={16} />
                            </button>
                        </div>
                    </div>

                    {/* PRODUCTS GRID */}
                    {loading ? (
                        <p>Chargement...</p>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                            {products.map((product) => (
                                <motion.div
                                    key={product.id}
                                    whileHover={{ y: -6 }}
                                    transition={{ duration: 0.2 }}
                                    className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md"
                                >
                                    <div className="relative w-full h-40 mb-4">
                                        {product.image && (
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                fill
                                                className="object-contain"
                                            />
                                        )}
                                    </div>
                                    <h3 className="text-sm font-semibold text-gray-800">{product.name}</h3>
                                    <div className="text-lg font-semibold mt-1">{product.price}€</div>
                                    <Rating value={Math.round(product.rating)} />
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {/* PAGINATION */}
                    <div className="flex justify-center gap-2 mt-8">
                        <button
                            className="px-3 py-1 border rounded"
                            onClick={() => setPage(page - 1)}
                            disabled={page === 1}
                        >
                            Précédent
                        </button>
                        <span className="px-2 text-gray-500">{page}</span>
                        <button
                            className="px-3 py-1 border rounded"
                            onClick={() => setPage(page + 1)}
                            disabled={page * 20 >= total}
                        >
                            Suivant
                        </button>
                    </div>
                </main>
            </div>

            {/* MOBILE FILTER MODAL */}
            <AnimatePresence>
                {mobileFilters && (
                    <motion.div
                        className="fixed inset-0 z-50 flex"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div
                            className="absolute inset-0 bg-black/40"
                            onClick={() => setMobileFilters(false)}
                        />
                        <motion.div
                            initial={{ x: -350 }}
                            animate={{ x: 0 }}
                            exit={{ x: -350 }}
                            transition={{ duration: 0.3 }}
                            className="relative bg-white w-80 max-w-full h-full p-6 overflow-y-auto"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-semibold">Filtres</h2>
                                <button onClick={() => setMobileFilters(false)}>
                                    <X size={22} />
                                </button>
                            </div>

                            <FilterContent
                                countries={countries}
                                categories={categories}
                                subCategories={subCategories}
                                subSubCategories={subSubCategories}
                                corridors={corridors}
                                selectedCountry={selectedCountry}
                                setSelectedCountry={setSelectedCountry}
                                selectedCategory={selectedCategory}
                                setSelectedCategory={setSelectedCategory}
                                selectedSubCategory={selectedSubCategory}
                                setSelectedSubCategory={setSelectedSubCategory}
                                selectedSubSubCategory={selectedSubSubCategory}
                                setSelectedSubSubCategory={setSelectedSubSubCategory}
                            />

                            <button
                                className="w-full mt-6 bg-teal-600 text-white py-2 rounded-lg"
                                onClick={() => {
                                    fetchProducts();
                                    setMobileFilters(false);
                                }}
                            >
                                Appliquer.
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
} 