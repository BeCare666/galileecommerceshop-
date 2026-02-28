"use client";

import React, { useState } from "react";
import Image from "next/image";
import Firstimage from "@/assets/images/ge-ambassador/ambassadeur.png";
import axios from "axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
    User,
    Mail,
    Lock,
    Globe,
    Check,
    ArrowRight,
    ArrowLeft,
    Shield,
} from "lucide-react";

/* ───────────────── Types ───────────────── */

type FormValues = {
    name: string;
    email: string;
    password: string;
    ambassador_type: string;
    activity_domain: string;
    network_description: string;
    coverage_area: string;
};

const STEPS = ["Compte", "Profil Ambassador", "Révision"];

/* ───────────────── Animations ───────────────── */

const containerVariants = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { staggerChildren: 0.04 } },
};

const fieldVariants = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.28 } },
};

/* ───────────────── Page ───────────────── */

export default function RegisterAmbassadorPage() {
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm<FormValues>();

    const [step, setStep] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const canNext = () => {
        if (step === 0)
            return !!(getValues("name") && getValues("email") && getValues("password"));
        if (step === 1)
            return !!(
                getValues("ambassador_type") &&
                getValues("activity_domain") &&
                getValues("network_description")
            );
        return true;
    };

    const goNext = () => {
        if (!canNext()) {
            toast.error("Veuillez compléter les champs requis");
            return;
        }
        setStep((s) => Math.min(s + 1, STEPS.length - 1));
    };

    const goPrev = () => setStep((s) => Math.max(s - 1, 0));

    const onSubmit = async (data: FormValues) => {
        setIsSubmitting(true);

        try {
            const endpoint = `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/register-ambassador`;
            if (!endpoint) throw new Error("API non configurée");

            await axios.post(endpoint, data);

            toast.success("Inscription Ambassador envoyée ✨");
            router.replace("/ge-ambassadeur/ambassadeur_end");
        } catch (err: any) {
            toast.error(err?.response?.data?.message || "Erreur lors de l'inscription");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#e26060] flex items-center justify-center">
            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* LEFT */}
                <aside className="lg:col-span-5 text-white p-8">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                            <Shield />
                        </div>
                        <div>
                            <h3 className="text-xl font-extrabold">Devenez GE Ambassadeur</h3>
                            <p className="text-sm opacity-90">
                                Représentez Galilée Ecommerce dans votre réseau
                            </p>
                        </div>
                    </div>

                    <Image
                        src={Firstimage}
                        alt="GE Ambassador"
                        className="rounded-xl mt-3"
                    />
                </aside>

                {/* RIGHT */}
                <main className="lg:col-span-7 p-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                        <div className="flex justify-between mb-[80px] ">
                            {STEPS.map((label, i) => (
                                <div
                                    key={i}
                                    className={`flex-1 text-center py-2 rounded-xl font-semibold ${i === step
                                        ? "bg-white/20 text-white"
                                        : "text-white/50"
                                        }`}
                                >
                                    {label}
                                </div>
                            ))}
                        </div>

                        <AnimatePresence mode="wait" >

                            {/* STEP 0 */}
                            {step === 0 && (
                                <motion.div
                                    key="s0"
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="show"
                                    exit="hidden"
                                    className="space-y-4"
                                >
                                    <FloatingInput
                                        label="Nom complet"
                                        icon={<User size={16} />}
                                        {...register("name", { required: true })}
                                    />

                                    <FloatingInput
                                        label="Email"
                                        icon={<Mail size={16} />}
                                        {...register("email", { required: true })}
                                    />

                                    <FloatingInput
                                        label="Mot de passe"
                                        type="password"
                                        icon={<Lock size={16} />}
                                        {...register("password", { required: true })}
                                    />
                                </motion.div>
                            )}

                            {/* STEP 1 */}
                            {step === 1 && (
                                <motion.div
                                    key="s1"
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="show"
                                    exit="hidden"
                                    className="space-y-4"
                                >
                                    <select
                                        {...register("ambassador_type", { required: true })}
                                        className="form-input-epure w-full px-4 py-3 rounded-2xl"
                                    >
                                        <option value="" className="text-gray-500">Type d’ambassadeur</option>
                                        <option value="individual" className="text-gray-500">Individuel</option>
                                        <option value="community" className="text-gray-500">Communautaire</option>
                                        <option value="professional" className="text-gray-500">Professionnel</option>
                                    </select>

                                    <FloatingInput
                                        label="Domaine d’activité"
                                        icon={<Globe size={16} />}
                                        {...register("activity_domain", { required: true })}
                                    />

                                    <textarea
                                        {...register("network_description", { required: true })}
                                        placeholder="Description de votre réseau"
                                        className="form-textarea-epure w-full min-h-[100px] px-4 py-3 rounded-2xl"
                                    />

                                    <FloatingInput
                                        label="Zone de couverture"
                                        icon={<Globe size={16} />}
                                        {...register("coverage_area")}
                                    />
                                </motion.div>
                            )}

                            {/* STEP 2 */}
                            {step === 2 && (
                                <motion.div
                                    key="s2"
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="show"
                                    exit="hidden"
                                    className="space-y-4"
                                >
                                    <p className="text-white">
                                        <strong>Nom :</strong> {getValues("name")}
                                    </p>
                                    <p className="text-white">
                                        <strong>Email :</strong> {getValues("email")}
                                    </p>
                                    <p className="text-white">
                                        <strong>Type :</strong> {getValues("ambassador_type")}
                                    </p>
                                </motion.div>
                            )}

                        </AnimatePresence>

                        {/* NAV */}
                        <div className="flex justify-between">
                            {step > 0 && (
                                <button
                                    type="button"
                                    onClick={goPrev}
                                    className="flex items-center gap-2 text-white font-semibold"
                                >
                                    <ArrowLeft /> Précédent
                                </button>
                            )}

                            {step < STEPS.length - 1 ? (
                                <button
                                    type="button"
                                    onClick={goNext}
                                    className="flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-xl font-semibold"
                                >
                                    Suivant <ArrowRight />
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-xl font-semibold"
                                >
                                    {isSubmitting ? "Envoi..." : "Valider"} <Check />
                                </button>
                            )}
                        </div>
                    </form>
                </main>
            </div>

            {/* ──────────────── Styles ──────────────── */}
            <style>{`
                .form-input-epure, .form-textarea-epure {
                    background: transparent;
                    border: 1px solid rgba(255,255,255,0.3);
                    color: white;
                    outline: none;
                    transition: border 0.2s;
                }
                .form-input-epure:focus, .form-textarea-epure:focus {
                    border-color: white;
                }
            `}</style>
        </div>
    );
}

/* ───────────────── Helpers ───────────────── */

const FloatingInput = React.forwardRef<HTMLInputElement, any>(
    ({ label, icon, type = "text", ...rest }, ref) => (
        <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white">
                {icon}
            </div>
            <input
                ref={ref}
                type={type}
                {...rest}
                placeholder={label}
                className="form-input-epure w-full pl-12 pr-4 py-3 rounded-2xl"
            />
        </div>
    )
);

FloatingInput.displayName = "FloatingInput";