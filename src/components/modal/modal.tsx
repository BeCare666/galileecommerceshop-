import dynamic from "next/dynamic";
import React, { useState } from "react";
const MapChart = dynamic(() => import("@/components/mapChart/mapChart"), {
    ssr: false,
});
import { PageLoader } from '@/components/ui/loader/spinner/spinner';
// ✅ Déclare l'interface ici
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    mapIsOk: boolean; // <-- ajoute ici
    setMapIsOk: React.Dispatch<React.SetStateAction<boolean>>; // <-- et ici

}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const [mapIsOk, setMapIsOk] = useState(true);
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50  flex items-center justify-center "
            onClick={onClose}
            style={{
                background: "linear-gradient(135deg, #0f1a3f, #1b254f)",

            }}
        >
            <div
                className="relative w-full h-full max-w-[1200px] max-h-[100vh] bg-white  overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Bouton de fermeture */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-3 text-blue-500 text-2xl z-50 hover:text-red-500 h-3 w-3"
                    aria-label="Fermer la modale"
                >
                    &times;
                </button>

                {/* Contenu : Carte */}
                <div className="w-full h-full">
                    <MapChart closeModal={onClose} setMapIsOk={setMapIsOk} />
                    {mapIsOk && (
                        <PageLoader showText={false} />
                    )}
                </div>
                <div className="w-full h-screen flex items-center justify-center">
                    {mapIsOk && <PageLoader showText={false} />}
                </div>
            </div>
        </div>
    );
};

export default Modal;
