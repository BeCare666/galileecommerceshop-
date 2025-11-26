"use client";

import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
    User,
    Mail,
    Lock,
    Store,
    Image as ImageIcon,
    FileText,
    Phone,
    Check,
    ArrowRight,
    ArrowLeft,
    Globe,
    CreditCard,
    Shield,
    XCircle,
    File,
    Inbox,
    MapPin,
} from "lucide-react";

/*
  Remarque : j'ai conservé toute la logique existante (upload, handlers, submit)
  et amélioré uniquement la structure visuelle, responsivité, accessibilité et
  le design des inputs / uploaders pour un rendu ultra-moderne, épuré et premium.
*/

type DocItem = { type: string; url: string };

type FormValues = {
    name: string;
    email: string;
    password: string;
    password_confirm?: string;

    shop_name: string;
    slug?: string;
    description?: string;
    contact?: string;
    website?: string;

    street_address?: string;
    zip?: string;
    city?: string;
    country?: string;

    cover_image_url?: string | null;
    logo_image_url?: string | null;

    documents?: DocItem[];

    bank_account_number?: string;
    bank_account_name?: string;
    bank_iban?: string;
};

const STEPS = ["Compte", "B space", "Docs & Paiement", "Révision"];

const containerVariants = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { staggerChildren: 0.04 } },
};

const fieldVariants = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.28 } },
};

