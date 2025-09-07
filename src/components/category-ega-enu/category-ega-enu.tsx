'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
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
  const [selectedSubCategories, setSelectedSubCategories] = useState<
    Set<number>
  >(new Set());
  const [selectedSubSubCategories, setSelectedSubSubCategories] = useState<
    Set<number>
  >(new Set());
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Load root categories
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
  }, [API_BASE, token]);

  async function loadSubCategories(categoryId: number) {
    setSubCategories(null);
    setSubSubCategories(null);
    try {
      const res = await fetch(
        `${API_BASE}/souscategories/bycategory?categories_id=${categoryId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (!res.ok) throw new Error('Failed to load subcategories');
      const payload = await res.json();
      setSubCategories(payload?.data ?? []);
    } catch (err) {
      console.error(err);
      setSubCategories([]);
    }
  }
  function resetFilter() {
    setSelectedCategory(null);
    setSelectedSubCategories(new Set());
    setSelectedSubSubCategories(new Set());
    setSubCategories(null);
    setSubSubCategories(null);
    setOpenMenu(false);
  }
  async function loadSubSubCategories(subCategoryId: number) {
    setSubSubCategories(null);
    try {
      const res = await fetch(
        `${API_BASE}/subcategories/bycategory?categories_id=${subCategoryId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (!res.ok) throw new Error('Failed to load subsubcategories');
      const payload = await res.json();
      setSubSubCategories(payload?.data ?? []);
    } catch (err) {
      console.error(err);
      setSubSubCategories([]);
    }
  }

  function toggleSet(
    setState: React.Dispatch<React.SetStateAction<Set<number>>>,
    value: number,
  ) {
    setState((prev) => {
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
    await loadSubCategories(catId);
    setOpenMenu(true);
  }

  async function handleSubCategoryClick(subId: number) {
    toggleSet(setSelectedSubCategories, subId);
    if (!selectedSubCategories.has(subId)) await loadSubSubCategories(subId);
    else setSubSubCategories(null);
  }

  function handleSubSubCategoryClick(subSubId: number) {
    toggleSet(setSelectedSubSubCategories, subSubId);
  }

  function applyFilter() {
    const query: string[] = [];

    if (selectedCategory) {
      query.push(`categories_id=${selectedCategory}`);
    }

    if (selectedSubCategories.size) {
      query.push(
        `sous_categories_id=${Array.from(selectedSubCategories).join(',')}`,
      );
    }

    if (selectedSubSubCategories.size) {
      query.push(
        `sub_categories_id=${Array.from(selectedSubSubCategories).join(',')}`,
      );
    }

    const queryString = query.join('&');

    router.push(`/products/forcategory?${queryString}`);
    setOpenMenu(false);
  }

  // Close on outside click
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) setOpenMenu(false);
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  return (
    <div ref={containerRef} className="relative z-50">
      {/* Bouton */}
      <div
        className="flex items-center gap-2 cursor-pointer px-4 py-2  hover:bg-gray-600 transition"
        onMouseEnter={() => setOpenMenu(true)}
      >
        <span>Toutes les catégories</span>
        <span className="ml-1 text-xs">▾</span>
      </div>

      {openMenu && (
        <>
          {/* Overlay léger pour focus, optionnel */}
          <div
            className="fixed inset-x-0 top-[64px] bottom-0 bg-black/10 z-40"
            onClick={() => setOpenMenu(false)}
          />

          {/* Mega menu full screen sous la top bar */}
          <div
            className="fixed top-[64px] left-0 right-0 z-50 bg-white text-gray-900 flex flex-col md:flex-row py-6 px-4 md:px-12 gap-6 max-h-[calc(100vh-64px)] overflow-y-auto shadow-lg"
            onMouseLeave={() => setOpenMenu(false)}
          >
            {/* Root categories */}
            <ul className="flex-1 space-y-2 overflow-y-auto">
              {categories.map((cat) => (
                <li
                  key={cat.id}
                  className="flex items-center gap-2 px-4 py-3 rounded hover:bg-pink-100 cursor-pointer transition"
                  onMouseEnter={() => handleCategoryClick(cat.id)}
                >
                  <img
                    src={cat.icon || '/placeholder-icon.png'}
                    alt={cat.name}
                    className="w-6 h-6"
                  />
                  <span>{cat.name}</span>
                </li>
              ))}
            </ul>

            {/* Subcategories */}
            {subCategories && (
              <ul className="flex-1 space-y-2 overflow-y-auto">
                {subCategories.map((sub) => (
                  <li
                    key={sub.id}
                    className="flex items-center gap-2 px-4 py-3 rounded hover:bg-pink-100 cursor-pointer transition"
                    onClick={() => handleSubCategoryClick(sub.id)}
                  >
                    {/* Icon de la sous-catégorie 
                                        <img src={sub.icon || '/placeholder-icon.png'} alt={sub.name} className="w-5 h-5" />
*/}
                    {/* Nom */}
                    <span className="flex-1">{sub.name}</span>

                    {/* Check si sélectionné */}
                    {selectedSubCategories.has(sub.id) && (
                      <span className="w-5 h-5 flex items-center justify-center bg-pink-500 text-white rounded-full">
                        ✓
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}

            {/* Sub-subcategories */}
            {subSubCategories && (
              <ul className="flex-1 space-y-2 overflow-y-auto">
                {subSubCategories.map((subSub) => (
                  <li
                    key={subSub.id}
                    className="flex items-center gap-2 px-4 py-3 rounded hover:bg-pink-100 cursor-pointer transition"
                    onClick={() => handleSubSubCategoryClick(subSub.id)}
                  >
                    {/* Icon de la sous-sous-catégorie 
                                        <img src={subSub.icon || '/placeholder-icon.png'} alt={subSub.name} className="w-4 h-4" />
*/}
                    {/* Nom */}
                    <span className="flex-1">{subSub.name}</span>

                    {/* Check si sélectionné */}
                    {selectedSubSubCategories.has(subSub.id) && (
                      <span className="w-5 h-5 flex items-center justify-center bg-pink-500 text-white rounded-full">
                        ✓
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}

            <button
              className="absolute bottom-4 right-4 px-4 py-2 bg-pink-500 text-white rounded hover:scale-105 transition"
              onClick={applyFilter}
            >
              Appliquer
            </button>
          </div>
        </>
      )}
    </div>
  );
}
