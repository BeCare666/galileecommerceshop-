// components/CorridorModal.tsx
import React from "react";

export type Corridor = {
    id: string;
    from: { name: string; latitude: number; longitude: number };
    to: { name: string; latitude: number; longitude: number };
    produits: string[];
    douanes: string;
    taxes: string;
    logistique: string;
    partenaires: string[];
};

type ModalProps = {
    corridor: Corridor | null;
    onClose: () => void;
};

const CorridorModal = ({ corridor, onClose }: ModalProps) => {
    if (!corridor) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white w-full max-w-3xl mx-auto p-6 rounded-lg relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-xl font-bold text-gray-600 hover:text-red-500"
                >
                    &times;
                </button>
                <h2 className="text-2xl font-semibold mb-4 text-pink-600">
                    Corridor : {corridor.from.name} → {corridor.to.name}
                </h2>
                <div className="space-y-2">
                    <p><strong>Produits :</strong> {corridor.produits.join(", ")}</p>
                    <p><strong>Douanes :</strong> {corridor.douanes}</p>
                    <p><strong>Taxes :</strong> {corridor.taxes}</p>
                    <p><strong>Logistique :</strong> {corridor.logistique}</p>
                    <p><strong>Partenaires :</strong> {corridor.partenaires.join(", ")}</p>
                </div>
            </div>
        </div>
    );
};

export default CorridorModal;
