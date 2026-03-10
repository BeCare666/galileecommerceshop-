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
    Network,
    MapPin,
    Briefcase,
    CheckCircle, Circle,
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

const STEPS = ["Compte", "Profil", "Révision"];

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
                <aside className="lg:col-span-5 p-3 text-white lg:p-8 ">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                            <Shield />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold tracking-tight">
                                Devenez GE Ambassador
                            </h3>
                            <p className="text-sm text-white/80 mt-1">
                                Représentez Galilée Ecommerce dans votre réseau.
                            </p>
                        </div>
                    </div>

                    <Image
                        src={Firstimage}
                        alt="GE Ambassador"
                        className="rounded-xl mt-6"
                    />
                </aside>

                {/* RIGHT */}
                <main className="lg:col-span-7 lg:p-8 pl-8 pr-8 pt-0">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

                        {/* STEPPER */}
                        <div className="flex justify-between lg:mb-[80px] mb-[50px]">

                            {STEPS.map((label, i) => {

                                const isCompleted = step > i;
                                const isActive = step === i;

                                return (
                                    <div
                                        key={i}
                                        className="flex flex-1 items-center justify-center gap-2 py-3 rounded-[6px] transition text-sm font-semibold"
                                    >

                                        {/* ICON */}
                                        {isCompleted ? (
                                            <CheckCircle size={18} className="text-green-400" />
                                        ) : (
                                            <Circle
                                                size={18}
                                                className={isActive ? "text-white" : "text-white/40"}
                                            />
                                        )}

                                        {/* LABEL */}
                                        <span
                                            className={`tracking-wide ${isActive
                                                ? "text-white"
                                                : isCompleted
                                                    ? "text-white/80"
                                                    : "text-white/40"
                                                }`}
                                        >
                                            {label}
                                        </span>

                                    </div>
                                );
                            })}

                        </div>

                        <AnimatePresence mode="wait">

                            {/* STEP 0 */}
                            {step === 0 && (
                                <motion.div
                                    key="s0"
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="show"
                                    exit="hidden"
                                    className="space-y-5"
                                >
                                    <label className="text-white">Nom complet <span>*</span></label>
                                    <FloatingInput
                                        label="Nom complet"
                                        icon={<User size={16} />}
                                        {...register("name", { required: true })}
                                    />
                                    <label className="text-white">Email <span>*</span></label>
                                    <FloatingInput
                                        label="Email"
                                        icon={<Mail size={16} />}
                                        {...register("email", { required: true })}
                                    />
                                    <label className="text-white">Mot de passe <span>*</span></label>
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
                                    className="space-y-5"
                                >
                                    <label className="text-white">Type d’ambassadeur <span>*</span></label>
                                    <select
                                        {...register("ambassador_type", { required: true })}
                                        className="form-input-epure w-full px-4 py-3 rounded-[5px] text-sm mt-[0!important] "
                                    >
                                        <option value="" className="text-gray-500">Type d’ambassadeur</option>
                                        <option value="individual" className="text-gray-500">Individuel</option>
                                        <option value="community" className="text-gray-500">Communautaire</option>
                                        <option value="professional" className="text-gray-500">Professionnel</option>
                                    </select>
                                    <label className="text-white">Domaine d’activité <span>*</span></label>
                                    <FloatingInput
                                        label="Domaine d’activité"
                                        icon={<Globe size={16} />}
                                        {...register("activity_domain", { required: true })}
                                    />
                                    <label className="text-white">Description de votre réseau <span>*</span></label>
                                    <textarea
                                        {...register("network_description", { required: true })}
                                        placeholder="Description de votre réseau"
                                        className="form-textarea-epure w-full min-h-[110px] px-4 py-3 rounded-[5px] text-sm mt-[0!important]"
                                    />
                                    <label className="text-white">Zone de couverture <span>*</span></label>
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
                                    className="w-full space-y-6"
                                >
                                    <div className="grid w-full gap-4 sm:grid-cols-2">

                                        {/* Nom */}
                                        <div className="flex items-start gap-3 bg-white/10 p-4 rounded-xl w-full min-w-0">
                                            <User size={18} className="text-white/80 mt-[2px] shrink-0" />
                                            <div className="flex flex-col min-w-0">
                                                <span className="text-xs text-white/60">Nom complet</span>
                                                <span className="text-sm font-semibold text-white break-words">
                                                    {getValues("name")}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Email */}
                                        <div className="flex items-start gap-3 bg-white/10 p-4 rounded-xl w-full min-w-0">
                                            <Mail size={18} className="text-white/80 mt-[2px] shrink-0" />
                                            <div className="flex flex-col min-w-0">
                                                <span className="text-xs text-white/60">Email</span>
                                                <span className="text-sm font-semibold text-white break-words">
                                                    {getValues("email")}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Type */}
                                        <div className="flex items-start gap-3 bg-white/10 p-4 rounded-xl w-full min-w-0">
                                            <Shield size={18} className="text-white/80 mt-[2px] shrink-0" />
                                            <div className="flex flex-col min-w-0">
                                                <span className="text-xs text-white/60">Type d’ambassadeur</span>
                                                <span className="text-sm font-semibold text-white break-words">
                                                    {getValues("ambassador_type")}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Domaine */}
                                        <div className="flex items-start gap-3 bg-white/10 p-4 rounded-xl w-full min-w-0">
                                            <Briefcase size={18} className="text-white/80 mt-[2px] shrink-0" />
                                            <div className="flex flex-col min-w-0">
                                                <span className="text-xs text-white/60">Domaine d’activité</span>
                                                <span className="text-sm font-semibold text-white break-words">
                                                    {getValues("activity_domain")}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Zone */}
                                        <div className="flex items-start gap-3 bg-white/10 p-4 rounded-xl w-full min-w-0">
                                            <MapPin size={18} className="text-white/80 mt-[2px] shrink-0" />
                                            <div className="flex flex-col min-w-0">
                                                <span className="text-xs text-white/60">Zone de couverture</span>
                                                <span className="text-sm font-semibold text-white break-words">
                                                    {getValues("coverage_area") || "Non renseigné"}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <div className="flex items-start gap-3 bg-white/10 p-4 rounded-xl w-full min-w-0 sm:col-span-2">
                                            <Network size={18} className="text-white/80 mt-[2px] shrink-0" />
                                            <div className="flex flex-col min-w-0">
                                                <span className="text-xs text-white/60">Description du réseau</span>
                                                <span className="text-sm font-semibold text-white break-words">
                                                    {getValues("network_description")}
                                                </span>
                                            </div>
                                        </div>

                                    </div>
                                </motion.div>
                            )}

                        </AnimatePresence>

                        {/* NAV */}
                        <div className="flex justify-between pt-4">

                            {step > 0 && (
                                <button
                                    type="button"
                                    onClick={goPrev}
                                    className="flex items-center gap-2 text-sm font-semibold text-white hover:text-white/80 transition"
                                >
                                    <ArrowLeft size={18} /> Précédent
                                </button>
                            )}

                            {step < STEPS.length - 1 ? (
                                <button
                                    type="button"
                                    onClick={goNext}
                                    className="flex items-center gap-2 bg-white/20 text-white px-5 py-3 rounded-[5px] text-sm font-semibold hover:bg-white/30 transition"
                                >
                                    Suivant <ArrowRight size={18} />
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex items-center gap-2 bg-white/20 text-white px-5 py-3 rounded-[5px] text-sm font-semibold hover:bg-white/30 transition"
                                >
                                    {isSubmitting ? "Envoi..." : "Valider"} <Check size={18} />
                                </button>
                            )}
                        </div>
                    </form>
                </main>
            </div>

            {/* ──────────────── Styles ──────────────── */}
            <style>{`
    *{
    font-size:20px !important;
    }
        .form-input-epure,
        .form-textarea-epure {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.35);
          color: white;
          font-size: 14px;
          font-weight: 400;
          line-height: 1.45;
          outline: none;
          transition: all 0.2s ease;
        }

        .form-input-epure::placeholder,
        .form-textarea-epure::placeholder {
          color: rgba(255,255,255,0.55);
        }

        .form-input-epure:focus,
        .form-textarea-epure:focus {
          border-color: rgba(255,255,255,0.9);
          box-shadow: 0 0 0 2px rgba(255,255,255,0.15);
        }

        .form-textarea-epure {
          resize: vertical;
        }

        select.form-input-epure {
          appearance: none;
        }
        label {
        font-size:14px !important;
        margin-top:2px !important;
        margin-bottom:2px !important;
        }
      `}</style>
        </div>
    );
}

/* ───────────────── Helpers ───────────────── */

const FloatingInput = React.forwardRef<HTMLInputElement, any>(
    ({ label, icon, type = "text", ...rest }, ref) => (
        <div className="relative mt-[0!important]">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80">
                {icon}
            </div>
            <input
                ref={ref}
                type={type}
                {...rest}
                placeholder={label}
                className="form-input-epure w-full pl-12 pr-4 py-3 rounded-[5px] text-sm"
            />
        </div>
    )
);

FloatingInput.displayName = "FloatingInput";