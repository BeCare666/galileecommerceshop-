// src/pages/test-map.tsx ou test-map.jsx selon ton projet
import dynamic from "next/dynamic";

// Dynamically import MapChart with SSR disabled (important pour les libs qui utilisent `window`)
const MapChart = dynamic(() => import("@/components/mapChart/mapChart"), {
    ssr: false,
    loading: () => <p>Chargement de la carte...</p>, // optionnel : fallback en attendant le chargement
});

export default function Page() {
    return (
        <main className="p-4">
            {/* <h1 className="text-2xl font-bold mb-4">Carte interactive</h1> */}
            <MapChart />
        </main>
    );
}
