/**
 * Validateur de filtres produits
 * Assure l'intégrité et cohérence des filtres
 */

export interface ProductFilters {
    corridor_id?: number;
    countries_id?: number;
    categories_id?: number;
    sous_categories_id?: number;
    sub_categories_id?: number;
    search?: string;
    is_origin?: boolean;
    shop_id?: number;
    limit?: number;
    offset?: number;
    orderBy?: string;
    sortedBy?: 'asc' | 'desc';
}

export interface ValidationResult {
    isValid: boolean;
    errors: string[];
    cleanedFilters: ProductFilters;
}

export class FilterValidator {
    private readonly ALLOWED_ORDER_BY = ['created_at', 'name', 'price', 'updated_at', 'ratings'];
    private readonly ALLOWED_SORT_BY = ['asc', 'desc'];
    private readonly MIN_LIMIT = 1;
    private readonly MAX_LIMIT = 100;
    private readonly DEFAULT_LIMIT = 20;
    private readonly DEFAULT_OFFSET = 0;

    /**
     * Valide et nettoie un ensemble de filtres
     */
    static validate(filters: any): ValidationResult {
        const instance = new FilterValidator();
        return instance.doValidate(filters);
    }

    /**
     * Valide un filtre spécifique
     */
    static validateFilter(key: string, value: any): boolean {
        const filters = { [key]: value };
        const result = FilterValidator.validate(filters);
        return result.errors.length === 0;
    }

    /**
     * Exécute la validation
     */
    private doValidate(filters: any): ValidationResult {
        const errors: string[] = [];
        const cleaned: ProductFilters = {};

        // Traiter chaque filtre
        this.validateNumberField(filters, 'corridor_id', cleaned, errors, 1);
        this.validateNumberField(filters, 'countries_id', cleaned, errors, 1);
        this.validateNumberField(filters, 'categories_id', cleaned, errors, 1);
        this.validateNumberField(filters, 'sous_categories_id', cleaned, errors, 1);
        this.validateNumberField(filters, 'sub_categories_id', cleaned, errors, 1);
        this.validateNumberField(filters, 'shop_id', cleaned, errors, 1);

        this.validateStringField(filters, 'search', cleaned, errors);
        this.validateBooleanField(filters, 'is_origin', cleaned, errors);

        this.validatePagination(filters, cleaned, errors);
        this.validateSort(filters, cleaned, errors);

        // Validation croisée: si aucun filtre principal, country_id devrait exister
        if (
            !cleaned.corridor_id &&
            !cleaned.categories_id &&
            !cleaned.sous_categories_id &&
            !cleaned.sub_categories_id &&
            !cleaned.shop_id &&
            !cleaned.search &&
            !cleaned.countries_id
        ) {
            errors.push('Au moins un filtre de base est requis (pays, catégorie, corridor, etc.)');
        }

        return {
            isValid: errors.length === 0,
            errors,
            cleanedFilters: cleaned,
        };
    }

    /**
     * Valide un champ numérique
     */
    private validateNumberField(
        filters: any,
        key: string,
        cleaned: ProductFilters,
        errors: string[],
        min: number = 0
    ): void {
        if (filters[key] === undefined || filters[key] === null) return;

        const value = Number(filters[key]);

        if (!isFinite(value)) {
            errors.push(`${key} doit être un nombre valide`);
            return;
        }

        if (value < min) {
            errors.push(`${key} doit être >= ${min}`);
            return;
        }

        (cleaned as any)[key] = value;
    }

    /**
     * Valide un champ chaîne de caractères
     */
    private validateStringField(
        filters: any,
        key: string,
        cleaned: ProductFilters,
        errors: string[],
        maxLength: number = 255
    ): void {
        if (filters[key] === undefined || filters[key] === null || filters[key] === '') {
            return;
        }

        const value = String(filters[key]).trim();

        if (value.length === 0) {
            return;
        }

        if (value.length > maxLength) {
            errors.push(`${key} ne peut pas dépasser ${maxLength} caractères`);
            return;
        }

        (cleaned as any)[key] = value;
    }

    /**
     * Valide un champ booléen
     */
    private validateBooleanField(
        filters: any,
        key: string,
        cleaned: ProductFilters,
        errors: string[]
    ): void {
        if (filters[key] === undefined || filters[key] === null) return;

        let value: boolean;

        if (typeof filters[key] === 'boolean') {
            value = filters[key];
        } else if (filters[key] === 'true' || filters[key] === 1 || filters[key] === '1') {
            value = true;
        } else if (filters[key] === 'false' || filters[key] === 0 || filters[key] === '0') {
            value = false;
        } else {
            errors.push(`${key} doit être un booléen valide`);
            return;
        }

        (cleaned as any)[key] = value;
    }

    /**
     * Valide la pagination
     */
    private validatePagination(
        filters: any,
        cleaned: ProductFilters,
        errors: string[]
    ): void {
        // Limit
        if (filters.limit !== undefined && filters.limit !== null) {
            const limit = Number(filters.limit);

            if (!isFinite(limit)) {
                errors.push('limit doit être un nombre valide');
            } else if (limit < this.MIN_LIMIT) {
                cleaned.limit = this.MIN_LIMIT;
            } else if (limit > this.MAX_LIMIT) {
                cleaned.limit = this.MAX_LIMIT;
            } else {
                cleaned.limit = limit;
            }
        } else {
            cleaned.limit = this.DEFAULT_LIMIT;
        }

        // Offset
        if (filters.offset !== undefined && filters.offset !== null) {
            const offset = Number(filters.offset);

            if (!isFinite(offset)) {
                errors.push('offset doit être un nombre valide');
            } else if (offset < 0) {
                cleaned.offset = this.DEFAULT_OFFSET;
            } else {
                cleaned.offset = offset;
            }
        } else {
            cleaned.offset = this.DEFAULT_OFFSET;
        }
    }

    /**
     * Valide le tri
     */
    private validateSort(
        filters: any,
        cleaned: ProductFilters,
        errors: string[]
    ): void {
        if (filters.orderBy !== undefined && filters.orderBy !== null) {
            const orderBy = String(filters.orderBy).toLowerCase();

            if (this.ALLOWED_ORDER_BY.includes(orderBy)) {
                cleaned.orderBy = orderBy;
            } else {
                cleaned.orderBy = 'created_at';
            }
        } else {
            cleaned.orderBy = 'created_at';
        }

        if (filters.sortedBy !== undefined && filters.sortedBy !== null) {
            const sortedBy = String(filters.sortedBy).toLowerCase();

            if (this.ALLOWED_SORT_BY.includes(sortedBy)) {
                cleaned.sortedBy = sortedBy as 'asc' | 'desc';
            } else {
                cleaned.sortedBy = 'desc';
            }
        } else {
            cleaned.sortedBy = 'desc';
        }
    }

    /**
     * Supprime tous les filtres vides/undefined
     */
    static sanitize(filters: ProductFilters): ProductFilters {
        const sanitized: ProductFilters = {};

        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                (sanitized as any)[key] = value;
            }
        });

        return sanitized;
    }

    /**
     * Compare deux sets de filtres
     */
    static isEqual(a: ProductFilters, b: ProductFilters): boolean {
        const aClean = FilterValidator.sanitize(a);
        const bClean = FilterValidator.sanitize(b);

        return JSON.stringify(aClean) === JSON.stringify(bClean);
    }
}
