import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import cn from 'classnames';
import { ChevronLeft } from '@/components/icons/chevron-left';
import { ChevronRight } from '@/components/icons/chevron-right';
import { useScrollableSlider } from '@/lib/hooks/use-scrollable-slider';
import { useCategories } from '@/data/category';
import { useTranslation } from 'next-i18next';
import CountrySelector from '@/components/country-selector/country-selector';
import Image from '@/components/ui/image';
import CategoriesForYouPanel from '@/components/product/categoriesForYouPanel';
import { getAuthToken, removeAuthToken } from '../../data/client/token.utils';
import Link from '@/components/ui/link';
import Modal from '@/components/modal/modal';
import routes from '@/config/routes';
const token = getAuthToken(); // 🔁 Remplace par ton token

/** Petite icône check inline (SVG) */
function CheckIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M20 6L9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CategoryItem({
  categoryName,
  categoryIcon,
  isActive,
  onClick,
  showCaret,
}: {
  categoryIcon?: string;
  categoryName: string;
  isActive: boolean;
  onClick: () => void;
  showCaret?: boolean;
}) {
  return (
    <span
      onClick={onClick}
      className="inline-flex items-center gap-2 cursor-pointer"
    >
      {/* Icône circulaire */}
      <div className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" d="M3 6h18M3 12h18M3 18h18" />
        </svg>
      </div>

      <span className="truncate max-w-[140px]">{categoryName}</span>

      {showCaret && (
        <span aria-hidden className="ml-1 text-xs">
          ▾
        </span>
      )}
    </span>
  );
}

