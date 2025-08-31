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
    <button
      onClick={onClick}
      className={cn(
        'button-sawtooth h-[34px] shrink-0 px-3.5 py-1.5 text-sm font-medium rounded-[6px] border flex items-center gap-2 transition',
        {
          'bg-pink-400 text-white': isActive,
          'bg-white text-gray-700 border border-pink-200 hover:bg-pink-50':
            !isActive,
        },
      )}
    >
      {/* Icône circulaire */}
      <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
        <Image
          src={categoryIcon || 'https://img.icons8.com/fluency/48/filter.png'} // <--- ici c'est la variable seule
          alt={categoryName}
          width={24}
          height={24}
          className="object-cover"
        />
      </div>

      <span className="truncate max-w-[140px]">{categoryName}</span>
      {showCaret ? (
        <span aria-hidden className="ml-1 text-xs">
          ▾
        </span>
      ) : null}
    </button>
  );
}

export default function CategoryFilterWithPanel({
  defaultActivePath = '',
}: {
  defaultActivePath?: string;
}) {
  const router = useRouter();
  const { categories } = useCategories({ limit: 100 });
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
            'ngrok-skip-browser-warning': 'true',
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
            'ngrok-skip-browser-warning': 'true',
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

  return (
    <div ref={containerRef} className="relative">
      <div className="app-category-filter-bar sticky top-16  flex min-h-[64px] w-full overflow-visible border-b bg-light-100 px-2 py-4">
        <CategoryItem
          categoryName={t('text-category-all')}
          isActive={!routerActiveCategory && !selectedCategory}
          onClick={handleCategoryAllClick}
          //onMouseEnter={() => setOpenCategoryPanelAllCategory(1)}
          //onMouseLeave={() => setOpenCategoryPanelAllCategory(null)}
        />
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

      {/* PANEL: responsive, centered below the bar, max width + scroll */}
      {openCategoryPanel && (
        <div
          className="absolute left-1/2 transform -translate-x-1/2 mt-2 z-40 w-[95%] md:w-[92%] lg:w-[80%] xl:w-[70%] max-w-[1100px] bg-white border shadow-lg rounded-md p-4"
          role="dialog"
          aria-label="Category panel"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Sub categories column */}
            <div className="flex-1 min-w-[180px] max-h-[320px] overflow-auto">
              <h4 className="mb-2 font-medium">Les sous categories</h4>
              {!subCategories && (
                <div className="text-sm text-gray-500">Loading…</div>
              )}
              {subCategories && subCategories.length === 0 && (
                <div className="text-sm text-gray-500">
                  Pas de sous categories
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
                            {/* checkbox-like square */}
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

            {/* Sub-sub column */}
            <div className="flex-1 min-w-[180px] max-h-[320px] overflow-auto">
              <h4 className="mb-2 font-medium">Les sous-sous-catégorieories</h4>
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
                          {selected ? <CheckIcon className="h-4 w-4" /> : null}
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
                  className="px-4 py-2 rounded border w-[100%]"
                >
                  Fermer
                </button>
                <button
                  onClick={applyFilter}
                  className="px-4 py-2 rounded bg-pink-500 text-white w-[100%]"
                >
                  Appliquer
                </button>
              </div>
              <div className="mt-4 text-sm text-gray-600 hidden">
                <div>Catégorie: {selectedCategory ?? '—'}</div>
                <div>
                  Sous-catégories:{' '}
                  {Array.from(selectedSubCategories).join(', ') || '—'}
                </div>
                <div>
                  Sous-sous-catégories:{' '}
                  {Array.from(selectedSubSubCategories).join(', ') || '—'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
