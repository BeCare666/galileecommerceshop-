import type {
  Order,
  OrderedFilePaginator,
  DownloadableFilePaginator,
  OrderPaginator,
  OrderQueryOptions,
  CreateOrderPaymentInput,
} from '@/types';
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
  useMutation,
} from 'react-query';
import { API_ENDPOINTS } from '@/data/client/endpoints';
import client from '@/data/client';
import { useRouter } from 'next/router';
import { useModalAction } from '@/components/modal-views/context';
import toast from 'react-hot-toast';
import { isArray, isEmpty, isObject } from 'lodash';

export function useOrders(options?: OrderQueryOptions) {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery<OrderPaginator, Error>(
    [API_ENDPOINTS.ORDERS, options],
    ({ queryKey, pageParam }) =>
      client.orders.all(Object.assign({}, queryKey[1], pageParam)),
    {
      getNextPageParam: ({ current_page, last_page }) =>
        last_page > current_page && { page: current_page + 1 },
    },
  );

  function handleLoadMore() {
    fetchNextPage();
  }

  return {
    orders: data?.pages.flatMap((page) => page.data) ?? [],
    isLoading,
    error,
    hasNextPage,
    isFetching,
    isLoadingMore: isFetchingNextPage,
    loadMore: handleLoadMore,
  };
}

export function useDownloadableProductOrders(options?: OrderQueryOptions) {
  const formattedOptions = {
    ...options,
    // language: locale
  };

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery<OrderedFilePaginator, Error>(
    [API_ENDPOINTS.ORDERS_DOWNLOADS, formattedOptions],
    ({ queryKey, pageParam }) =>
      client.orders.downloadable(Object.assign({}, queryKey[1], pageParam)),
    {
      getNextPageParam: ({ current_page, last_page }) =>
        last_page > current_page && { page: current_page + 1 },
    },
  );

  function handleLoadMore() {
    fetchNextPage();
  }

  return {
    downloadableFiles: data?.pages.flatMap((page) => page.data) ?? [],
    isLoading,
    error,
    hasNextPage,
    isFetching,
    isLoadingMore: isFetchingNextPage,
    loadMore: handleLoadMore,
  };
}

export function useOrder({ tracking_number }: { tracking_number: string }) {
  const { data, isLoading, error, isFetching, refetch } = useQuery<
    Order,
    Error
  >(
    [API_ENDPOINTS.ORDERS, tracking_number],
    () => client.orders.get(tracking_number),
    { refetchOnWindowFocus: false },
  );

  return {
    order: data,
    isFetching,
    isLoading,
    refetch,
    error,
  };
}

export function useGetPaymentIntent({
  tracking_number,
  payment_gateway,
  recall_gateway,
  form_change_gateway,
}: {
  tracking_number: string;
  payment_gateway: string;
  recall_gateway?: boolean;
  form_change_gateway?: boolean;
}) {
  const router = useRouter();
  const { openModal } = useModalAction();

  const {
    data,
    isLoading,
    error,
    refetch: getPaymentIntentQuery,
    isFetching,
  } = useQuery(
    [
      API_ENDPOINTS.PAYMENT_INTENT,
      { tracking_number, payment_gateway, recall_gateway },
    ],
    () =>
      client.orders.getPaymentIntent({
        tracking_number,
        payment_gateway,
        recall_gateway,
      }),
    {
      enabled: false,
      onSuccess: (item) => {
        let data: any = '';
        if (isArray(item)) {
          data = { ...item };
          data = isEmpty(data) ? [] : data[0];
        } else if (isObject(item)) {
          data = item;
        }

        const paymentInfo = data?.payment_intent_info;

        if (!paymentInfo) return;

        // Si redirection classique
        if (paymentInfo.is_redirect) {
          return router.push(paymentInfo.redirect_url as string);
        }

        // Si Flutterwave
        if (payment_gateway === 'flutterwave') {
          (window as any).FlutterwaveCheckout({
            public_key: paymentInfo.public_key,
            tx_ref: paymentInfo.tx_ref,
            amount: paymentInfo.amount,
            currency: paymentInfo.currency,
            payment_options: 'card, mobilemoneyghana, ussd',
            customer: {
              email: paymentInfo.customer_email,
              phone_number: paymentInfo.customer_phone,
              name: paymentInfo.customer_name,
            },
            customizations: {
              title: paymentInfo.title || 'Payment',
              description: paymentInfo.description || 'Order Payment',
            },
            callback: function (res: any) {
              if (res.status === 'successful') {
                // Vérification backend après paiement
                getPaymentIntentQuery(); // refetch pour mettre à jour status et balances
              }
            },
            onclose: function () {
              console.log('Payment modal closed');
            },
          });
          return;
        }

        // Sinon modal interne pour autres gateways
        if (recall_gateway) window.location.reload();
        openModal('PAYMENT_MODAL', {});
      },
    },
  );

  return {
    data,
    getPaymentIntentQuery,
    isLoading,
    error,
  };
}

export function useOrderPayment() {
  const queryClient = useQueryClient();

  const { mutate: createOrderPayment, isLoading } = useMutation(
    client.orders.payment,
    {
      onSettled: () => {
        queryClient.refetchQueries(API_ENDPOINTS.ORDERS);
        queryClient.refetchQueries(API_ENDPOINTS.ORDERS_DOWNLOADS);
      },
      onError: (error: any) => {
        const {
          response: { data },
        } = error ?? {};
        toast.error(data?.message || 'Payment failed');
      },
    },
  );

  function formatOrderInput(input: CreateOrderPaymentInput) {
    const formattedInputs = { ...input };
    createOrderPayment(formattedInputs);
  }

  return {
    createOrderPayment: formatOrderInput,
    isLoading,
  };
}

export function useSavePaymentMethod() {
  const {
    mutate: savePaymentMethod,
    isLoading,
    error,
    data,
  } = useMutation(client.orders.savePaymentMethod);

  return {
    savePaymentMethod,
    data,
    isLoading,
    error,
  };
}
