"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
    X,
    PackageSearch,
    Store,
    Map,
    Files,
    ShieldCheck,
    BookOpenCheck,
    MessageCircleQuestion,
    Megaphone,
    Globe2,
    ChevronDown,
    Facebook,
    Instagram,
    Youtube,
    Twitter,
    BadgeDollarSign,
    Building2,
} from "lucide-react";
import { useRef } from "react";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

interface PremiumDrawerProps {
    drawerOpen: boolean;
    setDrawerOpen: (v: boolean) => void;
    isAuthorized: boolean;
    openMarches: boolean;
    setOpenMarches: (v: boolean) => void;
    openC: boolean;
    setOpenC: (v: boolean) => void;
    mapIsOk: boolean;
    setMapIsOk: (v: boolean) => void;
    CountrySelector: React.FC;
    productPlaceholderx: string;
    router: any;
}

interface DrawerItemProps {
    icon: React.ReactNode;
    label: string;
    href?: string;
    onClick?: () => void;
    rightElement?: React.ReactNode;
}

interface DrawerItemSmallProps {
    label: string;
    href: string;
}

interface ButtonProps {
    label: string;
    href?: string;
    onClick?: () => void;
}

interface SocialIconProps {
    icon: React.ReactNode;
}

/* -------------------------------------------------------------------------- */
/*                               MAIN COMPONENT                                */
/* -------------------------------------------------------------------------- */

