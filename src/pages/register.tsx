// pages/register.tsx
import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, User, Facebook } from "lucide-react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useMutation } from "react-query";
import client from "@/data/client";
import { setAuthCredentials } from "@/data/client/token.utils";
import useAuth from "@/components/auth/use-auth";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import axios from "axios";

type FormValues = { name: string; email: string; password: string };

const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.06,
        },
    },
};

const fieldVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function RegisterPage() {
    const router = useRouter();
    const { authorize } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
    const [showPassword, setShowPassword] = React.useState(false);

    // 🔥 Mutation REGISTER
    const { mutate: registerUser, isLoading } = useMutation(client.users.register, {
        onSuccess: (data: any) => {
            if (!data?.token) {
                toast.error("Erreur d’inscription");
                return;
            }
            authorize(data.token);
            setAuthCredentials(data.token, data.permissions);
            toast.success("Iinscription avec succès");
            router.push("/smsafterregister/smsafterregister");
        },
        onError: (err) => {
            let msg = "Une erreur est survenue";
            if (axios.isAxiosError(err)) msg = err.response?.data?.message || msg;
            toast.error(msg);
        },
    });

    const onSubmit = (d: FormValues) => registerUser(d);

    return (
        <div className="min-h-screen flex">
            {/* Left Section */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-8" style={{ minHeight: "100vh" }}>
                <div className="w-full max-w-lg">
                    <div className="mb-8">
                        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                            Créer un compte sur <span className="text-pink-500 block">Galileecommerce</span>
                        </h1>
                        <p className="mt-2 text-sm text-gray-600 max-w-md hidden">
                            Inscription rapide — démarrez votre expérience
                        </p>
                    </div>

                    <motion.form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4 bg-white/60 p-6 rounded-2xl shadow-lg backdrop-blur-md border border-gray-100"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {/* NAME */}
                        <motion.div variants={fieldVariants}>
                            <label className="relative block">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Nom complet"
                                    {...register("name", { required: "Nom requis" })}
                                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-gray-200 focus:ring-2 focus:ring-pink-100 outline-none"
                                />
                            </label>
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                        </motion.div>

                        {/* EMAIL */}
                        <motion.div variants={fieldVariants}>
                            <label className="relative block">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="email"
                                    placeholder="Adresse email"
                                    {...register("email", { required: "Email requis" })}
                                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-gray-200 focus:ring-2 focus:ring-pink-100 outline-none"
                                />
                            </label>
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                        </motion.div>

                        {/* PASSWORD */}
                        <motion.div variants={fieldVariants}>
                            <label className="relative block">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Mot de passe"
                                    {...register("password", { required: "Mot de passe requis" })}
                                    className="w-full pl-12 pr-12 py-3 rounded-xl bg-white border border-gray-200 focus:ring-2 focus:ring-blue-100 outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(s => !s)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </label>
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                        </motion.div>

                        {/* SUBMIT */}
                        <motion.div variants={fieldVariants}>
                            <motion.button
                                whileTap={{ scale: 0.995 }}
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-blue-500 text-white font-semibold shadow-lg hover:brightness-95 transition"
                            >
                                {isLoading ? "Création..." : "Créer mon compte"}
                            </motion.button>
                        </motion.div>

                        {/* SEPARATOR */}
                        <motion.div variants={fieldVariants} className="flex items-center gap-3 pt-2">
                            <div className="flex-grow h-px bg-gray-200" />
                            <div className="text-sm text-gray-500">ou</div>
                            <div className="flex-grow h-px bg-gray-200" />
                        </motion.div>

                        {/* SOCIAL LOGIN */}
                        <motion.div variants={fieldVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {/* GOOGLE */}
                            <button
                                type="button"
                                onClick={() => signIn("google", { callbackUrl: "/" })}
                                className="flex items-center justify-center gap-3 py-2 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition"
                            >
                                <span className="w-5 h-5">
                                    {/* Google SVG */}
                                    <svg viewBox="0 0 533.5 544.3" className="w-5 h-5">
                                        <path d="M533.5 278.4c0-17.4-1.4-34.1-4-50.2H272v95h146.9c-6.3 33.7-25 62.3-53.2 81.5v67h85.8c50.1-46.1 81-114 81-193.3z" fill="#4285F4" />
                                        <path d="M272 544.3c72.9 0 134-24.2 178.6-65.5l-85.8-67c-23.8 16-54.3 25.3-92.8 25.3-71.4 0-132-48-153.7-112.8H28.2v70.7c44.8 89.1 137.1 149.3 243.8 149.3z" fill="#34A853" />
                                        <path d="M118.3 324.3c-10-29.7-10-61.6 0-91.3V162.3H28.2c-39.2 77.3-39.2 168.2 0 245.5l90.1-70.7z" fill="#FBBC05" />
                                        <path d="M272 107.7c39.6 0 75.2 13.6 103.1 40.3l77.1-77.1C405.9 24.2 344.9 0 272 0 165.3 0 73 60.2 28.2 149.3l90.1 70.7c21.7-64.8 82.3-112.3 153.7-112.3z" fill="#EA4335" />
                                    </svg>
                                </span>
                                <span className="text-sm font-medium text-gray-700">Continuer avec Google</span>
                            </button>

                            {/* FACEBOOK */}
                            <button
                                type="button"
                                onClick={() => signIn("facebook", { callbackUrl: "/" })}
                                className="flex items-center justify-center gap-3 py-2 rounded-xl bg-[#1877F2] text-white shadow-sm hover:brightness-95 transition"
                            >
                                <Facebook size={18} />
                                <span className="text-sm font-medium">Continuer avec Facebook </span>
                            </button>
                        </motion.div>

                        <motion.p variants={fieldVariants} className="text-xs text-gray-500 text-center pt-2">
                            En créant un compte, vous acceptez nos conditions d'utilisation.
                        </motion.p>
                    </motion.form>
                </div>
            </div>

            {/* Right Image Section */}
            <div className="hidden md:flex w-1/2 items-center justify-center relative" style={{ minHeight: "100vh" }}>
                <div className="absolute inset-8 rounded-[5px] overflow-hidden bg-gradient-to-b from-pink-50 to-white shadow-[5px] border border-white/30">
                    <Image
                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1400"
                        alt="Hero"
                        layout="fill"
                        objectFit="cover"
                        priority
                    />
                    <div className="absolute left-8 bottom-8 bg-white/80 rounded-xl p-4 shadow-lg max-w-xs backdrop-blur-sm">
                        <h4 className="text-lg font-semibold text-gray-900">Bienvenue sur Galileecommerce</h4>
                        <p className="text-sm text-gray-600 mt-1">La marketplace qui fait vendre.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
