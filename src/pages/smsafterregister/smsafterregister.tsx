import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { CheckCircle, Sparkles } from "lucide-react";

export default function VendorSuccessPage() {
    const router = useRouter();
    async function handleGotohom() {
        router.push('/')
    }
    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-white via-slate-50 to-slate-100 flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background decorative elements */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.15, scale: 1 }}
                transition={{ duration: 1.4 }}
                className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,110,169,0.4),transparent_60%)] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9 }}
                className="absolute top-20 right-10 text-rose-400/40" >
                <Sparkles size={120} />
            </motion.div>

            {/* Main Card */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="max-w-lg w-full bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-10 border border-white/40 relative z-10 text-center" >
                <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="flex items-center justify-center mb-6"
                >
                    <CheckCircle className="w-20 h-20 text-emerald-500 drop-shadow-md" />
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4"
                >
                    Félicitations ! 🎉
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="text-slate-600 text-sm md:text-base leading-relaxed"
                >
                    Votre compte a bien été créé sur <span className="font-semibold text-slate-800">GalileeCommerce</span> 🎉
                    <br /><br />
                    Afin de finaliser votre inscription, veuillez <span className="font-semibold text-slate-800">consulter votre boîte mail</span> et
                    cliquer sur le lien de vérification.
                    <br /><br />
                    Une fois votre email validé, vous pourrez vous connecter .
                </motion.p>

            </motion.div>


        </div>
    );
}
