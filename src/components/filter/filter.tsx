'use client';

import CountrySelector from '@/components/country-selector/country-selector';
import CategoryMegaMenu from '@/components/category-ega-enu/categorydrawer';
import { Search, Filter, X, Check } from 'lucide-react';
import { useRouter } from 'next/router';
import { useState, useEffect, useRef, useCallback } from 'react';

interface ProductsUltraPremiumFilterProps { }

export default function ProductsUltraPremiumFilter({ }: ProductsUltraPremiumFilterProps) {
  const router = useRouter();

  const [search, setSearch] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync search state avec query une seule fois
  useEffect(() => {
    if (!router.isReady) return;
    const qs = router.query.search;
    if (typeof qs === 'string') setSearch(qs);
    else setSearch('');
  }, [router.isReady, router.query.search]);

  // updateQuery: merge avec query existante, ne jamais écraser
  const updateQuery = useCallback((patch: Record<string, any>) => {
    const newQuery = { ...router.query };

    for (const key in patch) {
      if (patch[key] === undefined || patch[key] === null || patch[key] === '') {
        delete newQuery[key];
      } else {
        newQuery[key] = patch[key];
      }
    }

    router.push(
      {
        pathname: router.pathname,
        query: newQuery,
      },
      undefined,
      { shallow: true }
    );
  }, [router]);

  // Search avec debounce
  const handleSearchChange = (value: string) => {
    setSearch(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      updateQuery({ search: value || undefined });
    }, 350);
  };

  // Reset filters
  const resetFilters = () => {
    router.push('/products/forcategory', undefined, { shallow: true });
  };

  const originActive = router.query.is_origin === 'true';

  // CountrySelector callback
  const handleCountrySelect = (countryId: number) => {
    updateQuery({ countries_id: countryId });
  };

  // CategoryMegaMenu callback
  const handleCategoryFilter = (filters: {
    categoryId?: number;
    subCategoryIds?: number[];
    subSubCategoryIds?: number[];
  }) => {
    const patch: Record<string, any> = {};
    if (filters.categoryId) patch.categories_id = filters.categoryId;
    else patch.categories_id = undefined;

    if (filters.subCategoryIds && filters.subCategoryIds.length)
      patch.sous_categories_id = filters.subCategoryIds.join(',');
    else patch.sous_categories_id = undefined;

    if (filters.subSubCategoryIds && filters.subSubCategoryIds.length)
      patch.sub_categories_id = filters.subSubCategoryIds.join(',');
    else patch.sub_categories_id = undefined;

    updateQuery(patch);
  };

  return (
    <div className="m-5
    ">
      <div className="
        max-w-7xl mx-auto
        rounded-3xl
        bg-gradient-to-br from-white to-gray-50
        dark:from-neutral-900 dark:to-neutral-950
        border border-gray-200 dark:border-neutral-800
        shadow-[0_10px_40px_rgba(0,0,0,0.06)]
        p-4 md:p-6
      ">
        <div className="flex flex-col xl:flex-row xl:items-center gap-4 xl:gap-6">

          {/* SEARCH */}
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
            <input
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') updateQuery({ search: search || undefined });
              }}
              placeholder="Rechercher un produit premium…"
              className="
                w-full pl-12 pr-5 py-3
                rounded-2xl
                border border-gray-300 dark:border-neutral-700
                bg-white dark:bg-neutral-900
                text-gray-900 dark:text-gray-100
                placeholder:text-gray-400
                outline-none
                focus:ring-2 focus:ring-blue-600/40
                focus:border-blue-500
                transition-all
              "
            />
          </div>

          {/* Selectors */}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="
              rounded-2xl border border-gray-200 dark:border-neutral-800
              bg-white dark:bg-neutral-900
              px-3 py-2 flex items-center gap-2
            ">
              <span>Pavillons</span>
              <CountrySelector onSelect={handleCountrySelect} />
            </div>

            <div className="
              rounded-2xl border border-gray-200 dark:border-neutral-800
              bg-white dark:bg-neutral-900
              px-3 py-2
            ">
              <CategoryMegaMenu onFilterApply={handleCategoryFilter} />
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => updateQuery({ is_origin: originActive ? undefined : true })}
              className={`
                px-5 py-3 rounded-2xl font-semibold
                flex items-center gap-2 border transition
                ${originActive
                  ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white border-green-600'
                  : 'bg-white dark:bg-neutral-900 border-gray-300 dark:border-neutral-700 hover:border-gray-400'}
              `}
            >
              <Check className="w-4 h-4" />
              Origine
            </button>

            <button
              onClick={() => setFiltersOpen(v => !v)}
              className="
                px-4 py-3 rounded-2xl
                border border-gray-300 dark:border-neutral-700
                bg-white dark:bg-neutral-900
              "
            >
              <Filter className="w-5 h-5" />
            </button>

            <button
              onClick={resetFilters}
              className="
                px-5 py-3 rounded-2xl
                border border-gray-300 dark:border-neutral-700
                bg-white dark:bg-neutral-900
                hover:border-red-400 hover:text-red-600
                flex items-center gap-2 font-semibold
              "
            >
              <X className="w-4 h-4" />
              Reset
            </button>
          </div>
        </div>

        {/* Drawer */}
        {filtersOpen && (
          <div className="
            mt-5 rounded-2xl
            border border-gray-200 dark:border-neutral-800
            bg-gradient-to-br from-gray-50 to-white
            dark:from-neutral-900 dark:to-neutral-950
            p-6
          ">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Filtres avancés premium — prix, score qualité, labels, tags…
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