export default function PremiumDrawer({
    drawerOpen,
    setDrawerOpen,
    isAuthorized,
    openMarches,
    setOpenMarches,
    openC,
    setOpenC,
    mapIsOk,
    setMapIsOk,
    CountrySelector,
    productPlaceholderx,
    router,
}: PremiumDrawerProps) {
    const drawerRef = useRef<HTMLDivElement>(null);

    return (
        <AnimatePresence>
            {drawerOpen && (
                <div className="fixed inset-0 z-[2000] flex">

                    {/* BG Overlay */}
                    <motion.div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setDrawerOpen(false)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />

                    {/* DRAWER */}
                    <motion.div
                        ref={drawerRef}
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 180, damping: 20 }}
                        className="
              fixed right-0 top-0 h-full w-80 
              bg-[#0F1115] border-l border-white/10 
              shadow-2xl flex flex-col z-[2100]
            "
                    >
                        {/* HEADER */}
                        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                            <Image
                                src={productPlaceholderx}
                                alt="Logo"
                                width={160}
                                height={80}
                                className="opacity-90"
                            />

                            <button
                                onClick={() => setDrawerOpen(false)}
                                className="p-2 rounded-lg hover:bg-white/10 transition"
                            >
                                <X className="w-6 h-6 text-white" />
                            </button>
                        </div>

                        {/* NAVIGATION */}
                        <nav className="flex flex-col px-5 py-6 space-y-4 overflow-y-auto">

                            <DrawerItem
                                icon={<PackageSearch />}
                                href="/suivi_orders"
                                label="Suivi des commandes"
                            />

                            {/* Marchés */}
                            <div>
                                <button
                                    onClick={() => setOpenMarches(!openMarches)}
                                    className="w-full text-left flex items-center justify-between text-white/90 hover:text-white transition"
                                >
                                    <span className="flex items-center gap-3">
                                        <Store className="w-5 h-5" />
                                        Marchés
                                    </span>

                                    <ChevronDown
                                        className={`w-5 h-5 transition-transform ${openMarches ? "rotate-180" : "rotate-0"
                                            }`}
                                    />
                                </button>

                                <AnimatePresence>
                                    {openMarches && (
                                        <motion.ul
                                            initial={{ opacity: 0, y: -6 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -6 }}
                                            className="mt-3 ml-8 space-y-3"
                                        >
                                            <DrawerItemSmall href="/produits" label="Produits" />
                                            <DrawerItemSmall href="/services" label="Services" />
                                        </motion.ul>
                                    )}
                                </AnimatePresence>
                            </div>

                            <DrawerItem
                                icon={<Globe2 />}
                                href="/pavillons"
                                label="Pavillons"
                                rightElement={<CountrySelector />}
                            />

                            <DrawerItem
                                icon={<Map />}
                                label="Corridors"
                                onClick={() => setOpenC(true)}
                            />

                            <DrawerItem
                                icon={<Building2 />}
                                href="#"
                                label="Centrale d’achat"
                            />

                            <DrawerItem icon={<ShieldCheck />} href="/termes_conditions" label="Conditions générales" />
                            <DrawerItem icon={<Files />} href="/policy" label="Politique de confidentialité" />
                            <DrawerItem icon={<BookOpenCheck />} href="/charte" label="Charte des vendeurs" />
                            <DrawerItem icon={<BookOpenCheck />} href="/guide" label="Le guide" />
                            <DrawerItem icon={<MessageCircleQuestion />} href="/faq" label="F.A.Q" />
                            <DrawerItem icon={<Megaphone />} href="/become-seller" label="Devenir fournisseur" />
                            <DrawerItem icon={<BadgeDollarSign />} href="/ge-ambassador" label="Devenir Ambassadeur" />

                        </nav>

                        {/* FOOTER BUTTONS */}
                        <div className="hidden mt-auto border-t border-white/10 px-5 py-6">
                            {isAuthorized ? (
                                <div className="flex flex-col gap-3">
                                    <ButtonPrimary href="/become-seller" label="Devenir fournisseur" />
                                    <ButtonSecondary href="/ge-ambassador" label="Devenir ambassadeur" />
                                </div>
                            ) : (
                                <div className="flex flex-col gap-3">
                                    <ButtonPrimary
                                        label="Connexion"
                                        onClick={() => router.push("/login")}
                                    />
                                    <ButtonSecondary
                                        label="Créer un compte"
                                        onClick={() => router.push("/register")}
                                    />
                                </div>
                            )}
                        </div>

                        {/* SOCIAL FOOTER */}
                        <div className="px-5 pb-6 mt-4">
                            <p className="uppercase tracking-wider text-xs text-white/40 mb-3">
                                Suivez-nous
                            </p>

                            <div className="flex items-center gap-4">
                                <SocialIcon icon={<Facebook className="w-5 h-5" />} />
                                <SocialIcon icon={<Instagram className="w-5 h-5" />} />
                                <SocialIcon icon={<Youtube className="w-5 h-5" />} />
                                <SocialIcon icon={<Twitter className="w-5 h-5" />} />
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

/* -------------------------------------------------------------------------- */
/*                              SUB COMPONENTS                                 */
/* -------------------------------------------------------------------------- */

function DrawerItem({ icon, label, href, onClick, rightElement }: DrawerItemProps) {
    return (
        <div
            onClick={onClick}
            className="flex items-center justify-between cursor-pointer"
        >
            <Link
                href={href || "#"}
                className="flex items-center justify-between w-full text-white/90 hover:text-white transition group"
            >
                <span className="flex items-center gap-3">
                    <span className="w-5 h-5 opacity-80 group-hover:opacity-100 transition">
                        {icon}
                    </span>
                    <span>{label}</span>
                </span>

                {rightElement && <div>{rightElement}</div>}
            </Link>
        </div>
    );
}

function DrawerItemSmall({ label, href }: DrawerItemSmallProps) {
    return (
        <Link
            href={href}
            className="text-white/70 hover:text-white transition text-sm pl-2 block"
        >
            {label}
        </Link>
    );
}

function ButtonPrimary({ label, href, onClick }: ButtonProps) {
    return (
        <button
            onClick={onClick}
            className="w-full py-3 rounded-lg bg-pink-600 hover:bg-pink-700 transition text-center text-white font-medium"
        >
            {href ? <Link href={href}>{label}</Link> : label}
        </button>
    );
}

function ButtonSecondary({ label, href, onClick }: ButtonProps) {
    return (
        <button
            onClick={onClick}
            className="w-full py-3 rounded-lg bg-white/10 hover:bg-white/20 transition text-white font-medium"
        >
            {href ? <Link href={href}>{label}</Link> : label}
        </button>
    );
}

function SocialIcon({ icon }: SocialIconProps) {
    return (
        <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition text-white">
            {icon}
        </button>
    );
}
