import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, Home, Network } from "lucide-react";

// -------------------------
// SCHEMA + TYPES
// -------------------------
const schema = z.object({
    nom: z.string().min(1, "Le nom est requis"),
    prenom: z.string().min(1, "Le prénom est requis"),
    email: z.string().email("Email invalide"),
    telephone: z.string().min(6, "Numéro invalide"),
    pays: z.string().optional(),
    ville: z.string().optional(),
    adresse: z.string().optional(),
    reseaux: z.string().optional(),
});

// Type du formulaire généré automatiquement
type FormValues = z.infer<typeof schema>;

export default function RegisterAmbassador() {
    // Typage strict du formulaire
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data: FormValues) => console.log(data);

    // -------------------------
    // INPUT COMPONENT TIPÉ
    // -------------------------
    const InputField = <T extends keyof FormValues>({
        label,
        icon: Icon,
        name,
        type = "text",
        required = false,
    }: {
        label: string;
        icon: any;
        name: T;
        type?: string;
        required?: boolean;
    }) => (
        <div className="flex flex-col w-full">
            <div className="relative">
                <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" size={18} />

                <input
                    type={type}
                    {...register(name)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/70 border border-gray-200 focus:border-blue-500 outline-none shadow-sm peer placeholder-transparent"
                    placeholder={label}
                />

                <label
                    className="absolute left-12 top-1/2 -translate-y-1/2 text-gray-500 transition-all pointer-events-none
                    peer-placeholder-shown:top-1/2 
                    peer-placeholder-shown:text-base 
                    peer-placeholder-shown:text-gray-400 
                    peer-focus:-top-2 
                    peer-focus:text-sm 
                    peer-focus:text-blue-600 
                    bg-white px-1"
                >
                    {label} {required && "*"}
                </label>
            </div>

            {errors[name] && (
                <p className="text-pink-600 text-sm mt-1">
                    {(errors[name]?.message as string) ?? ""}
                </p>
            )}
        </div>
    );

    // -------------------------
    // UI COMPLETE
    // -------------------------
    return (
        <section className="w-full min-h-screen bg-gradient-to-br from-white via-blue-50 to-pink-50 flex justify-center items-center p-4 font-sans">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-3xl bg-white/80 backdrop-blur-xl rounded-[5px] shadow-[5px] p-8 md:p-12 border border-white/50"
            >
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="whitespace-nowrap text-2xl md:text-3xl font-extrabold text-blue-700 text-center mb-10 tracking-tight"
                >
                    Inscription Ambassadeur
                </motion.h1>

                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <InputField label="Nom" name="nom" icon={User} required />
                    <InputField label="Prénom" name="prenom" icon={User} required />

                    <InputField label="Pays" name="pays" icon={MapPin} />
                    <InputField label="Ville" name="ville" icon={Home} />

                    <div className="md:col-span-2">
                        <InputField
                            label="Vos réseaux (familial, professionnel, communautaire...)"
                            name="reseaux"
                            icon={Network}
                        />
                    </div>

                    <div className="md:col-span-2">
                        <InputField label="Adresse" name="adresse" icon={Home} />
                    </div>

                    <InputField label="Email" name="email" type="email" icon={Mail} required />
                    <InputField label="Téléphone" name="telephone" type="tel" icon={Phone} required />

                    <div className="md:col-span-2 flex justify-center mt-6">
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            type="submit"
                            className="px-12 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-pink-500 text-white font-bold shadow-lg text-lg tracking-wide"
                        >
                            Valider l'inscription
                        </motion.button>
                    </div>
                </form>
            </motion.div>
        </section>
    );
}