export default function CategoryFilterWithPanel({
  defaultActivePath = '',
}: {
  defaultActivePath?: string;
}) {
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const categoriesRef = useRef<HTMLDivElement | null>(null);
  const { categories } = useCategories({ limit: 100 });
  const [open, setOpen] = useState(false);
  const [mapIsOk, setMapIsOk] = useState(false);
  const {
    sliderEl,
    sliderPrevBtn,
    sliderNextBtn,
    scrollToTheRight,
    scrollToTheLeft,
  } = useScrollableSlider(defaultActivePath);
  const { t } = useTranslation('common');
  console.log(categories);
  // selection single for root, multiple for sub & sub-sub
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedSubCategories, setSelectedSubCategories] = useState<
    Set<number>
  >(new Set());
  const [selectedSubSubCategories, setSelectedSubSubCategories] = useState<
    Set<number>
  >(new Set());
  const [openCategoryPanelAllCategory, setOpenCategoryPanelAllCategory] =
    useState<number | null>(null);
  // panel state and lists
  const [openCategoryPanel, setOpenCategoryPanel] = useState<number | null>(
    null,
  );
  const [subCategories, setSubCategories] = useState<any[] | null>(null);
  const [subSubCategories, setSubSubCategories] = useState<any[] | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const API_URL = process.env.NEXT_PUBLIC_REST_API_ENDPOINT;
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_REST_API_ENDPOINT n'est pas défini !");
  }
  const API_BASE = `${API_URL}`;
  const headers = { 'Content-Type': 'application/json' };

  // Utils pour toggle dans Set (immutability)
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

  // Load subcategories for a root category
  async function loadSubCategories(categoryId: number) {
    setSubCategories(null);
    setSubSubCategories(null);
    try {
      const res = await fetch(
        `${API_BASE}/souscategories/bycategory?categories_id=${categoryId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      if (!res.ok) throw new Error('Failed to load subcategories');
      const payload = await res.json();
      // backend returns { data: [...] } - adapt if different
      setSubCategories(payload?.data ?? []);
    } catch (err) {
      console.error(err);
      setSubCategories([]);
    }
  }

  // Load sub-sub categories for a sub category
  async function loadSubSubCategories(subCategoryId: number) {
    setSubSubCategories(null);
    try {
      const res = await fetch(
        `${API_BASE}/subcategories/bycategory?categories_id=${subCategoryId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
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
  async function handleCategoryAllClick() {
    setOpenCategoryPanelAllCategory((prev) => (prev === null ? 1 : null));
  }
  async function handleBecomeSeller() {
    router.push('/become-seller');
  }
  // Click on root category
  async function handleCategoryClick(catId: number | string) {
    setOpenCategoryPanelAllCategory(null);
    const id = typeof catId === 'string' && catId === '' ? null : Number(catId);
    if (!id) {
      // All
      setSelectedCategory(null);
      setSelectedSubCategories(new Set());
      setSelectedSubSubCategories(new Set());
      setOpenCategoryPanel(-1);
      //alert('ainsi')
      //router.push('/products/forcategory');
      return;
    }

    // toggle same => close
    if (openCategoryPanel === id) {
      setOpenCategoryPanel(null);
      return;
    }

    setSelectedCategory(id);
    setSelectedSubCategories(new Set());
    setSelectedSubSubCategories(new Set());
    setOpenCategoryPanel(id);
    await loadSubCategories(id);
    // ensure panel is visible and positioned — we rely on CSS for responsiveness
  }

  // Click subcategory: multiple selection, but when selected we also load its sub-sub list
  async function handleSubCategoryClick(subId: number) {
    toggleSet(setSelectedSubCategories, subId);
    // load related sub-subcategories only when selecting (optional: load for each selected? we load for clicked one)
    if (!selectedSubCategories.has(subId)) {
      // newly selected -> load its sub-sub for the panel (replace list)
      await loadSubSubCategories(subId);
    } else {
      // was selected, now unselected -> if it was the one showing sub-sub, clear subSub list
      setSubSubCategories(null);
    }
  }

  // click sub-sub (multi)
  function handleSubSubCategoryClick(subSubId: number) {
    toggleSet(setSelectedSubSubCategories, subSubId);
  }

  // Apply filter: convert Sets to comma-separated lists
  function applyFilter() {
    const query: any = {};
    if (selectedCategory) query.categories_id = selectedCategory;
    if (selectedSubCategories.size)
      query.sous_categories_id = Array.from(selectedSubCategories).join(',');
    if (selectedSubSubCategories.size)
      query.sub_categories_id = Array.from(selectedSubSubCategories).join(',');
    router.push({ pathname: '/products/forcategory', query });
    setOpenCategoryPanel(null);
  }

  // router active highlight
  const routerActiveCategory =
    Number(router.query.categories_id || router.query.category || '') || null;

  // close on outside click
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setOpenCategoryPanel(null);
      }
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      if (!categoriesRef.current) return;
      const offset = categoriesRef.current.offsetTop;
      setIsSticky(window.scrollY > offset);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={categoriesRef} suppressHydrationWarning className="relative ">
      {/* Barre bleue + dent de scie */}
      {/* Barre bleue + dent de scie */}
      <div
        className={`bg-[#1f6aa5] text-white block lg:hidden transition-all duration-300 ${
          isSticky ? 'fixed top-0 left-0 w-full z-[9999] shadow-lg' : 'relative'
        }`}
      >
        <nav className="px-6 py-3 flex items-center justify-between text-[15px] font-medium">
          {/* À gauche */}
          <div className="flex items-center">
            <CategoryItem
              categoryName={t('text-category-all')}
              isActive={!routerActiveCategory && !selectedCategory}
              onClick={handleCategoryAllClick}
            />
          </div>

          {/* À droite */}
          <div className="flex items-center">
            <span className="ml-2">Parvillons</span>
            <CountrySelector />
          </div>
        </nav>

        {/* Dent de scie */}
        <div
          className=" pointer-events-none absolute left-0 -bottom-[8px] w-full h-2"
          style={{
            background:
              'linear-gradient(-45deg, transparent 8px, #1f6aa5 0) 0 0/16px 8px repeat-x, linear-gradient(45deg, transparent 8px, #1f6aa5 0) 8px 0/16px 8px repeat-x',
          }}
        />
      </div>

      {/* PANEL: responsive, centered below the bar, max width + scroll */}
      {openCategoryPanel && (
        <div
          className={`bg-white border-t shadow-lg w-full z-[9998] transition-all duration-300 ${
            isSticky ? 'fixed top-[64px] left-0' : 'relative'
          }`}
          role="dialog"
          aria-label="Category panel"
        >
          <div className="mx-auto w-full md:w-[92%] lg:w-[80%] xl:w-[70%] max-w-[1100px] p-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Sub categories column */}
              <div className="flex-1 min-w-[180px] max-h-[320px] overflow-auto">
                <h4 className="mb-2 font-medium">Les sous catégories</h4>
                {!subCategories && (
                  <div className="text-sm text-gray-500">Loading…</div>
                )}
                {subCategories && subCategories.length === 0 && (
                  <div className="text-sm text-gray-500">
                    Pas de sous catégories
                  </div>
                )}
                {subCategories && subCategories.length > 0 && (
                  <ul className="space-y-1">
                    {subCategories.map((s) => {
                      const selected = selectedSubCategories.has(s.id);
                      return (
                        <li
                          key={s.id}
                          className={cn(
                            'flex items-center justify-between p-2 rounded-md cursor-pointer transition',
                            {
                              'bg-pink-50': selected,
                              'hover:bg-gray-50': !selected,
                            },
                          )}
                          onClick={() => handleSubCategoryClick(s.id)}
                          role="button"
                          aria-pressed={selected}
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex items-center">
                              <div
                                className={cn(
                                  'h-5 w-5 rounded-sm border flex items-center justify-center',
                                  {
                                    'bg-pink-500 border-pink-500 text-white':
                                      selected,
                                    'bg-white': !selected,
                                  },
                                )}
                              >
                                {selected ? (
                                  <CheckIcon className="h-4 w-4" />
                                ) : null}
                              </div>
                            </div>
                            <span className="truncate">{s.name}</span>
                          </div>
                          {s.has_children ? (
                            <small className="text-gray-400">▸</small>
                          ) : null}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>

              {/* Sub-sub categories */}
              <div className="flex-1 min-w-[180px] max-h-[320px] overflow-auto">
                <h4 className="mb-2 font-medium">Les sous-sous-catégories</h4>
                {!selectedSubCategories.size && (
                  <div className="text-sm text-gray-500">
                    Selectionnez un ou plusieurs sous sous catégories
                  </div>
                )}
                {selectedSubCategories.size > 0 && !subSubCategories && (
                  <div className="text-sm text-gray-500">Chargement…</div>
                )}
                {subSubCategories && subSubCategories.length === 0 && (
                  <div className="text-sm text-gray-500">
                    Pas de niveaux additionnels
                  </div>
                )}
                {subSubCategories && subSubCategories.length > 0 && (
                  <ul className="space-y-1">
                    {subSubCategories.map((ss) => {
                      const selected = selectedSubSubCategories.has(ss.id);
                      return (
                        <li
                          key={ss.id}
                          className={cn(
                            'flex items-center gap-3 p-2 rounded-md cursor-pointer transition',
                            {
                              'bg-pink-50': selected,
                              'hover:bg-gray-50': !selected,
                            },
                          )}
                          onClick={() => handleSubSubCategoryClick(ss.id)}
                          role="button"
                          aria-pressed={selected}
                        >
                          <div
                            className={cn(
                              'h-5 w-5 rounded-sm border flex items-center justify-center',
                              {
                                'bg-pink-500 border-pink-500 text-white':
                                  selected,
                              },
                            )}
                          >
                            {selected ? (
                              <CheckIcon className="h-4 w-4" />
                            ) : null}
                          </div>
                          <span className="truncate">{ss.name}</span>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>

              {/* Actions */}
              <div className="w-[200px] flex-shrink-0">
                <h4 className="mb-2 font-medium">Actions</h4>
                <div className="flex flex-row sm:flex-col gap-2">
                  <button
                    onClick={() => setOpenCategoryPanel(null)}
                    className="px-4 py-2 rounded border w-full"
                  >
                    Fermer
                  </button>
                  <button
                    onClick={applyFilter}
                    className="px-4 py-2 rounded bg-pink-500 text-white w-full"
                  >
                    Appliquer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="hidden">
        <button
          title={t('text-prev')}
          ref={sliderPrevBtn}
          onClick={scrollToTheLeft}
          className="invisible"
        >
          <ChevronLeft className="h-[18px] w-[18px]" />
        </button>

        <div className="-mb-4 flex flex-1 items-start overflow-hidden">
          <div
            className="-mb-7 flex w-full gap-3 overflow-x-auto scroll-smooth pb-7"
            ref={sliderEl}
          >
            {categories && categories.length > 0 ? (
              categories
                .filter((c: any) => c && c.slug?.toLowerCase() !== 'free') // Vérifie que c existe
                .map((category: any) => (
                  <CategoryItem
                    key={category.id ?? Math.random()} // fallback si id manquant
                    categoryName={category.name ?? 'Unnamed'}
                    categoryIcon={category.icon ?? '/placeholder.png'}
                    isActive={
                      Number(category.id) ===
                      (selectedCategory || routerActiveCategory)
                    }
                    onClick={() => handleCategoryClick(category.id)}
                    showCaret={!!category.has_children}
                  />
                ))
            ) : (
              // Affiche un loader ou message si les catégories ne sont pas encore chargées
              <div className="text-center py-10 text-gray-500">
                Chargement des catégories...
              </div>
            )}
          </div>
        </div>
        {openCategoryPanelAllCategory && (
          <CategoriesForYouPanel
            categories={categories}
            onClose={() => setOpenCategoryPanelAllCategory(null)}
            onSelectCategory={(id) => handleCategoryClick(id)}
          />
        )}
        <div className="ml-auto flex items-center gap-3">
          <button
            title={t('text-next')}
            ref={sliderNextBtn}
            onClick={scrollToTheRight}
            className="flex items-center"
          >
            <ChevronRight className="h-[18px] w-[18px]" />
          </button>
          <CountrySelector />
        </div>
      </div>
    </div>
  );
}
