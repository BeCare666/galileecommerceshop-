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
import { getAuthToken, removeAuthToken } from '../data/client/token.utils';
const token = getAuthToken();
// -------------------------
// useOrders
// -------------------------
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

  return {
    orders: data?.pages.flatMap((page) => page.data) ?? [],
    isLoading,
    error,
    hasNextPage,
    isFetching,
    isLoadingMore: isFetchingNextPage,
    loadMore: () => fetchNextPage(),
  };
}

// -------------------------
// useDownloadableProductOrders
// -------------------------
export function useDownloadableProductOrders(options?: OrderQueryOptions) {
  const formattedOptions = { ...options };

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

  return {
    downloadableFiles: data?.pages.flatMap((page) => page.data) ?? [],
    isLoading,
    error,
    hasNextPage,
    isFetching,
    isLoadingMore: isFetchingNextPage,
    loadMore: () => fetchNextPage(),
  };
}

// -------------------------
// useOrder
// -------------------------
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

// -------------------------
// useGetPaymentIntent
// -------------------------
interface GetPaymentIntentProps {
  tracking_number: string;
  payment_gateway: string;
  recall_gateway?: boolean;
  order?: { id: number };
}

export function useGetPaymentIntent({
  tracking_number,
  payment_gateway,
  recall_gateway,
  order,
}: GetPaymentIntentProps) {
  const router = useRouter();
  const { openModal } = useModalAction();

  // ID de la commande
  const orderId = order?.id;

  const {
    data,
    isLoading,
    error,
    refetch: getPaymentIntentQuery,
    isFetching,
  } = useQuery(
    [API_ENDPOINTS.PAYMENT_INTENT, { tracking_number, payment_gateway }],
    async () => {
      if (!orderId) throw new Error('Order ID is missing');

      const response = await client.orders.createPaymentIntent({
        orderId,
        paymentGateway: payment_gateway,
      });

      return response;
    },
    {
      enabled: Boolean(orderId), // empêche l'appel sans orderId
      retry: false,
      refetchOnWindowFocus: false,
      onSuccess: (item: any) => {
        if (!item) return;

        const paymentData = typeof item === 'object' ? item : null;

        if (!paymentData?.payment_intent_info) {
          toast.error('Impossible de récupérer les informations de paiement.');
          return;
        }

        // 🔒 Vérification : paiement déjà effectué ?
        if (paymentData.status === 'payment-success') {
          toast('Cette commande a déjà été payée.');
          return;
        }

        const paymentInfo = paymentData.payment_intent_info;
        console.log("🔹 paymentData avant confirm:", paymentData);
        if (paymentInfo.is_redirect && paymentInfo.redirect_url) {
          //window.location.href = paymentInfo.redirect_url; // ✅ vraie redirection
          return;
        }

        // Flutterwave modal
        if (payment_gateway.toLowerCase() === 'flutterwave') {
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
            callback: async (res: any) => {
              try {
                const API_URL = process.env.NEXT_PUBLIC_REST_API_ENDPOINT;

                // 👀 Log de ce que tu envoies
                console.log("🔹 Données envoyées au backend:", {
                  paymentIntentId: paymentData.id,
                  tx_ref: res?.tx_ref,
                  transaction_id: res?.transaction_id,
                });
                console.log("ajouter")
                const response = await fetch(`${API_URL}/payments/confirm`, {
                  method: "POST",
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    paymentIntentId: paymentData.id,
                    tx_ref: res?.tx_ref,
                    transaction_id: String(res?.transaction_id),
                  }),
                });

                // 👀 Log du status HTTP
                console.log("🔹 Status de la réponse:", response.status);

                const result = await response.json();

                // 👀 Log du résultat
                console.log("🔹 Réponse du backend:", result);

                if (result.success) {
                  toast.success("Paiement confirmé !");
                  // window.location.href = result.invoiceUrl; // facture ou page de succès
                } else {
                  toast.error("Le paiement n’a pas été confirmé.");
                }
              } catch (err) {
                console.error("❌ Erreur lors de la confirmation du paiement:", err);
                toast.error("Erreur lors de la confirmation du paiement.");
              }
            },
            onclose: () => console.log('Payment modal closed'),
          });
          return;
        }

        // Pour d'autres gateways
        if (recall_gateway) window.location.reload();
        else openModal('PAYMENT_MODAL', {});
      },
      onError: (err: any) => {
        console.error('Failed to create payment intent:', err);
        toast.error(err?.message || 'Failed to initiate payment');
      },
    }
  );

  return {
    data,
    getPaymentIntentQuery,
    isLoading,
    isFetching,
    error,
  };
}

// -------------------------
// useOrderPayment
// -------------------------
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

  return {
    createOrderPayment: (input: CreateOrderPaymentInput) =>
      createOrderPayment({ ...input }),
    isLoading,
  };
}

// -------------------------
// useSavePaymentMethod
// -------------------------
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
