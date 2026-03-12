"use client";

import React, { useState } from "react";
import Image from "next/image";
import Firstimage from "@/assets/images/ge-ambassador/formulaireimage.png";
import axios from "axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import ErrorMessage from "../../components/form/ErrorMessage";
import {
    User,
    Mail,
    Lock,
    Store,
    Image as ImageIcon,
    FileText,
    Phone,
    CircleCheck,
    ArrowRight,
    ArrowLeft,
    Globe,
    CreditCard,
    Shield,
    XCircle,
    File,
    Headset,
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
    vendor_type?: string;
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
        trigger,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {
            documents: [],
            cover_image_url: null,
            logo_image_url: null
        }
    });

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

    const goNext = async () => {

        let fields: (keyof FormValues)[] = [];

        if (step === 0) {
            fields = ["name", "email", "password"];
        }

        if (step === 1) {
            fields = [
                "shop_name",
                "website",
                "contact",
                "description",
                "cover_image_url",
                "logo_image_url",
                "street_address",
                "zip",
                "city",
                "country",
                "vendor_type"
            ];
        }

        if (step === 2) {
            fields = [
                "bank_account_name",
                "bank_account_number",
                "bank_iban"
            ];
        }

        const valid = await trigger(fields);

        if (!valid) {
            //toastError("Veuillez remplir tous les champs obligatoires");
            return;
        }
        // 🔴 VALIDATION DES DOCUMENTS
        if (step === 2) {

            const hasIdCard = documents?.some((d: DocItem) => d.type === "id_card");
            const hasBusinessLicense = documents?.some((d: DocItem) => d.type === "business_license");

            if (!hasIdCard) {
                toastError("Veuillez fournir une pièce d'identité");
                return;
            }

            if (!hasBusinessLicense) {
                toastError("Veuillez fournir le registre de commerce");
                return;
            }
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
                vendor_type: data.vendor_type ?? null,
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
            } else if (backendMessage?.includes("Ce nom de boutique est déjà utilisé")) {
                message = "Ce nom de boutique est déjà utilisé.";
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
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold ${done ? "bg-emerald-500 text-white" : active ? "btn-galilee text-white shadow" : "bg-slate-100 text-slate-500"}`}>
                    {done ? <CircleCheck size={14} /> : i + 1}
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
        <div className="min-h-screen md:h-[100vh] lg:h-[100vh] bg-[#07131F] flex items-center justify-center">
            <div className="w-full  grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* LEFT HERO **/}
                <aside className="lg:h-[100vh] lg:col-span-6 text-white md:rounded-[5px] lg:rounded-[5px] overflow-hidden shadow-[5px] relative">

                    {/* Background image */}
                    <Image
                        src={Firstimage}
                        alt="Devenir vendeur sur Galilé E-commerce"
                        fill
                        className="object-cover"
                        priority
                    />

                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black/80"></div>

                    <div className="relative p-8 md:p-10 flex flex-col h-full">
                        <div className="flex items-start gap-4">
                            <div className="p-2 rounded-lg bg-white/10">
                                <Shield size={20} />
                            </div>
                            <div>
                                <h3 className="text-xl font-extrabold leading-tight">
                                    Devenez fournisseur sur Galilé E-commerce et développez votre entreprise à l’échelle africaine et mondiale
                                </h3>
                                <p className="text-sm opacity-90 mt-1">
                                    Rejoignez la plus grande plateforme de commerce en ligne en Afrique.
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 flex-1 flex flex-col justify-center">

                            <div className="mt-6 grid gap-3">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 rounded-lg bg-white/10">
                                        <CircleCheck />
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-xl">Vérification manuelle</div>
                                        <div className="text-xs opacity-90">Documents vérifiés par notre équipe.</div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="p-2 rounded-lg bg-white/10">
                                        <CreditCard />
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-xl">Paiements sécurisés</div>
                                        <div className="text-xs opacity-90">Vos informations bancaires sont protégées.</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="p-2 rounded-lg bg-white/10">
                                        <Headset />
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-xl">Support dédié</div>
                                        <div className="text-xs opacity-90">
                                            Notre équipe accompagne les vendeurs à chaque étape.
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="p-2 rounded-lg bg-white/10">
                                        <Globe />
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-xl">Visibilité internationale</div>
                                        <div className="text-xs opacity-90">
                                            Touchez des clients en Afrique et dans le monde.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 text-xs opacity-90">
                            Ayez vos documents (identité, registre & RIB) à portée de main pour accélérer la validation.
                        </div>
                    </div>
                </aside>

                {/* RIGHT FORM */}
                <main className="lg:h-[100vh] lg:col-span-6 bg-[#07131F] md:rounded-[5px] lg:rounded-[5px] shadow-[5px] p-6 md:p-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="flex items-center justify-between mb-8">
                            {/* LEFT TITLE */}
                            <div>
                                <h1 className="text-3xl font-bold text-slate-900 tracking-tight text-white">
                                    Créez votre compte
                                </h1>
                                <p className="text-white text-slate-500 mt-1">
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
                                                        ? "btn-galilee text-white border-slate-900 shadow-[0_0_10px_rgba(0,0,0,0.15)]"
                                                        : isDone
                                                            ? "btn-galilee text-white border-indigo-600"
                                                            : "border-indigo-600 text-slate-400 bg-white"
                                                    }
                                            `}
                                            >
                                                {i + 1}
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* MOBILE */}
                                <div className="md:hidden text-xs text-slate-500 text-white">
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
                                            <FloatingInput id="name" label="Nom complet" icon={<User size={16} className="text-white" />} error={errors.name?.message} {...register("name", { required: "Nom requis" })} />


                                            <FloatingInput id="email" label="Email" icon={<Mail size={16} className="text-white" />} error={errors.email?.message} {...register("email", { required: "Email requis", pattern: { value: /\S+@\S+\.\S+/, message: "Email invalide" } })} />

                                            <FloatingInput id="password" label="Mot de passe" type="password" icon={<Lock size={16} className="text-white" />} error={errors.password?.message} {...register("password", { required: "Mot de passe requis", minLength: { value: 6, message: "6 caractères minimum" } })} />
                                        </>
                                    )}
                                </motion.div>
                            )}

                            {/* STEP 1 */}
                            {step === 1 && (
                                <motion.div key="s1" variants={containerVariants} initial="hidden" animate="show" exit="hidden" className="space-y-4 md:h-[65vh] overflow-y-auto overflow-x-hidden scrollbar-hide">
                                    {stepField(
                                        <>
                                            <FloatingInput id="shop_name" label="Nom de votre B space (Votre boutique en ligne) " icon={<Store size={16} className="text-white" />} error={errors.shop_name?.message} {...register("shop_name", { required: "Nom de votre B space requis" })} />

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                <FloatingInput id="website" label="Site web" icon={<Globe size={16} className="text-white" />} error={errors.website?.message} {...register("website", { required: "le site est requis" })} />

                                                <FloatingInput
                                                    id="contact"
                                                    type="tel"
                                                    label="Téléphone"
                                                    icon={<Phone size={16} className="text-white" />}
                                                    error={errors.contact?.message}
                                                    {...register("contact", {
                                                        required: "Le contact est requis",
                                                        pattern: {
                                                            value: /^\+\d{1,14}$/, // doit commencer par + suivi de 1 à 14 chiffres
                                                            message: "Le numéro doit commencer par + et contenir uniquement des chiffres",
                                                        },
                                                    })}
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-xs mb-2 text-slate-500">Courte description</label>
                                                <textarea {...register("description", { required: "La description est requis" })} placeholder="Décrivez brièvement de votre B space" className="form-textarea-epure w-full min-h-[90px] px-4 py-3 rounded-[5px] border border-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-100 resize-none" />
                                                <ErrorMessage message={errors.description?.message} />
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {/* COVER */}
                                                <div className="flex flex-col">
                                                    <label className="text-xs text-slate-500 mb-2 block">Cover</label>
                                                    <div className="form-textarea-epure rounded-[5px] border border-dashed border-slate-200 p-4 glass-card flex flex-col flex-1">

                                                        {/* PREVIEW */}
                                                        {coverPreview ? (
                                                            <img
                                                                src={coverPreview as string}
                                                                alt="cover preview"
                                                                className="w-full h-44 md:h-40 object-cover rounded-xl"
                                                            />
                                                        ) : (
                                                            <div className="form-textarea-epure flex flex-col flex-1 items-center justify-center py-6">
                                                                <ImageIcon className="w-6 h-6 text-slate-400 text-white" />
                                                                <p className="text-xs text-slate-400 mt-2 text-center text-white">
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
                                                                    className="hidden form-input-epure"
                                                                />
                                                            </label>

                                                            <input
                                                                {...register("cover_image_url", { required: "Le cover image est requis" })}
                                                                placeholder="ou coller une URL"
                                                                className="form-input-epure px-3 py-2 rounded-xl border border-slate-200 text-sm"
                                                                onBlur={(e) => setValue("cover_image_url", e.target.value)}
                                                            />
                                                            <ErrorMessage message={errors.cover_image_url?.message} />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* LOGO */}
                                                <div className="flex flex-col">
                                                    <label className="text-xs text-slate-500 mb-2 block">Logo</label>

                                                    <div className="rounded-[5px] border border-dashed border-slate-200 p-4 glass-card flex flex-col flex-1">

                                                        {/* PREVIEW */}
                                                        {logoPreview ? (
                                                            <img
                                                                src={logoPreview as string}
                                                                alt="logo preview"
                                                                className="w-full h-44 md:h-40 object-cover rounded-xl"
                                                            />
                                                        ) : (
                                                            <div className="flex flex-col flex-1 items-center justify-center py-6 text-white">
                                                                <ImageIcon className="w-6 h-6 text-slate-400 text-white" />
                                                                <p className="text-xs text-slate-400 mt-2 text-center text-white">
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
                                                                    className="hidden form-input-epure"
                                                                />
                                                            </label>

                                                            <input
                                                                {...register("logo_image_url", { required: "Votre logo est requis" })}
                                                                placeholder="ou coller une URL"
                                                                className="form-input-epure px-3 py-2 rounded-xl border border-slate-200 text-sm"
                                                                onBlur={(e) => setValue("logo_image_url", e.target.value)}
                                                            />
                                                            <ErrorMessage message={errors.logo_image_url?.message} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* ───────────────────────  Adresse du magasin  ─────────────────────── */}
                                            <div className="p-5 rounded-[5px] border glass-card shadow-sm mt-8">
                                                <h2 className="text-white text-lg font-semibold text-slate-800 flex items-center gap-2 mb-4">
                                                    <MapPin className="w-5 h-5 text-slate-500 text-white" />
                                                    Adresse de votre entreprise
                                                </h2>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                                    {/* Rue */}
                                                    <div>
                                                        <label className="text-xs text-slate-500 mb-1 block">Adresse complète</label>
                                                        <input
                                                            {...register("street_address", { required: "Votre addresse est requis" })}
                                                            placeholder="Rue, avenue, bâtiment…"
                                                            className="form-input-epure w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-slate-400 focus:outline-none"
                                                        />
                                                        <ErrorMessage message={errors.street_address?.message} />
                                                    </div>

                                                    {/* Code Postal */}
                                                    <div>
                                                        <label className="text-xs text-slate-500 mb-1 block">Code postal</label>
                                                        <input
                                                            {...register("zip", { required: "Votre code postal est requis" })}
                                                            placeholder="Ex : 75000"
                                                            className="form-input-epure w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-slate-400 focus:outline-none"
                                                        />
                                                        <ErrorMessage message={errors.zip?.message} />
                                                    </div>

                                                    {/* Ville */}
                                                    <div>
                                                        <label className="text-xs text-slate-500 mb-1 block">Ville</label>
                                                        <input
                                                            {...register("city", { required: "La ville est requise" })}
                                                            placeholder="Ex : Paris"
                                                            className="form-input-epure w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-slate-400 focus:outline-none"
                                                        />
                                                        <ErrorMessage message={errors.city?.message} />
                                                    </div>

                                                    {/* Pays */}
                                                    <div>
                                                        <label className="text-xs text-slate-500 mb-1 block">Pays</label>
                                                        <input
                                                            {...register("country", { required: "Votre pays est requis" })}
                                                            placeholder="Ex : France"
                                                            className="form-input-epure w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-slate-400 focus:outline-none"
                                                        />
                                                        <ErrorMessage message={errors.country?.message} />
                                                    </div>
                                                    <div className="md:col-span-2">
                                                        <label className="block text-xs text-slate-500 mb-1">
                                                            Quel type de fournisseur êtes-vous ?
                                                        </label>

                                                        <select
                                                            {...register("vendor_type", { required: true })}
                                                            className="form-input-epure px-4 py-3 rounded-[5px] border w-full bg-rgba(236, 102, 102, 0.9)"
                                                            defaultValue=""
                                                        >
                                                            <option value="" disabled>
                                                                Sélectionnez un type
                                                            </option>
                                                            <option value="manufacturer">Fabricant</option>
                                                            <option value="service_provider">Fournisseur de services</option>
                                                            <option value="distributor">Distributeur</option>
                                                            <option value="individual">Particulier</option>
                                                        </select>
                                                        <ErrorMessage message={errors.vendor_type?.message} />
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
                                            <h3 className="text-sm font-medium text-slate-700 text-white">Documents d'entreprise</h3>
                                            <div className="space-y-3">
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                                    <input id="docType" placeholder="Type (ex: business_license)" className="form-input-epure px-3 py-2 rounded-lg border" />
                                                    <input id="docUrl" placeholder="URL du document" className="form-input-epure px-3 py-2 rounded-lg border" />
                                                    <button type="button" onClick={() => {
                                                        const t = (document.getElementById("docType") as HTMLInputElement).value || "business_license";
                                                        const u = (document.getElementById("docUrl") as HTMLInputElement).value;
                                                        if (!u) return toastError("URL du document requise");
                                                        addDocUrl(t, u);
                                                        (document.getElementById("docType") as HTMLInputElement).value = "";
                                                        (document.getElementById("docUrl") as HTMLInputElement).value = "";
                                                    }} className="px-4 py-2 rounded-lg btn-galilee text-white">Ajouter</button>
                                                </div>

                                                <div className="flex flex-col md:flex-row gap-4 w-full">

                                                    {/* Pièce d'identité */}
                                                    <label className="flex-1 cursor-pointer">
                                                        <input
                                                            type="file"
                                                            data-type="id_card"
                                                            onChange={onDocChange}
                                                            className="hidden"
                                                            required
                                                        />

                                                        <div className="w-full h-24 p-4 rounded-[5px] border border-slate-300 
                                                            flex items-center gap-4 transition-all 
                                                            hover:border-[#FF6EA9] hover:bg-[#FF6EA9]/5">
                                                            <Inbox className="w-8 h-8 text-[#FF6EA9]" />
                                                            <div>
                                                                <div className="text-sm font-semibold text-white">Pièce d'identité</div>
                                                                <div className="text-xs text-slate-500 text-white">JPEG / PNG</div>
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
                                                            required
                                                        />

                                                        <div className="w-full h-24 p-4 rounded-[5px] border border-slate-300 
                                                        flex items-center gap-4 transition-all 
                                                        hover:border-[#FF6EA9] hover:bg-[#FF6EA9]/5">
                                                            <FileText className="w-8 h-8 text-[#FF6EA9]" />
                                                            <div>
                                                                <div className="text-sm font-semibold text-white">Registre de commerce</div>
                                                                <div className="text-xs text-slate-500 text-white">PDF ou image</div>
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

                                            <h3 className="text-sm font-medium text-slate-700 mt-4 text-white">Informations bancaires</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                <input placeholder="Titulaire du compte" className="form-input-epure px-4 py-3 rounded-[5px] border" {...register("bank_account_name", { required: "Le nom du compte est requis" })} />
                                                {errors.bank_account_name && (
                                                    <p className="text-pink-600 text-sm mt-1">
                                                        {errors.bank_account_name.message}
                                                    </p>
                                                )}
                                                <input placeholder="Numéro de compte" className="form-input-epure px-4 py-3 rounded-[5px] border" {...register("bank_account_number", { required: "Le numéro du compte est requis" })} />
                                                <ErrorMessage message={errors.bank_account_number?.message} />
                                                <input placeholder="IBAN (optionnel)" className="form-input-epure px-4 py-3 rounded-[5px] border md:col-span-2" {...register("bank_iban", { required: "L'IBAN du compte est requis" })} />
                                                <ErrorMessage message={errors.bank_iban?.message} />
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
                                    className="space-y-6 md:h-[55vh] overflow-y-auto overflow-x-hidden scrollbar-hide text-white"
                                >
                                    <h3 className="text-xl font-semibold text-slate-800 tracking-tight text-white">
                                        Vérifiez vos informations
                                    </h3>

                                    <div className="rounded-3xl glass-card border border-slate-200 shadow-sm p-6 space-y-6">

                                        {/* IDENTITÉ */}
                                        <div className="space-y-4">
                                            <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-700 uppercase text-white tracking-wide">
                                                <User className="w-4 h-4 text-slate-500 text-white" />
                                                Identité
                                            </h4>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-white">
                                                <InfoLine label="Nom" value={getValues("name")} />
                                                <InfoLine label="Email" value={getValues("email")} />
                                            </div>
                                        </div>

                                        {/* BUSINESS */}
                                        <div className="space-y-4">
                                            <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-700 uppercase text-white tracking-wide">
                                                <Store className="w-4 h-4 text-slate-500 text-white" />
                                                Business
                                            </h4>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-white">
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
                                            <h4 className="flex items-center text-white gap-2 text-sm font-semibold text-slate-700 uppercase tracking-wide">
                                                <ImageIcon className="w-4 h-4 text-slate-500 text-white" />
                                                Médias
                                            </h4>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white">

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
                                            <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-700 uppercase tracking-wide text-white">
                                                <FileText className="w-4 h-4 text-slate-500 text-white" />
                                                Documents
                                            </h4>

                                            <ul className="space-y-3">
                                                {(getValues("documents") || []).map((d: DocItem, i: number) => (
                                                    <li
                                                        key={i}
                                                        className="text-white flex items-center justify-between bg-[rgba(0,0,0,0.4)] rounded-xl border p-3 hover:bg-slate-100 transition"
                                                    >
                                                        <div className="flex items-center gap-3 text-white">
                                                            <File className="w-4 h-4 text-slate-600 text-white" />
                                                            <span className="font-medium text-slate-700 text-white">
                                                                {d.type}
                                                            </span>
                                                        </div>

                                                        <a
                                                            href={d.url}
                                                            target="_blank"
                                                            className="text-xs text-blue-600 hover:text-blue-800 underline text-white"
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
                                    <button type="button" onClick={goPrev} className="inline-flex items-center gap-2 px-4 py-2 rounded-[5px] border hover:bg-white/110 text-white">
                                        <ArrowLeft size={16} /> Précédent
                                    </button>
                                )}
                            </div>

                            <div className="flex items-center gap-3">
                                {step < STEPS.length - 1 ? (
                                    <button type="button" onClick={goNext} className="inline-flex items-center gap-2 px-6 py-3 rounded-[5px!important] btn-galilee text-white font-medium hover:brightness-95">
                                        Suivant <ArrowRight size={16} />
                                    </button>
                                ) : (
                                    <button type="submit" disabled={isSubmitting} className="inline-flex items-center gap-2 px-6 py-3 rounded-[5px] bg-gradient-to-r from-indigo-600 to-pink-500 text-white font-medium shadow-lg">
                                        {isSubmitting ? "Envoi..." : "Valider"} <CircleCheck size={16} />
                                    </button>
                                )}
                            </div>
                        </div>

                        {uploading && (
                            <div className="mt-2 text-xs text-slate-500 text-white">Upload en cours: {uploadProgress}%</div>
                        )}
                    </form>
                </main>
            </div>
            <style jsx global>{`

/* ============================= */
/* CHARTE GALILEE DARK PREMIUM */
/* ============================= */

:root {
  --galilee-bg: #07131F;
  --galilee-card: rgba(0,0,0,0.45);
  --galilee-border: rgba(255,255,255,0.1);
  --galilee-text: #ffffff;
  --galilee-text-soft: #D1D5DB;
  --galilee-accent: #FF7A2D;
}

/* PAGE BACKGROUND */

body {
  background: var(--galilee-bg);
}

/* ============================= */
/* INPUTS */
/* ============================= */

input.form-input-epure,
textarea.form-textarea-epure,
select.form-input-epure {

  border: 1px solid var(--galilee-border);
  background: rgba(0,0,0,0.4);
  color: var(--galilee-text);
  font-size: 0.875rem;
  transition: all .25s ease;
}

input.form-input-epure::placeholder,
textarea.form-textarea-epure::placeholder {
  color: var(--galilee-text-soft);
}

input.form-input-epure:focus,
textarea.form-textarea-epure:focus,
select.form-input-epure:focus {

  outline: none;
  border-color: var(--galilee-accent);
  box-shadow: 0 0 0 2px rgba(255,122,45,.25);
}

/* ============================= */
/* CARDS */
/* ============================= */

.glass-card{
  background: var(--galilee-card);
  backdrop-filter: blur(12px);
  border: 1px solid var(--galilee-border);
  border-radius: 1rem;
}

/* ============================= */
/* UPLOAD ZONE */
/* ============================= */

.upload-zone {

  border: 1px dashed var(--galilee-border);
  border-radius: 1rem;
  background: rgba(0,0,0,0.35);
  padding: 1rem;

  transition: all .25s ease;
}

.upload-zone:hover {

  border-color: var(--galilee-accent);
  background: rgba(0,0,0,0.5);
}

/* ============================= */
/* LABELS */
/* ============================= */

label{
  color: var(--galilee-text-soft) !important;
}

/* ============================= */
/* BUTTONS */
/* ============================= */

.btn-galilee{

  background: var(--galilee-accent);
  color:white;
  border-radius:999px;
  padding:12px 24px;
  font-weight:600;

  transition:all .25s ease;
}

.btn-galilee:hover{

  background:#ff8b48;
  transform:scale(1.03);
}

/* ============================= */
/* SCROLLBAR */
/* ============================= */

.scrollbar-hide::-webkit-scrollbar{
  display:none;
}

.scrollbar-hide{
  -ms-overflow-style:none;
  scrollbar-width:none;
}

@keyframes fadeIn {
  from {
    opacity:0;
    transform:translateY(-3px);
  }
  to {
    opacity:1;
    transform:translateY(0);
  }
}

.animate-fadeIn{
  animation:fadeIn .25s ease;
}
`}</style>

        </div>

    );
}

/* ---------------- Helpers ---------------- */
const FloatingInput = React.forwardRef<HTMLInputElement, any>(
    ({ id, label, icon, error, type = "text", onChange, ...rest }, ref) => {

        const [showError, setShowError] = React.useState(false);

        React.useEffect(() => {
            if (error) {
                setShowError(true);
            }
        }, [error]);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

            // disparaît dès que l'utilisateur tape
            if (showError) {
                setShowError(false);
            }

            // très important pour React Hook Form
            if (onChange) {
                onChange(e);
            }
        };

        return (
            <div className="w-full">

                <div className="relative">

                    {/* Icon */}
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500 pointer-events-none">
                        {icon}
                    </div>

                    {/* Input */}
                    <input
                        ref={ref}
                        id={id}
                        type={type}
                        {...rest}
                        onChange={handleChange}
                        className={`w-full pl-12 pr-4 py-3 rounded-[5px] border border-slate-200 form-input-epure
            focus:ring-2 focus:ring-indigo-100 outline-none transition-all
            ${showError ? "border-pink-400 ring-1 ring-pink-200" : ""}`}
                        placeholder={label}
                    />

                </div>

                <div className="min-h-[18px] mt-1">
                    {showError && (
                        <p className="text-pink-600 text-xs">
                            {error}
                        </p>
                    )}
                </div>

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
        <p className="text-[13px] text-slate-500 font-medium text-white">{label}</p>
        <p className="text-slate-800 font-semibold mt-0.5 text-white">{value || "-"}</p>
    </div>
);

const MediaPreview = ({ label, src }: { label: string; src: string }) => (
    <div className="space-y-2">
        <p className="text-[13px] text-slate-500 font-medium">{label}</p>
        <img
            src={src}
            alt={label}
            className="w-full h-32 object-cover rounded-[5px] border shadow-sm glass-card"
        />
    </div>
);

