import { useState, useEffect, useRef, useCallback } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import axios from 'axios';
import Card from '@/components/product/card';
import Layout from '@/layouts/_layout';
import type { GetStaticProps } from 'next';
import CategoryFilter from '@/components/product/category-filter';
import Seo from '@/layouts/_seo';
import routes from '@/config/routes';
import { getAuthToken, removeAuthToken } from '../../data/client/token.utils';
const token = getAuthToken(); // 🔁 Remplace par ton token
type Product = {
  id: number;
  slug: string;
  name: string;
  description?: string;
  price: number;
  sale_price?: number;
  categories?: string[];
  image?: { url: string };
  stock?: number;
  rating?: number;
  shop?: { id: number; slug: string; name: string };
};

const LIMIT = 20;

export default function ProductsPage() {
  const router = useRouter();

  const {
    corridor_id,
    countries_id,
    categories_id,
    sous_categories_id,
    sub_categories_id,
    search,
  } = router.query;

  const [products, setProducts] = useState<Product[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isFetchingRef = useRef(false);

  const fetchProducts = useCallback(async () => {
    if (isFetchingRef.current || !hasMore) return;

    setLoading(true);
    setError(null);
    isFetchingRef.current = true;

    try {
      const params: any = {
        limit: LIMIT,
        offset,
      };

      if (corridor_id) params.corridor_id = corridor_id;
      if (countries_id) params.countries_id = countries_id;
      if (categories_id) params.categories_id = categories_id;
      if (sous_categories_id) params.sous_categories_id = sous_categories_id;
      if (sub_categories_id) params.sub_categories_id = sub_categories_id;
      if (search) params.search = search;

      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/products/corridor`,
        {
          params,
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
          },
        },
      );

      const fetchedProducts: Product[] = data.data ?? [];
      setProducts((prev) =>
        offset === 0 ? fetchedProducts : [...prev, ...fetchedProducts],
      );
      setHasMore(fetchedProducts.length === LIMIT);
      setOffset((prev) => prev + fetchedProducts.length);
    } catch (e) {
      console.error(e);
      setError('Error loading products.');
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
  }, [
    corridor_id,
    countries_id,
    categories_id,
    sous_categories_id,
    sub_categories_id,
    search,
    offset,
    hasMore,
  ]);

  // Réinitialiser si un filtre change
  useEffect(() => {
    setProducts([]);
    setOffset(0);
    setHasMore(true);
  }, [
    corridor_id,
    countries_id,
    categories_id,
    sous_categories_id,
    sub_categories_id,
    search,
  ]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (loading || !hasMore || !sentinelRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchProducts();
        }
      },
      { rootMargin: '200px' },
    );

    observer.observe(sentinelRef.current);

    return () => {
      if (sentinelRef.current) observer.unobserve(sentinelRef.current);
    };
  }, [loading, hasMore, fetchProducts]);

  return (
    <>
      <Seo
        title="Products Category"
        description="Explore our products by category."
        url={routes.productscategory}
      />
      <CategoryFilter />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product: any) => (
          <Card key={product.id} product={product} />
        ))}
      </div>

      <div ref={sentinelRef} />

      {loading && (
        <div className="flex flex-col items-center justify-center my-8 space-y-3 text-blue-600">
          <svg
            className="animate-spin h-12 w-12 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-label="Loading spinner"
            role="img"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
          <p className="text-lg font-semibold">Loading...</p>
        </div>
      )}

      {error && (
        <div className="flex flex-col items-center justify-center my-8 space-y-3 text-red-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-label="Error icon"
            role="img"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <p className="text-lg font-semibold">{error}</p>
        </div>
      )}

      {!hasMore && !loading && products.length > 0 && (
        <div className="flex flex-col items-center justify-center my-8 space-y-3 text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-label="No more products icon"
            role="img"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <p className="text-lg font-semibold">No more products.</p>
        </div>
      )}

      {!loading && products.length === 0 && !error && (
        <div className="flex flex-col items-center justify-center my-8 space-y-3 text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-label="No products found icon"
            role="img"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 16l-4-4m0 0l4-4m-4 4h12"
            />
            <circle
              cx="11"
              cy="11"
              r="8"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
          <p className="text-lg font-semibold">
            No products found with these filters.
          </p>
        </div>
      )}
    </>
  );
}

ProductsPage.authorization = true;
ProductsPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common'])),
    },
  };
};
