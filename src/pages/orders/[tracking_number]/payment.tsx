import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import dayjs from 'dayjs';
import { GetServerSideProps } from 'next';
import isEmpty from 'lodash/isEmpty';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import ReactConfetti from 'react-confetti';
import type { NextPageWithLayout } from '@/types';
import GeneralLayout from '@/layouts/_general-layout';
import { useWindowSize } from '@/lib/hooks/use-window-size';
import { useCart } from '@/components/cart/lib/cart.context';
import { useTranslation } from 'next-i18next';
import { dehydrate, QueryClient } from 'react-query';
import { API_ENDPOINTS } from '@/data/client/endpoints';
import client from '@/data/client';
import type { SettingsQueryOptions } from '@/types';
import usePrice from '@/lib/hooks/use-price';
import OrderViewHeader from '@/components/orders/order-view-header';
import OrderStatusProgressBox from '@/components/orders/order-status-progress-box';
import { OrderStatus, PaymentStatus } from '@/types';
import { formatString } from '@/lib/format-string';
import { OrderItems } from '@/components/orders/order-items';
import { CheckMark } from '@/components/icons/checkmark';
import SuborderItems from '@/components/orders/suborder-items';
import { useOrder } from '@/data/order';
import { useModalAction } from '@/components/modal-views/context';
import { PageLoader } from '@/components/ui/loader/spinner/spinner';
import { Order } from '@/types';
import ErrorMessage from '@/components/ui/error-message';
import { getOrderPaymentSummery } from '@/lib/get-order-payment-summery';

type Props = {
  title: string;
  details: string | undefined;
  className?: string;
};

const Card = ({ title, details, className }: Props) => {
  return (
    <div className="flex min-h-[6.5rem] items-center rounded border border-gray-200 px-6 py-4 dark:border-[#434343] dark:bg-dark-200">
      <div>
        <h3 className="mb-2 text-xs font-normal dark:text-white/60">
          {title} :{' '}
        </h3>
        <p className="text-dark-200 dark:text-white">{details}</p>
      </div>
    </div>
  );
};

const Listitem = ({ title, details }: Props) => {
  return (
    <p className="text-body-dark mt-5 flex items-center text-xs">
      <strong className="w-5/12 sm:w-4/12">{title}</strong>
      <span>:</span>
      <span className="w-7/12 ltr:pl-4 rtl:pr-4 dark:text-white sm:w-8/12 ">
        {details}
      </span>
    </p>
  );
};
interface OrderViewProps {
  order: Order | undefined;
  loadingStatus?: boolean;
}

