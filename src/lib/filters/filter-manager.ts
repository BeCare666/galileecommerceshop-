import { ProductFilters, FilterValidator } from './filter-validator';

/**
 * Gestionnaire de filtres avec persistance localStorage
 * Gère le stockage et la récupération des préférences de filtres
 */
export class FilterManager {
    private static readonly STORAGE_KEY = 'galileee_product_filters_v1';
    private static readonly SESSION_KEY = 'galileee_product_session_filters';

    /**
     * Récupère les filtres sauvegardés depuis localStorage
     */
    static getSavedFilters(): ProductFilters | null {
        if (typeof window === 'undefined') return null;

        try {
            const saved = localStorage.getItem(this.STORAGE_KEY);
            if (!saved) return null;

            const parsed = JSON.parse(saved);
            const validation = FilterValidator.validate(parsed);

            if (!validation.isValid) {
                console.warn('❌ Filtres sauvegardés invalides:', validation.errors);
                this.clearSavedFilters();
                return null;
            }

            console.log('✅ Filtres restaurés depuis localStorage:', parsed);
            return validation.cleanedFilters;
        } catch (error) {
            console.error('❌ Erreur lors de la restauration des filtres:', error);
            this.clearSavedFilters();
            return null;
        }
    }

    /**
     * Sauvegarde les filtres dans localStorage
     */
    static saveFilters(filters: ProductFilters): void {
        if (typeof window === 'undefined') return;

        try {
            const sanitized = FilterValidator.sanitize(filters);
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(sanitized));
            console.log('✅ Filtres sauvegardés:', sanitized);
        } catch (error) {
            console.error('❌ Erreur lors de la sauvegarde des filtres:', error);
        }
    }

    /**
     * Efface les filtres sauvegardés
     */
    static clearSavedFilters(): void {
        if (typeof window === 'undefined') return;
        try {
            localStorage.removeItem(this.STORAGE_KEY);
            console.log('✅ Filtres sauvegardés effacés');
        } catch (error) {
            console.error('❌ Erreur lors de l\'effacement des filtres:', error);
        }
    }

    /**
     * Récupère les filtres de session (filtres temporaires pendant une session)
     */
    static getSessionFilters(): ProductFilters | null {
        if (typeof window === 'undefined') return null;

        try {
            const session = sessionStorage.getItem(this.SESSION_KEY);
            if (!session) return null;

            const parsed = JSON.parse(session);
            return FilterValidator.sanitize(parsed);
        } catch (error) {
            console.error('❌ Erreur lors de la récupération des filtres de session:', error);
            return null;
        }
    }

    /**
     * Sauvegarde les filtres de session
     */
    static setSessionFilters(filters: ProductFilters): void {
        if (typeof window === 'undefined') return;

        try {
            const sanitized = FilterValidator.sanitize(filters);
            sessionStorage.setItem(this.SESSION_KEY, JSON.stringify(sanitized));
        } catch (error) {
            console.error('❌ Erreur lors de la sauvegarde des filtres de session:', error);
        }
    }

    /**
     * Efface les filtres de session
     */
    static clearSessionFilters(): void {
        if (typeof window === 'undefined') return;

        try {
            sessionStorage.removeItem(this.SESSION_KEY);
        } catch (error) {
            console.error('❌ Erreur lors de l\'effacement des filtres de session:', error);
        }
    }

    /**
     * Fusionne les filtres avec priorité: URL > Session > Saved > Default
     */
    static mergeFilters(
        urlFilters: ProductFilters | null,
        defaultFilters: ProductFilters = {}
    ): ProductFilters {
        const sessionFilters = this.getSessionFilters();
        const savedFilters = this.getSavedFilters();

        // Priorité: URL > Session > Saved > Default
        const merged = {
            ...defaultFilters,
            ...savedFilters,
            ...sessionFilters,
            ...urlFilters,
        };

        const validation = FilterValidator.validate(merged);

        if (!validation.isValid) {
            console.warn('⚠️ Problèmes de validation lors de la fusion:', validation.errors);
        }

        return validation.cleanedFilters;
    }

    /**
     * Détecte si un filtre a changé
     */
    static hasFiltersChanged(a: ProductFilters, b: ProductFilters): boolean {
        return !FilterValidator.isEqual(a, b);
    }

    /**
     * Exporte un URL-safe query string
     */
    static toQueryString(filters: ProductFilters): string {
        const sanitized = FilterValidator.sanitize(filters);
        const params = new URLSearchParams();

        Object.entries(sanitized).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                params.append(key, String(value));
            }
        });

        return params.toString();
    }

    /**
     * Importe depuis un URL query string
     */
    static fromQueryString(queryString: string): ProductFilters {
        const params = new URLSearchParams(queryString);
        const filters: ProductFilters = {};

        params.forEach((value, key) => {
            (filters as any)[key] = value;
        });

        const validation = FilterValidator.validate(filters);
        return validation.cleanedFilters;
    }

    /**
     * Récupère un filtre spécifique
     */
    static getFilter(key: keyof ProductFilters, defaultValue?: any): any {
        const saved = this.getSavedFilters();
        return saved?.[key] ?? defaultValue;
    }

    /**
     * Met à jour un filtre spécifique
     */
    static updateFilter(key: keyof ProductFilters, value: any): ProductFilters {
        const current = this.getSavedFilters() || {};
        const updated = { ...current, [key]: value };
        const sanitized = FilterValidator.sanitize(updated);

        this.saveFilters(sanitized);
        return sanitized;
    }

    /**
     * Affiche un diagnostic des filtres
     */
    static diagnostic(): void {
        console.group('📊 Diagnostic FilterManager');
        console.log('📁 Filtres localStorage:', this.getSavedFilters());
        console.log('📋 Filtres session:', this.getSessionFilters());
        console.groupEnd();
    }
}
