import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Image from '@/components/ui/image';
import Button from '@/components/ui/button';
import placeholder from '@/assets/images/placeholders/product.svg';
import { EyeIcon, CreditCardIcon, CheckCircleIcon } from 'lucide-react';
import dayjs from 'dayjs';

interface OrderChild {
    id: number;
    name: string;
    quantity: number;
    price: string;
    subtotal: string;
    image?: { thumbnail?: string; url?: string };
    order_status: string;
    payment_status: string;
}

interface OrderChildrenModalProps {
    isOpen: boolean;
    onClose: () => void;
    orderChildren: OrderChild[];
    orderId: number;
    orderTracking: string;
}

export default function OrderChildrenModal({
    isOpen,
    onClose,
    orderChildren,
    orderTracking,
}: OrderChildrenModalProps) {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                {/* Background Overlay */}
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-5xl transform overflow-hidden rounded-2xl bg-dark text-light shadow-2xl transition-all">
                                {/* Header */}
                                <div className="border-b border-light/10 bg-gradient-to-r from-dark to-dark/90 px-6 py-5 sm:px-8">
                                    <Dialog.Title className="flex items-center gap-3">
                                        <div className="hidden p-2 rounded-lg bg-brand/10">
                                            <EyeIcon className="w-5 h-5 text-brand" />
                                        </div>
                                        <div>
                                            <p className="text-lg sm:text-xl font-semibold tracking-tight">
                                                #{orderTracking}
                                            </p>
                                            <p className="text-sm text-light/50 mt-0.5">
                                                {orderChildren.length} {orderChildren.length === 1 ? 'produit' : 'produits'}
                                            </p>
                                        </div>
                                    </Dialog.Title>
                                </div>

                                {/* Products List */}
                                <div className="overflow-y-auto max-h-[calc(100vh-300px)] px-6 py-6 sm:px-8">
                                    <div className="space-y-3">
                                        {orderChildren.map((child, index) => (
                                            <div
                                                key={child.id}
                                                className="group p-4 rounded-xl border border-light/10 hover:border-light/20 bg-dark/50 hover:bg-dark/70 transition-all duration-200 ease-out"
                                            >
                                                {/* Row 1: Image + Main Info */}
                                                <div className="flex gap-4 mb-4">
                                                    {/* Product Image */}
                                                    <div className="relative h-24 w-24 flex-shrink-0 rounded-lg overflow-hidden border border-light/15 shadow-md">
                                                        <Image
                                                            src={child.image?.thumbnail ?? child.image?.url ?? placeholder}
                                                            alt={child.name}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>

                                                    {/* Product Details */}
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="font-semibold text-base sm:text-lg text-light truncate">
                                                            {child.name}
                                                        </h3>
                                                        <div className="mt-2 space-y-1.5">
                                                            <div className="flex flex-wrap gap-4 text-sm">
                                                                <div>
                                                                    <p className="text-light/50">Quantité</p>
                                                                    <p className="text-light font-medium">{child.quantity}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-light/50">Prix unitaire</p>
                                                                    <p className="text-light font-medium">${child.price}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-light/50">Sous-total</p>
                                                                    <p className="text-brand font-semibold">${child.subtotal}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Row 2: Status Section */}
                                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                                    {/* Order Status */}
                                                    <div className="flex items-center gap-2.5 p-3 rounded-lg bg-light/5 border border-light/10">
                                                        <CheckCircleIcon className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                                                        <div className="min-w-0">
                                                            <p className="text-xs text-light/50 uppercase tracking-wide">Statut</p>
                                                            <p className="text-sm font-medium text-light truncate">
                                                                {child.order_status}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* Payment Status */}
                                                    <div className="flex items-center gap-2.5 p-3 rounded-lg bg-light/5 border border-light/10">
                                                        <CreditCardIcon className="w-5 h-5 text-blue-400 flex-shrink-0" />
                                                        <div className="min-w-0">
                                                            <p className="text-xs text-light/50 uppercase tracking-wide">Paiement</p>
                                                            <p className="text-sm font-medium text-light truncate">
                                                                {child.payment_status}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* Date */}
                                                    <div className="flex items-center gap-2.5 p-3 rounded-lg bg-light/5 border border-light/10">
                                                        <div className="w-5 h-5 flex-shrink-0 text-light/40">📅</div>
                                                        <div className="min-w-0">
                                                            <p className="text-xs text-light/50 uppercase tracking-wide">Date</p>
                                                            <p className="text-sm font-medium text-light">
                                                                {dayjs(child.created_at).format('DD MMM YYYY')}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="border-t border-light/10 bg-dark/50 px-6 py-4 sm:px-8 flex justify-end">
                                    <Button
                                        variant="outline"
                                        onClick={onClose}
                                        className="rounded-lg font-medium transition-all duration-200"
                                    >
                                        Fermer
                                    </Button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
