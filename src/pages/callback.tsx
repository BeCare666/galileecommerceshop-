// pages/payment/callback.tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getAuthToken, removeAuthToken } from '../data/client/token.utils';

export default function PaymentCallback() {
    const router = useRouter();
    const { payment_intent_id, tx_ref } = router.query;
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const confirmPayment = async () => {
            if (!payment_intent_id || !tx_ref) return;

            try {
                const token = getAuthToken();
                if (!token) {
                    setMessage('Token manquant. Veuillez vous reconnecter.');
                    setLoading(false);
                    return;
                }

                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/payments/confirm`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`, // ✅ on met le token ici
                        },
                        body: JSON.stringify({
                            paymentIntentId: Number(payment_intent_id),
                            tx_ref,
                        }),
                    }
                );

                if (!res.ok) {
                    const errorData = await res.json();
                    setMessage(
                        `Erreur de confirmation: ${errorData.message || 'Inconnue'}`
                    );
                } else {
                    const data = await res.json();
                    setMessage('Paiement confirmé avec succès ✅');
                    console.log('Confirm Payment Response:', data);

                    // 🔁 Exemple : rediriger vers la facture
                    if (data.invoiceUrl) {
                        setTimeout(() => {
                            window.location.href = data.invoiceUrl;
                        }, 2000);
                    }
                }
            } catch (err: any) {
                setMessage(`Erreur: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        confirmPayment();
    }, [payment_intent_id, tx_ref]);

    return (
        <div className="flex h-screen items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md">
                {loading ? (
                    <p className="text-gray-700">Confirmation du paiement en cours...</p>
                ) : (
                    <p className="text-gray-900 font-semibold">{message}</p>
                )}
            </div>
        </div>
    );
}
