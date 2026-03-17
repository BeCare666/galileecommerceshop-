"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Card from '@/components/product/card';
import {
  Search,
  Star,
  ChevronDown,
  SlidersHorizontal,
  X,
  Globe,
  Layers,
  Package,
  Map as MapIcon,
  DollarSign,
  ChevronRight,
  Box,
  CheckCircle, XCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { getAuthToken, removeAuthToken } from '../../data/client/token.utils';
import type { GetStaticProps } from 'next';
import Layout from '@/layouts/_layout';
import Seo from '@/layouts/_seo';
import type {
  CategoryQueryOptions,
  NextPageWithLayout,
  ProductQueryOptions,
  SettingsQueryOptions,
} from '@/types';
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
interface ProductPageProps {
  initialFilters?: {
    categories_id?: number;
    sous_categories_id?: number;
    sub_categories_id?: number;
  };
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
  label: React.ReactNode;
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
  selectedCorridor,
  setSelectedCorridor,
  selectedCountry,
  setSelectedCountry,
  selectedCategory,
  setSelectedCategory,
  selectedSubCategory,
  setSelectedSubCategory,
  selectedSubSubCategory,
  setSelectedSubSubCategory,
  isOrigin,
  setIsOrigin,
  priceMin,
  setPriceMin,
  priceMax,
  setPriceMax,
  ratings,
  setRatings
}: any) {
  return (
    <div className="space-y-4">
      <FilterAccordion icon={Globe} title="Pavillons">
        {(countries || []).map((c: any) => (
          <Checkbox
            key={c.id}
            label={
              <div className="flex items-center gap-2">
                <Image
                  src={`https://flagcdn.com/w40/${c.code.toLowerCase()}.png`}
                  alt={c.name}
                  width={20}
                  height={14}
                  className="rounded-sm"
                />
                <span>{c.name}</span>
              </div>
            }
            checked={selectedCountry?.id === c.id}
            onChange={() => setSelectedCountry(c)}
          />
        ))}
      </FilterAccordion>

      <FilterAccordion icon={Layers} title="Catégorie">
        {(categories || []).map((cat: any) => (
          <Checkbox
            key={cat.id}
            label={cat.name}
            checked={selectedCategory?.id === cat.id}
            onChange={() => setSelectedCategory(cat)}
          />
        ))}
      </FilterAccordion>

      <FilterAccordion icon={Package} title="Sous-Catégorie">
        {(subCategories || []).map((sc: any) => (
          <Checkbox
            key={sc.id}
            label={sc.name}
            checked={selectedSubCategory?.id === sc.id}
            onChange={() => setSelectedSubCategory(sc)}
          />
        ))}
      </FilterAccordion>

      <FilterAccordion icon={Package} title="Sub-Sous-Catégorie">
        {(subSubCategories || []).map((ssc: any) => (
          <Checkbox
            key={ssc.id}
            label={ssc.name}
            checked={selectedSubSubCategory?.id === ssc.id}
            onChange={() => setSelectedSubSubCategory(ssc)}
          />
        ))}
      </FilterAccordion>
      <FilterAccordion icon={MapIcon} title="Corridor">
        {(corridors || []).map((c: any) => (
          <Checkbox
            key={c.id}
            label={c.name}
            checked={selectedCorridor?.id === c.id}
            onChange={() => setSelectedCorridor(c)}
          />
        ))}
      </FilterAccordion>
      <FilterAccordion icon={MapIcon} title="Produits d'origine ou non ?">


        <div className="space-y-2">
          <button
            onClick={() => setIsOrigin(null)}
            className={`filter-item flex items-center gap-2 ${isOrigin === null ? "active" : ""}`}
          >
            <Box size={16} />
            Touts les produits
          </button>

          <button
            onClick={() => setIsOrigin(true)}
            className={`filter-item flex items-center gap-2 ${isOrigin === true ? "active" : ""}`}
          >
            <CheckCircle size={16} />
            Oui, d'origine
          </button>

          <button
            onClick={() => setIsOrigin(false)}
            className={`filter-item flex items-center gap-2 ${isOrigin === false ? "active" : ""}`}
          >
            <XCircle size={16} />
            Non, pas d'origine
          </button>
        </div>
      </FilterAccordion>
      <FilterAccordion icon={DollarSign} title="Price">
        <div className="space-y-3">

          <input
            type="number"
            placeholder="Prix minimum"
            value={priceMin ?? ""}
            onChange={(e) =>
              setPriceMin(e.target.value ? Number(e.target.value) : null)
            }
            className="w-full border rounded-lg px-3 py-2"
          />

          <input
            type="number"
            placeholder="Prix maximum"
            value={priceMax ?? ""}
            onChange={(e) =>
              setPriceMax(e.target.value ? Number(e.target.value) : null)
            }
            className="w-full border rounded-lg px-3 py-2"
          />

        </div>
      </FilterAccordion>


      <FilterAccordion icon={Star} title="Les Évaluations">
        <div className="space-y-2">

          {[
            { value: null, label: "Toutes les évaluations" },
            { value: 4, label: "4 étoiles et plus" },
            { value: 3, label: "3 étoiles et plus" },
            { value: 2, label: "2 étoiles et plus" },
          ].map((item) => (
            <motion.button
              key={item.value ?? "all"}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setRatings(item.value)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition 
        ${ratings === item.value
                  ? "bg-yellow-50 border border-yellow-400"
                  : "hover:bg-gray-50 border border-transparent"
                }`}
            >

              <div className="flex items-center gap-2">

                {item.value !== null && (
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={16}
                        className={`${star <= item.value
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                          }`}
                      />
                    ))}
                  </div>
                )}

                <span className="text-sm font-medium text-gray-700">
                  {item.label}
                </span>

              </div>

            </motion.button>
          ))}

        </div>
      </FilterAccordion>
    </div>
  );
}

const ProductPage: NextPageWithLayout<ProductPageProps> = ({ initialFilters }) => {
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_REST_API_ENDPOINT;
  if (!API_URL) throw new Error("NEXT_PUBLIC_REST_API_ENDPOINT n'est pas défini !");
  const API_BASE = `${API_URL}`;
  const token = getAuthToken();
  //if (!token) router.push('/login');
  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token, router]);
  // États
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [countries, setCountries] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [subCategories, setSubCategories] = useState<any[]>([]);
  const [subSubCategories, setSubSubCategories] = useState<any[]>([]);
  const [selectedCorridor, setSelectedCorridor] = useState<any>(null);
  const [corridors, setCorridors] = useState<any>(null);
  const [isOrigin, setIsOrigin] = useState<boolean | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<any>(null);
  const [selectedSubSubCategory, setSelectedSubSubCategory] = useState<any>(null);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("desc");
  const [page, setPage] = useState(1);
  const [priceMin, setPriceMin] = useState<number | null>(null);
  const [priceMax, setPriceMax] = useState<number | null>(null);
  const [mobileFilters, setMobileFilters] = useState(false);
  const [ratings, setRatings] = useState<number | null>(null);
  // 🔹 FETCH PRODUCTS
  async function fetchProducts() {
    if (!token) return;
    setLoading(true);
    try {
      const params: any = {
        search: search?.trim() || undefined,
        corridor_id: selectedCorridor?.id || undefined,
        countries_id: selectedCountry?.id || undefined,
        categories_id: selectedCategory?.id || undefined,
        sous_categories_id: selectedSubCategory?.id || undefined,
        sub_categories_id: selectedSubSubCategory?.id || undefined,
        is_origin: isOrigin,
        price_min: priceMin,
        price_max: priceMax,
        rating: ratings,
        limit: 20,
        offset: (page - 1) * 20,
        orderBy: sortBy,
        sortedBy: sortOrder,
      };
      Object.keys(params).forEach((key) => {
        if (params[key] === undefined || params[key] === null) {
          delete params[key]
        }
      });
      const query = new URLSearchParams(
        Object.entries(params)
          .filter(([_, v]) => v !== undefined)
          .map(([k, v]) => [k, String(v)])
      ).toString();

      const res = await fetch(`${API_BASE}/products/corridor?${query}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("QUERY :", query);
      if (!res.ok) throw new Error("Erreur API produits");
      const data = await res.json();
      console.log("pour voir les produits", data);
      setProducts(data.data || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    if (!initialFilters) {
      setInitialized(true);
      return;
    }

    if (!categories.length) return;

    // CATEGORY
    if (initialFilters.categories_id) {
      const found = categories.find(
        (c) => c.id === initialFilters.categories_id
      );
      if (found) setSelectedCategory(found);
    }

    // SOUS-CATEGORY
    if (initialFilters.sous_categories_id && subCategories.length) {
      const found = subCategories.find(
        (sc) => sc.id === initialFilters.sous_categories_id
      );
      if (found) setSelectedSubCategory(found);
    }

    // SUB-SOUS-CATEGORY
    if (initialFilters.sub_categories_id && subSubCategories.length) {
      const found = subSubCategories.find(
        (ssc) => ssc.id === initialFilters.sub_categories_id
      );
      if (found) setSelectedSubSubCategory(found);
    }

    setInitialized(true);

  }, [initialFilters, categories, subCategories, subSubCategories]);

  useEffect(() => {
    const stored = sessionStorage.getItem("productFilters");

    if (!stored) {
      setInitialized(true);
      return;
    }

    const filters = JSON.parse(stored);
    //alert(filters.categories_id)
    // CATEGORY (number)
    if (filters.categories_id) {
      //setSelectedCategory(filters.categories_id);
      const foundCat = categories.find((c) => c.id === filters.categories_id);
      if (foundCat) setSelectedCategory(foundCat);
    }

    // SOUS-CATEGORIES (Set)
    if (filters.sous_categories_id?.length) {
      setSelectedSubCategory(new Set(filters.sous_categories_id));
    }

    // SUB-SOUS-CATEGORIES (Set)
    if (filters.sub_categories_id?.length) {
      setSelectedSubSubCategory(new Set(filters.sub_categories_id));
    }

    sessionStorage.removeItem("productFilters");

    setInitialized(true);
  }, []);
  // 🔹 FETCH COUNTRIES + sélection par défaut
  useEffect(() => {
    async function fetchCountries() {
      if (!token) return;
      try {
        const res = await fetch(`${API_BASE}/countries`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (Array.isArray(data)) {
          setCountries(data);
          //setSelectedCountry(data[0] || null); // Sélection par défaut
          setSelectedCountry(null);

        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchCountries();
  }, [API_BASE, token]);

  // 🔹 FETCH CATEGORIES
  useEffect(() => {
    async function loadCategories() {
      if (!token) return;
      try {
        const res = await fetch(`${API_BASE}/categories`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const payload = await res.json();
        setCategories(payload?.data || []);
      } catch (err) {
        console.error(err);
      }
    }
    loadCategories();
  }, [API_BASE, token]);

  // 🔹 FETCH SUB-CATEGORIES
  useEffect(() => {
    if (!selectedCategory) {
      setSubCategories([]);
      setSelectedSubCategory(null);
      return;
    }
    async function loadSubCategories() {
      if (!token) return;
      try {
        const res = await fetch(
          `${API_BASE}/souscategories/bycategory?categories_id=${selectedCategory.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = await res.json();
        setSubCategories(data?.data || []);
        setSelectedSubCategory(null);
      } catch (err) {
        console.error(err);
      }
    }
    loadSubCategories();
  }, [selectedCategory, API_BASE, token]);
  useEffect(() => {
    async function fetchCorridors() {
      if (!token) return;

      try {
        const res = await fetch(`${API_BASE}/corridors`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        console.log("corridors", data)
        setCorridors(data?.data || []);
      } catch (err) {
        console.error(err);
      }
    }

    fetchCorridors();
  }, [API_BASE, token]);
  // 🔹 FETCH SUB-SUB-CATEGORIES
  useEffect(() => {
    if (!selectedSubCategory) {
      setSubSubCategories([]);
      setSelectedSubSubCategory(null);
      return;
    }
    async function loadSubSubCategories() {
      if (!token) return;
      try {
        const res = await fetch(
          `${API_BASE}/subcategories/bycategory?categories_id=${selectedSubCategory.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = await res.json();
        setSubSubCategories(data?.data || []);
        setSelectedSubSubCategory(null);
      } catch (err) {
        console.error(err);
      }
    }
    loadSubSubCategories();
  }, [selectedSubCategory, API_BASE, token]);

  // 🔹 FETCH PRODUCTS dès que les filtres ou search changent
  useEffect(() => {
    //if (!initialized) return;
    fetchProducts();
  }, [
    search,
    selectedCountry,
    selectedCorridor,
    selectedCategory,
    selectedSubCategory,
    selectedSubSubCategory,
    isOrigin,
    priceMin,
    priceMax,
    ratings,
    sortBy,
    sortOrder,
    page,
  ]);

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-10 max-w-[1400px] lg:w-full mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-400 mb-2 space-x-1">
        <span>Accueil</span>
        <ChevronRight size={14} className="text-gray-300" />
        <span className="text-gray-700 font-medium">Produits</span>
      </div>

      {/* Title & Results */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Les Produits
        </h1>
        <p className="text-gray-500 text-sm sm:text-base">
          <span className="font-medium text-gray-700">{total}</span> résultats trouvés
        </p>
      </div>

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
            selectedCorridor={selectedCorridor}
            setSelectedCorridor={setSelectedCorridor}
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedSubCategory={selectedSubCategory}
            setSelectedSubCategory={setSelectedSubCategory}
            selectedSubSubCategory={selectedSubSubCategory}
            setSelectedSubSubCategory={setSelectedSubSubCategory}
            isOrigin={isOrigin}
            setIsOrigin={setIsOrigin}
            priceMin={priceMin}
            setPriceMin={setPriceMin}
            priceMax={priceMax}
            setPriceMax={setPriceMax}
            ratings={ratings}
            setRatings={setRatings}
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
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <Box size={48} className="mb-4 text-gray-300" />
              <h2 className="text-xl font-semibold mb-2">Aucun produit trouvé</h2>
              <p className="text-sm text-gray-500 text-center max-w-xs">
                Aucun produit ne correspond à vos filtres ou votre recherche. Essayez de modifier vos critères.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product: any) => (
                <Card key={product.id} product={product} />
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
                selectedCorridor={selectedCorridor}
                setSelectedCorridor={setSelectedCorridor}
                selectedCountry={selectedCountry}
                setSelectedCountry={setSelectedCountry}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedSubCategory={selectedSubCategory}
                setSelectedSubCategory={setSelectedSubCategory}
                selectedSubSubCategory={selectedSubSubCategory}
                setSelectedSubSubCategory={setSelectedSubSubCategory}
                isOrigin={isOrigin}
                setIsOrigin={setIsOrigin}
                priceMin={priceMin}
                setPriceMin={setPriceMin}
                priceMax={priceMax}
                setPriceMax={setPriceMax}
                ratings={ratings}
                setRatings={setRatings}
              />

              <button
                className="w-full mt-6 bg-[#E4127A] text-white py-2 rounded-lg"
                onClick={() => {
                  fetchProducts();
                  setMobileFilters(false);
                }}
              >
                Appliquer.
              </button>
              <button
                className="w-full mt-2 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition font-medium"
                onClick={() => {
                  // Réinitialise tous les filtres
                  setSelectedCountry(null);
                  setSelectedCategory(null);
                  setSelectedSubCategory(null);
                  setSelectedSubSubCategory(null);
                  setSelectedCorridor(null);
                  setIsOrigin(null);
                  setPriceMin(null);
                  setPriceMax(null);
                  setRatings(null);
                }}
              >
                Réinitialiser
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

ProductPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default ProductPage;