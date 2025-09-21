import { useState } from "react";

type OrderStatus =
    | "order-pending"
    | "order-processing"
    | "order-out-for-delivery"
    | "order-completed";

const steps = [
    {
        label: "En attente",
        status: "order-pending",
        icon: (
            <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
            >
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={2} />
            </svg>
        ),
    },
    {
        label: "En traitement",
        status: "order-processing",
        icon: (
            <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
            >
                <path d="M12 4v16m8-8H4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        label: "En cours de livraison",
        status: "order-out-for-delivery",
        icon: (
            <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
            >
                <path
                    d="M3 12h18M3 6h18M3 18h18"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        ),
    },
    {
        label: "Livrée",
        status: "order-completed",
        icon: (
            <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
            >
                <path
                    d="M5 13l4 4L19 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        ),
    },
];

export default function OrderTracking() {
    const [trackingNumber, setTrackingNumber] = useState("");
    const [currentStatus, setCurrentStatus] = useState<OrderStatus | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleTrackOrder = async () => {
        if (!trackingNumber) return;
        setLoading(true);
        setError("");
        setCurrentStatus(null);

        try {
            const res = await fetch(`/api/orders/${trackingNumber}`);
            if (!res.ok) throw new Error("Commande introuvable");
            const data = await res.json();
            setCurrentStatus(data.order_status);
        } catch (err: any) {
            setError(err.message || "Erreur lors de la récupération de la commande");
        } finally {
            setLoading(false);
        }
    };

    const statusIndex = currentStatus
        ? steps.findIndex((step) => step.status === currentStatus)
        : -1;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-16 px-4">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">
                Suivi de votre commande
            </h1>

            {/* Input & Button */}
            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md mb-8">
                <input
                    type="text"
                    placeholder="Numéro de commande"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <button
                    onClick={handleTrackOrder}
                    disabled={loading}
                    className="bg-pink-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-pink-700 transition"
                >
                    {loading ? "Chargement..." : "Voir le suivi"}
                </button>
            </div>

            {/* Error */}
            {error && <p className="text-red-500 mb-6">{error}</p>}

            {/* Timeline */}
            {currentStatus && (
                <div className="w-full max-w-3xl">
                    <div className="flex items-center justify-between relative">
                        {steps.map((step, index) => {
                            const isActive = index <= statusIndex;

                            return (
                                <div
                                    key={index}
                                    className="flex-1 flex flex-col items-center relative"
                                >
                                    {/* Ligne */}
                                    {index !== steps.length - 1 && (
                                        <div
                                            className={`absolute top-4 left-1/2 w-full h-1 transform -translate-x-1/2 ${index < statusIndex ? "bg-pink-600" : "bg-gray-300"
                                                }`}
                                            style={{ zIndex: 0 }}
                                        />
                                    )}

                                    {/* Cercle avec icône */}
                                    <div
                                        className={`w-12 h-12 flex items-center justify-center rounded-full z-10 transition-colors duration-500 ${isActive ? "bg-pink-600 text-white" : "bg-gray-300 text-gray-500"
                                            }`}
                                    >
                                        {step.icon}
                                    </div>

                                    {/* Label */}
                                    <span
                                        className={`mt-2 text-sm font-medium transition-colors duration-500 ${isActive ? "text-pink-600" : "text-gray-500"
                                            }`}
                                    >
                                        {step.label}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