const OrderView = ({ order, loadingStatus }: OrderViewProps) => {
  const { t } = useTranslation('common');
  const { width, height } = useWindowSize();
  const { resetCart } = useCart();
  useEffect(() => {
    resetCart();
  }, []);

  const { price: total } = usePrice({ amount: order?.paid_total! });
  const { price: wallet_total } = usePrice({
    amount: order?.wallet_point?.amount!,
  });
  const { price: sub_total } = usePrice({ amount: order?.amount! });
  const { price: tax } = usePrice({ amount: order?.sales_tax ?? 0 });

  const { is_payment_gateway_use, is_full_paid, amount_due, gateway_payment } =
    getOrderPaymentSummery(order!);

  const { price: amountDue } = usePrice({ amount: amount_due });
  const { price: gatewayPayment } = usePrice({ amount: gateway_payment });

  return (
    <div className="p-6 sm:p-10 bg-white dark:bg-dark-900 min-h-screen">
      <div className="mx-auto w-full max-w-screen-lg">
        <div className="relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
          {/* Header */}
          <OrderViewHeader
            order={order}
            buttonSize="small"
            loading={loadingStatus}
          />

          {/* Order Info */}
          <div className="bg-white dark:bg-dark-800 px-6 py-10 lg:px-10">
            {/* Order Summary Cards */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-10">
              <Card
                title={t('text-order-number')}
                details={order?.tracking_number}
                className="bg-pink-50 text-pink-700 rounded-lg border border-pink-100"
              />
              <Card
                title={t('text-date')}
                details={dayjs(order?.created_at).format('MMMM D, YYYY')}
                className="bg-pink-50 text-pink-700 rounded-lg border border-pink-100"
              />
              <Card
                title={t('text-total')}
                details={total}
                className="bg-pink-50 text-pink-700 rounded-lg border border-pink-100"
              />
              <Card
                title={t('text-payment-method')}
                details={order?.payment_gateway ?? 'N/A'}
                className="bg-pink-50 text-pink-700 rounded-lg border border-pink-100"
              />
            </div>

            {/* Order Status & Details */}
            <div className="flex flex-col md:flex-row gap-10">
              {/* Status */}
              <div className="w-full md:w-1/2">
                <h2 className="mb-4 text-lg font-semibold text-pink-600">
                  {t('text-order-status')}
                </h2>
                <OrderStatusProgressBox
                  orderStatus={order?.order_status as OrderStatus}
                  paymentStatus={order?.payment_status as PaymentStatus}
                />
              </div>

              {/* Details */}
              <div className="w-full md:w-1/2">
                <h2 className="mb-4 text-lg font-semibold text-pink-600">
                  {t('text-order-details')}
                </h2>
                <div className="flex flex-col gap-3">
                  <Listitem
                    title={t('text-total-item')}
                    details={formatString(
                      order?.products?.length,
                      t('text-item'),
                    )}
                  />
                  <Listitem title={t('text-sub-total')} details={sub_total} />
                  <Listitem title={t('text-tax')} details={tax} />
                  <div className="border-t border-gray-200 dark:border-gray-700 my-2" />
                  <Listitem title={t('text-total')} details={total} />
                  {wallet_total && (
                    <Listitem
                      title={t('text-paid-from-wallet')}
                      details={wallet_total}
                    />
                  )}
                  {!is_payment_gateway_use && !is_full_paid && (
                    <Listitem
                      title={`${order?.payment_gateway} ${t('payment')}`}
                      details={gatewayPayment}
                    />
                  )}
                  <Listitem title={t('text-amount-due')} details={amountDue} />
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="mt-10">
              <OrderItems
                products={order?.products}
                orderId={order?.id}
                status={order?.payment_status as PaymentStatus}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Confetti Celebration */}
      {order && order.payment_status === PaymentStatus.SUCCESS && (
        <ReactConfetti
          width={width - 10}
          height={height}
          recycle={false}
          tweenDuration={8000}
          numberOfPieces={300}
        />
      )}
    </div>
  );
};

const OrderPage: NextPageWithLayout = () => {
  const { query } = useRouter();
  const { openModal } = useModalAction();
  const { order, isLoading, error, isFetching } = useOrder({
    tracking_number: query.tracking_number!.toString(),
  });

  const { payment_status, payment_intent, tracking_number } = order ?? {};
  console.log('DEBUG OrderPage order data:', order);
  useEffect(() => {
    if (
      payment_status === PaymentStatus.PENDING &&
      payment_intent?.payment_intent_info &&
      !payment_intent?.payment_intent_info?.is_redirect
    ) {
      openModal('PAYMENT_MODAL', {
        paymentGateway: payment_intent?.payment_gateway,
        paymentIntentInfo: payment_intent?.payment_intent_info,
        trackingNumber: tracking_number,
      });
    }
  }, [payment_status, payment_intent?.payment_intent_info]);

  if (isLoading) {
    return <PageLoader showText={false} />;
  }

  if (error) return <ErrorMessage message={error?.message} />;

  return <OrderView order={order} loadingStatus={!isLoading && isFetching} />;
};

OrderPage.authorization = true;
OrderPage.getLayout = function getLayout(page: any) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export default OrderPage;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    [API_ENDPOINTS.SETTINGS, { language: locale }],
    ({ queryKey }) => client.settings.all(queryKey[1] as SettingsQueryOptions),
  );

  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common'])),
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};
