'use client';

import React from 'react';
import { createPortal } from 'react-dom';
import Image from '@/components/ui/image';

interface CategoriesForYouPanelProps {
  categories: any[];
  onClose: () => void;
  onSelectCategory: (id: number) => void;
}

export default function CategoriesForYouPanel({
  categories,
  onClose,
  onSelectCategory,
}: CategoriesForYouPanelProps) {
  if (typeof document === 'undefined') return null;

  const portalContent = (
    <div className="fixed inset-0 z-[9999] bg-black bg-opacity-40 flex items-start justify-center">
      {/* Menu déroulant */}
      <div className="mt-16 w-[90%] max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <h2 className="text-lg font-semibold text-gray-800">
            Toutes les catégories
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 transition"
          >
            ✕
          </button>
        </div>

        <ul className="max-h-[70vh] overflow-y-auto divide-y">
          {categories.map((cat) => (
            <li
              key={cat.id}
              className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 transition"
              role="button"
              tabIndex={0}
              onClick={() => onSelectCategory(cat.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectCategory(cat.id);
                }
              }}
            >
              <Image
                src={cat.icon || '/placeholder.png'}
                alt={cat.name}
                width={32}
                height={32}
                className="rounded-full border bg-gray-50 object-contain"
              />
              <span className="text-gray-700 text-sm font-medium">
                {cat.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return <>{createPortal(portalContent, document.body)}</>;
}