export default function RegisterShopPage() {
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        watch,
        formState: { errors },
    } = useForm<FormValues>({ defaultValues: { documents: [], cover_image_url: null, logo_image_url: null } });

    const [step, setStep] = useState<number>(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const router = useRouter()
    const coverPreview = watch("cover_image_url");
    const logoPreview = watch("logo_image_url");
    const documents = watch("documents") ?? [];

    const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "";
    const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ?? "";
    const CLOUDINARY_URL = CLOUD_NAME ? `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload` : "";

    const uploadToCloudinary = async (file: File): Promise<string> => {
        if (!file) throw new Error("No file provided");
        if (!CLOUDINARY_URL || !UPLOAD_PRESET) {
            return URL.createObjectURL(file);
        }

        setUploading(true);
        setUploadProgress(0);
        try {
            const form = new FormData();
            form.append("file", file);
            form.append("upload_preset", UPLOAD_PRESET);

            const res = await axios.post(CLOUDINARY_URL, form, {
                headers: { "Content-Type": "multipart/form-data" },
                onUploadProgress: (ev) => {
                    if (ev.total) {
                        const pct = Math.round((ev.loaded * 100) / ev.total);
                        setUploadProgress(pct);
                    }
                },
            });

            setUploading(false);
            setUploadProgress(100);
            return res.data.secure_url || res.data.url;
        } catch (err) {
            setUploading(false);
            setUploadProgress(0);
            console.warn("Cloudinary upload failed:", err);
            return URL.createObjectURL(file);
        }
    };

    const onCoverChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const url = await uploadToCloudinary(file);
        setValue("cover_image_url", url, { shouldValidate: true });
    };

    const onLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const url = await uploadToCloudinary(file);
        setValue("logo_image_url", url, { shouldValidate: true });
    };

    const onDocChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const type = e.target.dataset.type || "document";
        const url = await uploadToCloudinary(file);
        const docs = getValues("documents") ?? [];
        setValue("documents", [...docs, { type, url }]);
    };

    const addDocUrl = (type: string, url: string) => {
        if (!url) return toast.error("URL requise");
        const docs = getValues("documents") ?? [];
        setValue("documents", [...docs, { type, url }]);
        toast.success("Document ajouté");
    };

    const toastSuccess = (msg: string) => toast.success(msg);
    const toastError = (msg: string) => toast.error(msg);

    const canNext = () => {
        if (step === 0) return !!(getValues("name") && getValues("email") && getValues("password"));
        if (step === 1) return !!getValues("shop_name");
        return true;
    };

    const goNext = () => {
        if (!canNext()) {
            toastError(step === 0 ? "Complétez le compte d'abord" : "Complétez le formulaire");
            return;
        }
        setStep((s) => Math.min(s + 1, STEPS.length - 1));
    };
    const goPrev = () => setStep((s) => Math.max(s - 1, 0));

    const onSubmit = async (data: FormValues) => {
        if (!data.password) {
            toastError("Mot de passe requis");
            return;
        }
        setIsSubmitting(true);

        const payload = {
            user: {
                name: data.name,
                email: data.email,
                password: data.password,
            },
            shop: {
                name: data.shop_name,
                slug: data.slug,
                description: data.description,
                contact: data.contact,
                website: data.website,
                address: {
                    street_address: data.street_address ?? null,
                    zip: data.zip ?? null,
                    city: data.city ?? null,
                    country: data.country ?? null,
                },
                location: null,
                cover_image: data.cover_image_url ? { url: data.cover_image_url } : null,
                logo_image: data.logo_image_url ? { url: data.logo_image_url } : null,
                documents: data.documents ?? [],
                bank: {
                    account_number: data.bank_account_number ?? null,
                    account_name: data.bank_account_name ?? null,
                    iban: data.bank_iban ?? null,
                },
            },
        };

        try {
            const endpoint = `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/shops/register-vendor`;

            if (!endpoint) throw new Error("NEXT_PUBLIC_REST_API_ENDPOINT not configured");

            await axios.post(endpoint, payload);

            toastSuccess("Inscription réussie ✨");
            router.replace('/become_seller/becomeseller_end')
            setIsSubmitting(false);
        }
        catch (err: any) {
            console.error("submit error", err);

            const backendMessage = err?.response?.data?.message;

            let message = "Une erreur est survenue. Veuillez réessayer.";
            console.log("backendMessage", backendMessage)
            // 🎯 Match précis avec les erreurs du backend
            if (backendMessage?.includes("Cet email est déjà associé à un compte")) {
                message = "Cet email est déjà associé à un compte";
            }
            else if (backendMessage?.includes("Password missing from request")) {
                message = "Veuillez renseigner un mot de passe valide.";
            }
            else if (backendMessage?.startsWith("Vendor registration failed")) {
                message = "Une erreur est survenue lors de l'inscription.";
            }
            else if (err?.message?.includes("Network Error")) {
                message = "Connexion impossible. Vérifiez votre réseau.";
            }

            // Toast final
            toastError(message);
            setIsSubmitting(false);
        }

    };

    const StepIndicator = ({ i }: { i: number }) => {
        const active = i === step;
        const done = i < step;
        return (
            <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold ${done ? "bg-emerald-500 text-white" : active ? "bg-indigo-600 text-white shadow" : "bg-slate-100 text-slate-500"}`}>
                    {done ? <Check size={14} /> : i + 1}
                </div>
                <div className={`hidden md:block text-xs ${active ? "text-slate-900 font-medium" : "text-slate-500"}`}>{STEPS[i]}</div>
            </div>
        );
    };

    const stepField = (children: React.ReactNode) => (
        <motion.div variants={fieldVariants} className="space-y-3">
            {children}
        </motion.div>
    );

    return (
        <div className="min-h-screen md:h-[100vh] lg:h-[100vh] bg-gradient-to-br from-white to-slate-50 flex items-center justify-center md:p-6 lg:p-6">
            <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* LEFT HERO **/}
                <aside className="lg:col-span-5 bg-gradient-to-b from-indigo-700 via-indigo-600 to-indigo-500 text-white md:rounded-[5px] lg:rounded-[5px] overflow-hidden shadow-[5px] relative">
                    <div className="p-8 md:p-10 flex flex-col h-full">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                                <Shield size={20} />
                            </div>
                            <div>
                                <h2 className="text-xl font-extrabold leading-tight">Devenir fournisseur GalileeCommerce</h2>
                                <p className="text-sm opacity-90 mt-1">Inscrivez-vous et lancez votre B space en quelques minutes. Design premium, paiements sécurisés.</p>
                            </div>
                        </div>

                        <div className="mt-6 flex-1 flex flex-col justify-center">
                            {/* fonctionnelle image à gauche */}
                            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                                {/* utilisation d'une image externe pour être fonctionnelle sans config domains — fallback de qualité */}
                                <img src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=2f3b3a3f6b1c9b2a7f4a" alt="hero" className="w-full h-56 object-cover" />
                            </div>

                            <div className="mt-6 grid gap-3">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 rounded-lg bg-white/10">
                                        <Check />
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold">Vérification manuelle</div>
                                        <div className="text-xs opacity-90">Documents vérifiés par notre équipe.</div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="p-2 rounded-lg bg-white/10">
                                        <CreditCard />
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold">Paiements sécurisés</div>
                                        <div className="text-xs opacity-90">Vos informations bancaires sont protégées.</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 text-xs opacity-90">Ayez vos documents (identité, registre & RIB) à portée de main pour accélérer la validation.</div>
                    </div>
                </aside>

                {/* RIGHT FORM */}
                <main className="lg:col-span-7 bg-white md:rounded-[5px] lg:rounded-[5px] shadow-[5px] p-6 md:p-8 border border-slate-100">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="flex items-center justify-between mb-8">
                            {/* LEFT TITLE */}
                            <div>
                                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                                    Créer votre compte
                                </h1>
                                <p className="text-sm text-slate-500 mt-1">
                                    4 étapes — simple et rapide
                                </p>
                            </div>

                            {/* RIGHT — STEP INDICATORS */}
                            <div className="flex items-center gap-4">

                                {/* DESKTOP STEPPER */}
                                <div className="hidden md:flex items-center gap-3">
                                    {STEPS.map((t, i) => {
                                        const isActive = i === step;
                                        const isDone = i < step;

                                        return (
                                            <div
                                                key={t}
                                                className={`
                                                w-9 h-9 rounded-full flex items-center justify-center border text-sm font-medium
                                                transition-all duration-300
                                                ${isActive
                                                        ? "bg-slate-900 text-white border-slate-900 shadow-[0_0_10px_rgba(0,0,0,0.15)]"
                                                        : isDone
                                                            ? "bg-slate-900 text-white border-slate-900"
                                                            : "border-slate-300 text-slate-400 bg-white"
                                                    }
                                            `}
                                            >
                                                {i + 1}
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* MOBILE */}
                                <div className="md:hidden text-xs text-slate-500">
                                    Étape <span className="text-slate-900 font-semibold">{step + 1}</span>
                                    / {STEPS.length}
                                </div>
                            </div>
                        </div>


                        <AnimatePresence mode="wait">
                            {/* STEP 0 */}
                            {step === 0 && (
                                <motion.div key="s0" variants={containerVariants} initial="hidden" animate="show" exit="hidden" className="space-y-4 md:h-[55vh] overflow-y-auto overflow-x-hidden scrollbar-hide ">
                                    {stepField(
                                        <>
                                            <FloatingInput id="name" label="Nom complet" icon={<User size={16} />} error={errors.name?.message} {...register("name", { required: "Nom requis" })} />

                                            <FloatingInput id="email" label="Email" icon={<Mail size={16} />} error={errors.email?.message} {...register("email", { required: "Email requis", pattern: { value: /\S+@\S+\.\S+/, message: "Email invalide" } })} />

                                            <FloatingInput id="password" label="Mot de passe" type="password" icon={<Lock size={16} />} error={errors.password?.message} {...register("password", { required: "Mot de passe requis", minLength: { value: 6, message: "6 caractères minimum" } })} />
                                        </>
                                    )}
                                </motion.div>
                            )}

                            {/* STEP 1 */}
                            {step === 1 && (
                                <motion.div key="s1" variants={containerVariants} initial="hidden" animate="show" exit="hidden" className="space-y-4 md:h-[55vh] overflow-y-auto overflow-x-hidden scrollbar-hide">
                                    {stepField(
                                        <>
                                            <FloatingInput id="shop_name" label="Nom de votre B space" icon={<Store size={16} />} error={errors.shop_name?.message} {...register("shop_name", { required: "Nom de votre B space requis" })} />

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                <FloatingInput id="website" label="Site web (optionnel)" icon={<Globe size={16} />} {...register("website")} />

                                                <FloatingInput id="contact" label="Téléphone" icon={<Phone size={16} />} {...register("contact")} />
                                            </div>

                                            <div>
                                                <label className="block text-xs mb-2 text-slate-500">Courte description</label>
                                                <textarea {...register("description")} placeholder="Parlez brièvement de votre B space" className="w-full min-h-[90px] px-4 py-3 rounded-2xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-100 resize-none" />
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {/* COVER */}
                                                <div className="flex flex-col">
                                                    <label className="text-xs text-slate-500 mb-2 block">Cover</label>

                                                    <div className="rounded-2xl border border-dashed border-slate-200 p-4 bg-white flex flex-col flex-1">

                                                        {/* PREVIEW */}
                                                        {coverPreview ? (
                                                            <img
                                                                src={coverPreview as string}
                                                                alt="cover preview"
                                                                className="w-full h-44 md:h-40 object-cover rounded-xl"
                                                            />
                                                        ) : (
                                                            <div className="flex flex-col flex-1 items-center justify-center py-6">
                                                                <ImageIcon className="w-6 h-6 text-slate-400" />
                                                                <p className="text-xs text-slate-400 mt-2 text-center">
                                                                    Importer une image ou coller une URL
                                                                </p>
                                                            </div>
                                                        )}

                                                        {/* INPUTS */}
                                                        <div className="mt-4 flex flex-col gap-3">
                                                            <label className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-3 py-2 text-sm cursor-pointer hover:bg-slate-50">
                                                                Importer
                                                                <input
                                                                    type="file"
                                                                    accept="image/*"
                                                                    onChange={onCoverChange}
                                                                    className="hidden"
                                                                />
                                                            </label>

                                                            <input
                                                                {...register("cover_image_url")}
                                                                placeholder="ou coller une URL"
                                                                className="px-3 py-2 rounded-xl border border-slate-200 text-sm"
                                                                onBlur={(e) => setValue("cover_image_url", e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* LOGO */}
                                                <div className="flex flex-col">
                                                    <label className="text-xs text-slate-500 mb-2 block">Logo</label>

                                                    <div className="rounded-2xl border border-dashed border-slate-200 p-4 bg-white flex flex-col flex-1">

                                                        {/* PREVIEW */}
                                                        {logoPreview ? (
                                                            <img
                                                                src={logoPreview as string}
                                                                alt="logo preview"
                                                                className="w-full h-44 md:h-40 object-cover rounded-xl"
                                                            />
                                                        ) : (
                                                            <div className="flex flex-col flex-1 items-center justify-center py-6">
                                                                <ImageIcon className="w-6 h-6 text-slate-400" />
                                                                <p className="text-xs text-slate-400 mt-2 text-center">
                                                                    Importer un logo ou coller une URL
                                                                </p>
                                                            </div>
                                                        )}

                                                        {/* INPUTS */}
                                                        <div className="mt-4 flex flex-col gap-3">
                                                            <label className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-3 py-2 text-sm cursor-pointer hover:bg-slate-50">
                                                                Importer
                                                                <input
                                                                    type="file"
                                                                    accept="image/*"
                                                                    onChange={onLogoChange}
                                                                    className="hidden"
                                                                />
                                                            </label>

                                                            <input
                                                                {...register("logo_image_url")}
                                                                placeholder="ou coller une URL"
                                                                className="px-3 py-2 rounded-xl border border-slate-200 text-sm"
                                                                onBlur={(e) => setValue("logo_image_url", e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* ───────────────────────  Adresse du magasin  ─────────────────────── */}
                                            <div className="p-5 rounded-2xl border bg-white shadow-sm mt-8">
                                                <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2 mb-4">
                                                    <MapPin className="w-5 h-5 text-slate-500" />
                                                    Adresse de votre entreprise
                                                </h2>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                                    {/* Rue */}
                                                    <div>
                                                        <label className="text-xs text-slate-500 mb-1 block">Adresse complète</label>
                                                        <input
                                                            {...register("street_address")}
                                                            placeholder="Rue, avenue, bâtiment…"
                                                            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-slate-400 focus:outline-none"
                                                        />
                                                    </div>

                                                    {/* Code Postal */}
                                                    <div>
                                                        <label className="text-xs text-slate-500 mb-1 block">Code postal</label>
                                                        <input
                                                            {...register("zip")}
                                                            placeholder="Ex : 75000"
                                                            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-slate-400 focus:outline-none"
                                                        />
                                                    </div>

                                                    {/* Ville */}
                                                    <div>
                                                        <label className="text-xs text-slate-500 mb-1 block">Ville</label>
                                                        <input
                                                            {...register("city")}
                                                            placeholder="Ex : Paris"
                                                            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-slate-400 focus:outline-none"
                                                        />
                                                    </div>

                                                    {/* Pays */}
                                                    <div>
                                                        <label className="text-xs text-slate-500 mb-1 block">Pays</label>
                                                        <input
                                                            {...register("country")}
                                                            placeholder="Ex : France"
                                                            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-slate-400 focus:outline-none"
                                                        />
                                                    </div>

                                                </div>
                                            </div>


                                        </>
                                    )}
                                </motion.div>
                            )}

                            {/* STEP 2 */}
                            {step === 2 && (
                                <motion.div key="s2" variants={containerVariants} initial="hidden" animate="show" exit="hidden" className="space-y-4 md:h-[55vh] overflow-y-auto overflow-x-hidden scrollbar-hide">
                                    {stepField(
                                        <>
                                            <h3 className="text-sm font-medium text-slate-700">Documents d'entreprise</h3>
                                            <div className="space-y-3">
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                                    <input id="docType" placeholder="Type (ex: business_license)" className="px-3 py-2 rounded-lg border" />
                                                    <input id="docUrl" placeholder="URL du document" className="px-3 py-2 rounded-lg border" />
                                                    <button type="button" onClick={() => {
                                                        const t = (document.getElementById("docType") as HTMLInputElement).value || "business_license";
                                                        const u = (document.getElementById("docUrl") as HTMLInputElement).value;
                                                        if (!u) return toastError("URL du document requise");
                                                        addDocUrl(t, u);
                                                        (document.getElementById("docType") as HTMLInputElement).value = "";
                                                        (document.getElementById("docUrl") as HTMLInputElement).value = "";
                                                    }} className="px-4 py-2 rounded-lg bg-indigo-600 text-white">Ajouter</button>
                                                </div>

                                                <div className="flex flex-col md:flex-row gap-4 w-full">

                                                    {/* Pièce d'identité */}
                                                    <label className="flex-1 cursor-pointer">
                                                        <input
                                                            type="file"
                                                            data-type="id_card"
                                                            onChange={onDocChange}
                                                            className="hidden"
                                                        />

                                                        <div className="w-full h-24 p-4 rounded-xl border border-slate-300 
                        flex items-center gap-4 transition-all 
                        hover:border-[#FF6EA9] hover:bg-[#FF6EA9]/5">
                                                            <Inbox className="w-8 h-8 text-[#FF6EA9]" />
                                                            <div>
                                                                <div className="text-sm font-semibold">Pièce d'identité</div>
                                                                <div className="text-xs text-slate-500">JPEG / PNG</div>
                                                            </div>
                                                        </div>
                                                    </label>

                                                    {/* Registre de commerce */}
                                                    <label className="flex-1 cursor-pointer">
                                                        <input
                                                            type="file"
                                                            data-type="business_license"
                                                            onChange={onDocChange}
                                                            className="hidden"
                                                        />

                                                        <div className="w-full h-24 p-4 rounded-xl border border-slate-300 
                        flex items-center gap-4 transition-all 
                        hover:border-[#FF6EA9] hover:bg-[#FF6EA9]/5">
                                                            <FileText className="w-8 h-8 text-[#FF6EA9]" />
                                                            <div>
                                                                <div className="text-sm font-semibold">Registre de commerce</div>
                                                                <div className="text-xs text-slate-500">PDF ou image</div>
                                                            </div>
                                                        </div>
                                                    </label>

                                                </div>


                                                <div>
                                                    {(documents || []).map((d: DocItem, i: number) => (
                                                        <div key={i} className="flex items-center gap-3 p-3 border rounded-lg mb-2">
                                                            <FileText />
                                                            <div className="flex-1">
                                                                <div className="text-sm font-medium">{d.type}</div>
                                                                <div className="text-xs text-slate-500 break-all">{d.url}</div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <h3 className="text-sm font-medium text-slate-700 mt-4">Informations bancaires</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                <input placeholder="Titulaire du compte" className="px-4 py-3 rounded-2xl border" {...register("bank_account_name")} />
                                                <input placeholder="Numéro de compte" className="px-4 py-3 rounded-2xl border" {...register("bank_account_number")} />
                                                <input placeholder="IBAN (optionnel)" className="px-4 py-3 rounded-2xl border md:col-span-2" {...register("bank_iban")} />
                                            </div>
                                        </>
                                    )}
                                </motion.div>
                            )}

                            {/* STEP 3: REVIEW */}
                            {step === 3 && (
                                <motion.div
                                    key="s3"
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="show"
                                    exit="hidden"
                                    className="space-y-6 md:h-[55vh] overflow-y-auto overflow-x-hidden scrollbar-hide"
                                >
                                    <h3 className="text-xl font-semibold text-slate-800 tracking-tight">
                                        Vérifiez vos informations
                                    </h3>

                                    <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6 space-y-6">

                                        {/* IDENTITÉ */}
                                        <div className="space-y-4">
                                            <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-700 uppercase tracking-wide">
                                                <User className="w-4 h-4 text-slate-500" />
                                                Identité
                                            </h4>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                                <InfoLine label="Nom" value={getValues("name")} />
                                                <InfoLine label="Email" value={getValues("email")} />
                                            </div>
                                        </div>

                                        {/* BUSINESS */}
                                        <div className="space-y-4">
                                            <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-700 uppercase tracking-wide">
                                                <Store className="w-4 h-4 text-slate-500" />
                                                Business
                                            </h4>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                                <InfoLine label="B Space" value={getValues("shop_name")} />
                                                <InfoLine label="Contact" value={getValues("contact") ?? ""} />
                                                <InfoLine
                                                    label="Adresse"
                                                    value={`${getValues("street_address")}, ${getValues("city")}, ${getValues("country")}`}
                                                    full
                                                />
                                            </div>
                                        </div>

                                        {/* IMAGES */}
                                        <div className="space-y-4">
                                            <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-700 uppercase tracking-wide">
                                                <ImageIcon className="w-4 h-4 text-slate-500" />
                                                Médias
                                            </h4>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                                {getValues("cover_image_url") && (
                                                    <MediaPreview
                                                        label="Cover"
                                                        src={getValues("cover_image_url") ?? ""}
                                                    />
                                                )}

                                                {getValues("logo_image_url") && (
                                                    <MediaPreview
                                                        label="Logo"
                                                        src={getValues("logo_image_url") ?? ""}
                                                    />
                                                )}

                                            </div>
                                        </div>

                                        {/* DOCUMENTS */}
                                        <div className="space-y-4">
                                            <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-700 uppercase tracking-wide">
                                                <FileText className="w-4 h-4 text-slate-500" />
                                                Documents
                                            </h4>

                                            <ul className="space-y-3">
                                                {(getValues("documents") || []).map((d: DocItem, i: number) => (
                                                    <li
                                                        key={i}
                                                        className="flex items-center justify-between bg-slate-50 rounded-xl border p-3 hover:bg-slate-100 transition"
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <File className="w-4 h-4 text-slate-600" />
                                                            <span className="font-medium text-slate-700">
                                                                {d.type}
                                                            </span>
                                                        </div>

                                                        <a
                                                            href={d.url}
                                                            target="_blank"
                                                            className="text-xs text-blue-600 hover:text-blue-800 underline"
                                                        >
                                                            Voir le fichier
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                    </div>
                                </motion.div>

                            )}
                        </AnimatePresence>

                        {/* NAVIGATION */}
                        <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                                {step > 0 && (
                                    <button type="button" onClick={goPrev} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border hover:bg-slate-50">
                                        <ArrowLeft size={16} /> Précédent
                                    </button>
                                )}
                            </div>

                            <div className="flex items-center gap-3">
                                {step < STEPS.length - 1 ? (
                                    <button type="button" onClick={goNext} className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 text-white font-medium hover:brightness-95">
                                        Suivant <ArrowRight size={16} />
                                    </button>
                                ) : (
                                    <button type="submit" disabled={isSubmitting} className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-pink-500 text-white font-medium shadow-lg">
                                        {isSubmitting ? "Envoi..." : "Valider"} <Check size={16} />
                                    </button>
                                )}
                            </div>
                        </div>

                        {uploading && (
                            <div className="mt-2 text-xs text-slate-500">Upload en cours: {uploadProgress}%</div>
                        )}
                    </form>
                </main>
            </div>
        </div>
    );
}

/* ---------------- Helpers ---------------- */

const FloatingInput = React.forwardRef<HTMLInputElement, any>(
    ({ id, label, icon, error, type = "text", ...rest }, ref) => {
        return (
            <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500">
                    {icon}
                </div>

                <input
                    ref={ref}          // <-- OBLIGATOIRE pour RHF
                    id={id}
                    type={type}
                    {...rest}          // <-- RHF events connectés correctement
                    className={`w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-100 
            focus:ring-2 focus:ring-indigo-100 outline-none 
            ${error ? "ring-pink-200" : ""}`}
                    placeholder={label}
                />

                {error && <p className="text-pink-600 text-sm mt-1">{error}</p>}
            </div>
        );
    }
);

FloatingInput.displayName = "FloatingInput";
const InfoLine = ({
    label,
    value,
    full = false,
}: {
    label: string;
    value: string;
    full?: boolean;
}) => (
    <div className={`${full ? "md:col-span-2" : ""}`}>
        <p className="text-[13px] text-slate-500 font-medium">{label}</p>
        <p className="text-slate-800 font-semibold mt-0.5">{value || "-"}</p>
    </div>
);

const MediaPreview = ({ label, src }: { label: string; src: string }) => (
    <div className="space-y-2">
        <p className="text-[13px] text-slate-500 font-medium">{label}</p>
        <img
            src={src}
            alt={label}
            className="w-full h-32 object-cover rounded-2xl border shadow-sm bg-white"
        />
    </div>
);
