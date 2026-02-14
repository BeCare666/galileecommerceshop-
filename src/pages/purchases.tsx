import { useState, useEffect } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import DashboardLayout from '@/layouts/_dashboard';
import Image from '@/components/ui/image';
import Button from '@/components/ui/button';
import placeholder from '@/assets/images/placeholders/product.svg';
import { fadeInBottom } from '@/lib/framer-motion/fade-in-bottom';
import { motion } from 'framer-motion';
import AnchorLink from '@/components/ui/links/anchor-link';
import { DownloadIcon } from '@/components/icons/download-icon';
import { EyeIcon } from 'lucide-react';
import CartEmpty from '@/components/cart/cart-empty';
import routes from '@/config/routes';
import PayNowButton from '@/components/payment/pay-now-button';
import { getAuthToken } from '@/data/client/token.utils';
import OrderChildrenModal from '@/components/modal-views/OrderChildrenModal';
import { PaymentStatus } from '@/types';
import dayjs from 'dayjs';

const LIMIT = 10;

const Purchases = () => {
  const { t } = useTranslation('common');
  const token = getAuthToken();

  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalChildren, setModalChildren] = useState<any[]>([]);
  const [modalOrderTracking, setModalOrderTracking] = useState('');

  // Réinitialiser when token changes
  useEffect(() => {
    setOrders([]);
    setPage(1);
    setLoading(true);
  }, [token]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const API_URL = process.env.NEXT_PUBLIC_REST_API_ENDPOINT;
        if (!API_URL) throw new Error('API endpoint manquant');

        const res = await fetch(
          `${API_URL}/orders/my-orders?limit=${LIMIT}&page=${page}&orderBy=created_at&sortedBy=desc`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          const text = await res.text();
          throw new Error(text);
        }

        const data = await res.json();
        console.log('data orders:', data);

        // Si page = 1, remplacer; sinon ajouter (pagination)
        setOrders(page === 1 ? data.data : (prev) => [...prev, ...data.data]);
        setHasNextPage(Boolean(data.next_page_url));
      } catch (e) {
        console.error('Erreur fetching orders:', e);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [page, token]);

  const loadMore = () => {
    if (hasNextPage) setPage((prev) => prev + 1);
  };

  const openChildrenModal = (children: any[], tracking_number: string) => {
    setModalChildren(children);
    setModalOrderTracking(tracking_number);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalChildren([]);
    setModalOrderTracking('');
  };

  const OrderedItem = ({ order }: { order: any }) => {
    // Utiliser le premier enfant comme produit principal
    const mainProduct = order.children?.[0];

    const getStatus =
      order.payment_status === PaymentStatus.SUCCESS ||
      order.payment_status === PaymentStatus.WALLET;

    return (
      <div className="flex items-start gap-4 border-b border-light-400 py-4 last:border-b-0 dark:border-dark-400 sm:gap-5">
        <AnchorLink href={routes.productUrl(mainProduct?.slug)}>
          <div className="relative aspect-[5/3.4] w-28 flex-shrink-0 border border-light-300 dark:border-0 sm:w-32 md:w-36">
            <Image
              alt={mainProduct?.name || 'product'}
              fill
              quality={100}
              src={mainProduct?.image?.url ?? placeholder}
              className="bg-light-400 object-cover dark:bg-dark-400"
              sizes="(max-width: 768px) 100vw"
            />
          </div>
        </AnchorLink>

        <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between md:gap-0">
          <div className="border-b border-light-400 pb-3 dark:border-dark-600 sm:border-b-0 sm:pb-0">
            <p className="text-gray-500 dark:text-gray-400">
              {t('text-purchased-on')}{' '}
              {dayjs(order.created_at).format('MMM D, YYYY')}
            </p>
            <h3
              className="my-1.5 font-medium text-dark dark:text-light sm:mb-3"
              title={mainProduct?.name}
            >
              <AnchorLink
                href={routes.productUrl(mainProduct?.slug)}
                className="transition-colors hover:text-brand"
              >
                {mainProduct?.name}
              </AnchorLink>
            </h3>
            <div className="flex items-center gap-3 absolute right-0 top-14 mt-2 mr-2">
              {getStatus ? (
                <>

                  <Button
                    variant="outline"
                    onClick={() =>
                      openChildrenModal(order.children, order.tracking_number)
                    }
                  >
                    <EyeIcon className="w-4 h-4" />
                  </Button>
                </>
              ) : (
                <PayNowButton
                  tracking_number={order.tracking_number}
                  order={order}
                  variant="card"
                />
              )}
            </div>
          </div>


        </div>
      </div>
    );
  };

  return (
    <motion.div
      variants={fadeInBottom()}
      className="flex min-h-full flex-grow flex-col"
    >
      <h1 className="mb-3 text-15px font-medium text-dark dark:text-light">
        {t('text-my-purchase-list')} <span>({orders.length})</span>
      </h1>

      {loading && orders.length === 0 && <p>Chargement des commandes...</p>}

      {!loading && orders.length === 0 && (
        <CartEmpty
          className="my-auto"
          description={t('text-product-purchase-message')}
        />
      )}

      {orders.map((order) => (
        <OrderedItem key={order.id} order={order} />
      ))}

      {hasNextPage && (
        <div className="mt-10 grid place-content-center">
          <Button onClick={loadMore}>{t('text-loadmore')}</Button>
        </div>
      )}

      <OrderChildrenModal
        isOpen={isModalOpen}
        onClose={closeModal}
        orderChildren={modalChildren}
        orderId={modalChildren[0]?.id ?? 0}
        orderTracking={modalOrderTracking}
      />
    </motion.div>
  );
};

Purchases.authorization = true;
Purchases.getLayout = function getLayout(page: React.ReactNode) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale!, ['common'])),
  },
  revalidate: 60,
});

export default Purchases;
