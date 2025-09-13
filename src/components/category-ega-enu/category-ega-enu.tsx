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
  const [selectedSubCategories, setSelectedSubCategories] = useState<Set<number>>(new Set());
  const [selectedSubSubCategories, setSelectedSubSubCategories] = useState<Set<number>>(new Set());

  // Mobile-specific states
  const [openCategories, setOpenCategories] = useState<Set<number>>(new Set());
  const [openSubCategories, setOpenSubCategories] = useState<Set<number>>(new Set());
  const [mobileSubCategories, setMobileSubCategories] = useState<Record<number, any[]>>({});
  const [mobileSubSubCategories, setMobileSubSubCategories] = useState<Record<number, any[]>>({});

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
      if (!res.ok) throw new Error('Failed to load subsubcategories');
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

  // Close menu on outside click
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
        className="flex items-center gap-2 cursor-pointer px-4 py-2 hover:bg-gray-600 transition"
        onClick={() => setOpenMenu(!openMenu)}
        onMouseEnter={() => window.innerWidth >= 768 && setOpenMenu(true)}
      >
        <span>Toutes les catégories</span>
        <span className="ml-1 text-xs">▾</span>
      </div>

      {openMenu && (
        <div className="fixed top-[64px] left-0 right-0 z-50 bg-white text-gray-900 flex flex-col md:flex-row py-6 px-4 md:px-12 gap-6 max-h-[calc(100vh-64px)] overflow-y-auto shadow-lg"
          onMouseLeave={() => window.innerWidth >= 768 && setOpenMenu(false)}
        >
          {/* --- Desktop 3 colonnes --- */}
          <div className="hidden md:flex w-full gap-6">
            {/* Root categories */}
            <ul className="flex-1 space-y-2 overflow-y-auto">
              {categories.map((cat) => (
                <li key={cat.id} className="flex items-center gap-2 px-4 py-3 rounded hover:bg-pink-100 cursor-pointer transition"
                  onMouseEnter={() => handleCategoryClick(cat.id)}
                >
                  <img src={cat.icon || '/placeholder-icon.png'} alt={cat.name} className="w-6 h-6" />
                  <span>{cat.name}</span>
                </li>
              ))}
            </ul>

            {/* Subcategories */}
            {subCategories && (
              <ul className="flex-1 space-y-2 overflow-y-auto">
                {subCategories.map((sub) => (
                  <li key={sub.id} className="flex items-center gap-2 px-4 py-3 rounded hover:bg-pink-100 cursor-pointer transition"
                    onClick={() => handleSubCategoryClick(sub.id)}
                  >
                    <span className="flex-1">{sub.name}</span>
                    {selectedSubCategories.has(sub.id) && (
                      <span className="w-5 h-5 flex items-center justify-center bg-pink-500 text-white rounded-full">✓</span>
                    )}
                  </li>
                ))}
              </ul>
            )}

            {/* Sub-subcategories */}
            {subSubCategories && (
              <ul className="flex-1 space-y-2 overflow-y-auto">
                {subSubCategories.map((subSub) => (
                  <li key={subSub.id} className="flex items-center gap-2 px-4 py-3 rounded hover:bg-pink-100 cursor-pointer transition"
                    onClick={() => handleSubSubCategoryClick(subSub.id)}
                  >
                    <span className="flex-1">{subSub.name}</span>
                    {selectedSubSubCategories.has(subSub.id) && (
                      <span className="w-5 h-5 flex items-center justify-center bg-pink-500 text-white rounded-full">✓</span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* --- Mobile accordéon --- */}
          <div className="flex flex-col w-full md:hidden gap-2">
            {categories.map((cat) => {
              const isCatOpen = openCategories.has(cat.id);
              return (
                <div key={cat.id} className="flex flex-col">
                  {/* Catégorie */}
                  <div className="flex items-center justify-between px-4 py-3 rounded hover:bg-pink-100 cursor-pointer transition"
                    onClick={async () => {
                      const newSet = new Set(openCategories);
                      if (newSet.has(cat.id)) {
                        newSet.delete(cat.id);
                      } else {
                        newSet.add(cat.id);
                        if (!mobileSubCategories[cat.id]) {
                          const subs = await loadSubCategories(cat.id);
                          setMobileSubCategories(prev => ({ ...prev, [cat.id]: subs }));
                        }
                      }
                      setOpenCategories(newSet);
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <img src={cat.icon || '/placeholder-icon.png'} alt={cat.name} className="w-6 h-6" />
                      <span>{cat.name}</span>
                    </div>
                    <span>{isCatOpen ? '▴' : '▾'}</span>
                  </div>

                  {/* Sous-catégories */}
                  {isCatOpen &&
                    mobileSubCategories[cat.id]?.map((sub) => {
                      const isSubOpen = openSubCategories.has(sub.id);
                      return (
                        <div key={sub.id} className="ml-6 flex flex-col">
                          <div className="flex items-center justify-between px-4 py-2 rounded hover:bg-pink-100 cursor-pointer transition"
                            onClick={async () => {
                              const newSet = new Set(openSubCategories);
                              if (newSet.has(sub.id)) {
                                newSet.delete(sub.id);
                              } else {
                                newSet.add(sub.id);
                                if (!mobileSubSubCategories[sub.id]) {
                                  const subSubs = await loadSubSubCategories(sub.id);
                                  setMobileSubSubCategories(prev => ({ ...prev, [sub.id]: subSubs }));
                                }
                              }
                              setOpenSubCategories(newSet);
                            }}
                          >
                            <span>{sub.name}</span>
                            <span>{isSubOpen ? '▴' : '▾'}</span>
                          </div>

                          {/* Sub-sub-catégories */}
                          {isSubOpen &&
                            mobileSubSubCategories[sub.id]?.map((subSub) => (
                              <div key={subSub.id} className="ml-6 flex items-center justify-between px-4 py-2 rounded hover:bg-pink-100 cursor-pointer transition"
                                onClick={() => handleSubSubCategoryClick(subSub.id)}
                              >
                                <span>{subSub.name}</span>
                                {selectedSubSubCategories.has(subSub.id) && (
                                  <span className="w-5 h-5 flex items-center justify-center bg-pink-500 text-white rounded-full">✓</span>
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

          {/* Bouton Appliquer */}
          <button
            className="fixed bottom-4 right-4 w-[120px] h-[48px] bg-pink-500 text-white rounded hover:scale-105 transition flex items-center justify-center shadow-lg"
            onClick={applyFilter}
          >
            Appliquer
          </button>
        </div>
      )}
    </div>
  );
}
