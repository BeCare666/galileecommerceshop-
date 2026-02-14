'use client';

import { useRouter } from 'next/router';
import { useState, useEffect, useCallback, useRef } from 'react';
import { ProductFilters, FilterValidator } from '@/lib/filters/filter-validator';
import { FilterManager } from '@/lib/filters/filter-manager';

interface UseProductFiltersOptions {
    persistToLocalStorage?: boolean;
    autoDetectCountry?: boolean;
    onFiltersChange?: (filters: ProductFilters) => void;
}

interface UseProductFiltersReturn {
    filters: ProductFilters;
    setFilters: (filters: ProductFilters) => void;
    updateFilter: (key: keyof ProductFilters, value: any) => void;
    resetFilters: () => void;
    isReady: boolean;
    isValid: boolean;
    errors: string[];
}

/**
 * Hook personnalisé pour gérer les filtres produits
 * Gère les URL, localStorage, validation et détection de pays
 */
export function useProductFilters(
    options: UseProductFiltersOptions = {}
): UseProductFiltersReturn {
    const {
        persistToLocalStorage = true,
        autoDetectCountry = true,
        onFiltersChange,
    } = options;

    const router = useRouter();
    const [filters, setFiltersState] = useState<ProductFilters>({});
    const [isReady, setIsReady] = useState(false);
    const [isValid, setIsValid] = useState(true);
    const [errors, setErrors] = useState<string[]>([]);
    const previousFiltersRef = useRef<ProductFilters>();
    const hasInitializedRef = useRef(false);

    /**
     * Initialise les filtres depuis l'URL et localStorage
     */
    useEffect(() => {
        if (!router.isReady || hasInitializedRef.current) return;

        hasInitializedRef.current = true;

        // Extraire les filtres de l'URL
        const urlFilters: ProductFilters = {
            corridor_id: router.query.corridor_id
                ? Number(router.query.corridor_id)
                : undefined,
            countries_id: router.query.countries_id
                ? Number(router.query.countries_id)
                : undefined,
            categories_id: router.query.categories_id
                ? Number(router.query.categories_id)
                : undefined,
            sous_categories_id: router.query.sous_categories_id
                ? Number(router.query.sous_categories_id)
                : undefined,
            sub_categories_id: router.query.sub_categories_id
                ? Number(router.query.sub_categories_id)
                : undefined,
            search: router.query.search as string,
            is_origin:
                router.query.is_origin === 'true' || router.query.is_origin === '1'
                    ? true
                    : undefined,
            shop_id: router.query.shop_id ? Number(router.query.shop_id) : undefined,
            limit: router.query.limit ? Number(router.query.limit) : undefined,
            offset: router.query.offset ? Number(router.query.offset) : undefined,
            orderBy: router.query.orderBy as string,
            sortedBy: (router.query.sortedBy as 'asc' | 'desc') || undefined,
        };

        // Valider les filtres URL
        const validation = FilterValidator.validate(urlFilters);
        let mergedFilters = validation.cleanedFilters;

        // Si persistToLocalStorage, récupérer et fusionner avec les filtres sauvegardés
        if (persistToLocalStorage) {
            mergedFilters = FilterManager.mergeFilters(
                urlFilters && Object.keys(urlFilters).length > 0 ? urlFilters : null,
                {}
            );
        }

        // Détection automatique du pays si activée et pas de countries_id
        if (autoDetectCountry && !mergedFilters.countries_id) {
            detectCountryAndSetFilters(mergedFilters);
        } else {
            setFiltersState(mergedFilters);
            setIsValid(validation.isValid);
            setErrors(validation.errors);
            setIsReady(true);
        }
    }, [router.isReady, persistToLocalStorage, autoDetectCountry]);

    /**
     * Détecte le pays de l'utilisateur
     */
    const detectCountryAndSetFilters = useCallback(async (baseFilters: ProductFilters) => {
        try {
            const response = await fetch('https://ipapi.co/json/');
            const data = await response.json();
            const userCountryCode = data?.country_code;

            if (userCountryCode) {
                // Vous pouvez mapper le code pays à l'ID pays ici si disponible
                console.log('🌍 Pays détecté:', userCountryCode);
            }
        } catch (error) {
            console.error('❌ Erreur détection pays:', error);
        } finally {
            setFiltersState(baseFilters);
            setIsReady(true);
        }
    }, []);

    /**
     * Mise à jour des filtres avec validation
     */
    const setFilters = useCallback((newFilters: ProductFilters) => {
        const validation = FilterValidator.validate(newFilters);
        const cleanedFilters = validation.cleanedFilters;

        setFiltersState(cleanedFilters);
        setIsValid(validation.isValid);
        setErrors(validation.errors);

        // Trigger callback si les filtres ont changé
        if (onFiltersChange && !FilterValidator.isEqual(previousFiltersRef.current || {}, cleanedFilters)) {
            onFiltersChange(cleanedFilters);
        }

        // Persister
        if (persistToLocalStorage) {
            FilterManager.saveFilters(cleanedFilters);
        }

        // Mettre à jour l'URL
        updateUrl(cleanedFilters);

        previousFiltersRef.current = cleanedFilters;
    }, [persistToLocalStorage, onFiltersChange]);

    /**
     * Met à jour un filtre individuel
     */
    const updateFilter = useCallback(
        (key: keyof ProductFilters, value: any) => {
            const newFilters = { ...filters, [key]: value };

            // Supprimer les champs vides
            if (value === undefined || value === null || value === '') {
                delete newFilters[key];
            }

            setFilters(newFilters);
        },
        [filters, setFilters]
    );

    /**
     * Réinitialise les filtres
     */
    const resetFilters = useCallback(() => {
        const defaultFilters: ProductFilters = {
            limit: 20,
            offset: 0,
            orderBy: 'created_at',
            sortedBy: 'desc',
        };

        setFilters(defaultFilters);

        if (persistToLocalStorage) {
            FilterManager.clearSavedFilters();
        }

        router.push('/products/forcategory', undefined, { shallow: true });
    }, [persistToLocalStorage, setFilters, router]);

    /**
     * Met à jour l'URL sans rechargement
     */
    const updateUrl = useCallback(
        (filters: ProductFilters) => {
            const sanitized = FilterValidator.sanitize(filters);
            const queryString = FilterManager.toQueryString(sanitized);

            router.push(
                {
                    pathname: router.pathname,
                    query: sanitized,
                },
                undefined,
                { shallow: true }
            );
        },
        [router]
    );

    return {
        filters,
        setFilters,
        updateFilter,
        resetFilters,
        isReady,
        isValid,
        errors,
    };
}
