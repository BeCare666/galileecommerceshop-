'use client';

import { useState, useMemo, useEffect } from 'react';
import { X, Minus, Plus, Check } from 'lucide-react';
import { useModalAction } from '@/components/modal-views/context';
import AddToCart from '@/components/cart/add-to-cart';
import { useCart } from '@/components/cart/lib/cart.context';
import { useMe } from '@/data/user';
type Variant = {
    id: string;
    label: string;
    price: number;
};

type ProductDrawerProps = {
    open: boolean;
    onClose: () => void;
    product: any;
    onSubmit: (data: any) => void;
};

export default function PremiumDrawer({
    open,
    onClose,
    product,
    onSubmit,
}: ProductDrawerProps) {
    const { openModal } = useModalAction();
    const { isAuthorized } = useMe();
    const { addItemToCart } = useCart();
    {/*  onClick={() => {
    addItemToCart({
      id: String(product.id),
      name: product.name,
      slug: product.slug,
      image: product.image?.url,
      price: unitPrice,
      quantity,
      stock: product.quantity,
      unit: product.unit,
      shop: {
        slug: product.shop.slug,
        name: product.shop.name,
      },
      language: product.language,
    });
  }}*/}
    const handleOpenQuestion = () => {
        if (!isAuthorized) {
            openModal('LOGIN_VIEW');
            return;
        }

        openModal('QUESTION_FORM', {
            product_id: product?.id,
            shop_id: product?.shop?.id,
        });
    };
    const verifiedIsCategorie = ['2', '300', '1', '9', '15', '16'];

    const isCategorie = product.categories.some((cat: any) =>
        verifiedIsCategorie.includes(String(cat.categories_id))
    );
    // ✅ unité minimale (ex: "10")
    const unit = Number(product?.unit || 1);

    // ✅ Variants
    const sizes: Variant[] =
        product?.variation_options?.length > 0
            ? product.variation_options.map((v: any) => ({
                id: String(v.id),
                label: v.title || 'Option',
                price: Number(v.price),
            }))
            : [
                {
                    id: 'default',
                    label: 'Standard',
                    price: Number(product?.sale_price || product?.price || 0),
                },
            ];

    const [selectedSize, setSelectedSize] = useState<Variant>(sizes[0]);

    // ✅ quantité = multiple de unit
    const [quantity, setQuantity] = useState(unit);

    useEffect(() => {
        setSelectedSize(sizes[0]);
        setQuantity(unit);
    }, [product]);

    // 💰 prix réel par unité
    const unitPrice = selectedSize.price / unit;

    // 💰 total réel
    const total = useMemo(() => {
        return unitPrice * quantity;
    }, [unitPrice, quantity]);

    if (!open) return null;

    // ✅ SUBMIT
    const handleSubmit = () => {
        const payload = {
            product_id: product.id,
            product_name: product.name,
            shop_id: product.shop_id,

            quantity,
            unit,
            unit_price: unitPrice,
            total,

            selected_options: {
                size: selectedSize.label,
            },
        };

        onSubmit(payload);
        //onClose();
    };

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                onClick={onClose}
            />

            {/* Drawer */}
            <div className="fixed right-0 top-0 h-full w-full sm:w-[440px] bg-white z-50 shadow-[0_20px_80px_rgba(0,0,0,0.25)] flex flex-col animate-slideIn">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-lg font-semibold">
                        Options & quantité
                    </h2>
                    <button onClick={onClose}>
                        <X className="w-5 h-5 text-gray-600 hover:text-black" />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8">

                    {/* VARIANTS */}
                    <div className="grid grid-cols-2 gap-4">
                        {sizes.map((size) => {
                            const active = selectedSize.id === size.id;

                            return (
                                <button
                                    key={size.id}
                                    onClick={() => setSelectedSize(size)}
                                    className={`p-4 rounded-xl border text-left transition-all
                                    ${active
                                            ? 'border-orange-500 bg-orange-50 shadow-md'
                                            : 'border-gray-200 hover:border-gray-400'
                                        }`}
                                >
                                    <div className="text-xs text-gray-500">
                                        {size.label}
                                    </div>

                                    <div className="text-lg font-bold text-gray-900">
                                        {size.price.toLocaleString()} $
                                    </div>

                                    <div className="text-xs text-gray-500 mt-1">
                                        {unit} unités
                                    </div>

                                    {active && (
                                        <Check className="w-4 h-4 text-orange-500 mt-2" />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Quantity */}
                    <div>
                        <h3 className="text-sm font-semibold mb-3">Quantité</h3>

                        <div className="flex items-center justify-between mt-3">
                            {product.negotiable_price ? (
                                <span className="text-sm text-gray-500">
                                    Prix à négocier
                                </span>
                            ) : (
                                <span className="text-sm text-gray-500">
                                    {selectedSize.price.toLocaleString()}
                                </span>
                            )}

                            <div className="flex items-center border rounded-full overflow-hidden shadow-sm">
                                <button
                                    onClick={() =>
                                        setQuantity((q) => Math.max(unit, q - unit))
                                    }
                                    className="px-3 py-2 hover:bg-gray-100"
                                >
                                    <Minus size={16} />
                                </button>

                                <div className="px-5 font-medium">
                                    {quantity}
                                </div>

                                <button
                                    onClick={() =>
                                        setQuantity((q) => q + unit)
                                    }
                                    className="px-3 py-2 hover:bg-gray-100"
                                >
                                    <Plus size={16} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Shipping */}
                    <div className="bg-gray-50 p-4 rounded-xl">
                        <h3 className="text-sm font-semibold mb-2">
                            Expédition
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            Les frais et délais de livraison sont négociables.
                            Pour finaliser votre commande, contactez{" "}
                            <span className="font-semibold text-black">Galiléecommerce</span>{" "}
                            en cliquant sur{" "}
                            <a
                                href={`mailto:marketplace@galileecommerce.com?subject=Demande%20de%20commande%20-%20${encodeURIComponent(
                                    product.name
                                )}&body=${encodeURIComponent(
                                    `Bonjour,

                                Je souhaite obtenir plus d'informations concernant ce produit :

                                - Nom du produit : ${product.name}
                                - Quantité : ${quantity}
                                - Option sélectionnée : ${selectedSize.label}
                                - Prix estimé : ${product.negotiable_price ? "À négocier" : total + " $"
                                    }

                                Merci de me recontacter pour finaliser la commande.

                                Cordialement`
                                )}`}
                                className="inline-flex items-center gap-1 text-[#E4127A] font-medium hover:underline"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-4 h-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M16 12H8m8 0l-4 4m4-4l-4-4M4 6h16M4 18h16"
                                    />
                                </svg>
                                envoyer un email
                            </a>.
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="border-t p-6 space-y-4 bg-white">
                    <div className="flex justify-between text-sm font-semibold">
                        <span>Sous-total</span>
                        {product.negotiable_price ? (
                            <span className="text-lg">
                                Prix à négocier
                            </span>
                        ) : (
                            <span className="text-lg">
                                {total.toLocaleString()} $
                            </span>
                        )}
                    </div>


                    {isCategorie ? (
                        <button
                            onClick={handleSubmit}
                            className="w-full bg-[#E4127A]  hover:bg-orange-500 text-white py-3 rounded-full font-semibold transition"
                        >
                            Envoyer une demande
                        </button>
                    ) : (
                        <AddToCart
                            item={{
                                ...product,
                                id: String(product.id), // 🛠️ forcer id en string
                            }}
                            renderButton={(params: {
                                onClick: () => void;
                                isLoading: boolean;
                                disabled: boolean;
                                success: boolean;
                                price?: string;
                            }) => {
                                const { onClick, isLoading, disabled, price } = params;
                                return (
                                    <button
                                        onClick={onClick}
                                        disabled={disabled}
                                        className="flex items-center justify-center w-full bg-[#E4127A] hover:bg-orange-500 text-white font-bold py-2.5 rounded-lg transition text-sm"
                                    >
                                        <svg
                                            width="22"
                                            height="22"
                                            fill="white"
                                            viewBox="0 0 24 24"
                                            className="text-pink-500"
                                        >
                                            <path
                                                d="M6 6h15l-1.5 9h-13z"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                            />
                                            <circle cx="9" cy="20" r="1" fill="white" />
                                            <circle cx="18" cy="20" r="1" fill="wite" />
                                        </svg>
                                        <span> Ajouter au panier</span>
                                    </button>
                                );
                            }}
                        />
                    )}
                    <button onClick={handleOpenQuestion} className="w-full border py-3 rounded-full font-medium hover:bg-gray-100 transition">
                        Discuter avec le fournisseur
                    </button>
                </div>
            </div>

            {/* Animation */}
            <style jsx>{`
                @keyframes slideIn {
                    from { transform: translateX(100%); }
                    to { transform: translateX(0); }
                }
                .animate-slideIn {
                    animation: slideIn 0.3s ease-out;
                }
            `}</style>
        </>
    );
}