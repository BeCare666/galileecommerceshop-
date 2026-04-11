import ReviewForm from '@/components/review/review-form';
import { useModalAction } from '@/components/modal-views/context';
import ReviewCard from '@/components/review/review-card';
import Pagination from '@/components/ui/pagination';
import { useState } from 'react';
import Sorting from './sorting';
import { useRouter } from 'next/router';
import { useReviews } from '@/data/review';
import { useTranslation } from 'next-i18next';

const ProductReviews: React.FC<ProductReviewsProps> = ({ productId }) => {
  const { query } = useRouter();
  const { text, ...restQuery } = query;
  const [page, setPage] = useState(1);
  const { openModal } = useModalAction();
  const { t } = useTranslation('common');

  const { reviews, paginatorInfo } = useReviews({
    product_id: productId,
    limit: 5,
    page,
    ...restQuery,
  });

  const onPagination = (current: number) => setPage(current);
  console.log('reviews', reviews.length);
  localStorage.setItem('reviewsinstorage', reviews.length.toString());
  const handleOpenReviewForm = () => {
    openModal('REVIEW_RATING', {
      product_id: productId,
      shop_id: reviews?.[0]?.shop_id, // ou passer le shopId connu
      order_id: null, // si tu veux lier à une commande spécifique
      my_review: reviews?.find(r => r.user_id === 'currentUserId'), // si l’utilisateur a déjà review
    });
  };

  return (
    <div className="block">
      <div className="flex justify-between items-center border-b border-light-500 px-4 py-5 dark:border-dark-400">
        <h2 className="text-sm font-semibold text-dark dark:text-light">
          {t('text-product-reviews')} ({paginatorInfo?.total ?? 0})
        </h2>
        <div className="flex items-center gap-3">
          <Sorting />
          <button
            onClick={handleOpenReviewForm}
            className="rounded-xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-4 py-2 text-white text-sm font-semibold shadow-lg hover:scale-105 transition"
          >
            {t('text-write-review')}
          </button>
        </div>
      </div>

      {reviews?.length !== 0 ? (
        <div className="mt-5 space-y-4">
          {reviews.map(review => (
            <ReviewCard key={review.id} review={review} />
          ))}

          {paginatorInfo && (
            <div className="flex justify-center mt-5">
              <Pagination
                total={paginatorInfo.total}
                current={paginatorInfo.currentPage}
                pageSize={paginatorInfo.perPage}
                onChange={onPagination}
                showTitle={false}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center border-b border-light-500 px-5 py-16 dark:border-dark-400">
          <h3 className="text-lg font-semibold text-dark-600 dark:text-light-600">
            {t('text-no-reviews-found')}
          </h3>
        </div>
      )}
    </div>
  );
};

export default ProductReviews;
