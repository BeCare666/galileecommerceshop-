import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { Mail, Lock } from "lucide-react";
import { motion, Variants } from "framer-motion";

type LoginFormValues = { email: string; password: string; };

const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.06 } },
};

const fieldVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function AmbassadorLogin() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>();
    const [showPassword, setShowPassword] = useState(false);
    const token = ""; // si nécessaire

    const onSubmit = async (data: LoginFormValues) => {
        try {
            const API_URL = process.env.NEXT_PUBLIC_REST_API_ENDPOINT;
            if (!API_URL) throw new Error("NEXT_PUBLIC_REST_API_ENDPOINT n'est pas défini !");

            const res = await fetch(`${API_URL}/ambassadors/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });

            const result = await res.json();
            if (!res.ok) throw new Error(result.message || "Erreur de connexion");

            toast.success("Connexion réussie !");
            router.push("/ambassador/dashboard");
        } catch (err: any) {
            toast.error(err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
            <motion.form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Connexion GE Ambassador</h1>

                <motion.div variants={fieldVariants}>
                    <label className="relative block">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="email"
                            placeholder="Email"
                            {...register("email", { required: "Email requis" })}
                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-100 outline-none"
                        />
                    </label>
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </motion.div>

                <motion.div variants={fieldVariants}>
                    <label className="relative block">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Mot de passe"
                            {...register("password", { required: "Mot de passe requis" })}
                            className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-100 outline-none"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(s => !s)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                        >
                            {showPassword ? "🙈" : "👁️"}
                        </button>
                    </label>
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                </motion.div>

                <motion.button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-blue-500 text-white font-semibold shadow-lg hover:brightness-95 transition"
                >
                    Connexion
                </motion.button>
            </motion.form>
        </div>
    );
}
