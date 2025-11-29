import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function TrackingPage() {
    const router = useRouter();
    const [code, setCode] = useState("");

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (!code) return;
        router.push(`/orders/${code}/payment`);
    };

    return (
        <div
            className="h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat px-4"
            style={{ backgroundImage: "url('https://unc-edu.org/wp-content/uploads/2024/08/Logistique-et-Transport.jpg')" }}
        >
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="backdrop-blur-md bg-white/2 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/20"
            >
                <h1 className="text-white text-3xl font-semibold text-center mb-6 drop-shadow-lg">
                    Suivi de commande
                </h1>

                <p className="text-gray/80 text-center mb-8 text-sm leading-relaxed">
                    Entrez votre code de suivi pour vérifier l'état de votre commande.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Ex: ORD-1-1764354216212"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:border-white/70 transition backdrop-blur-lg"
                        />
                    </div>

                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.02 }}
                        type="submit"
                        className="w-full py-3 rounded-xl bg-white/80 text-black font-semibold flex items-center justify-center gap-2 shadow-md hover:bg-white transition"
                    >
                        Valider votre code
                        <ArrowRight className="w-5 h-5" />
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
}
