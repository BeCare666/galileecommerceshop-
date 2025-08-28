import { cn } from '@/lib/cn';
import { SellingStep as SellingStepItem } from '@/types';
import Image from 'next/image';
import React from 'react';

interface SellingStepProps {
  sellingStep: SellingStepItem;
  className?: string;
}

function SellingStep({ sellingStep, className }: SellingStepProps) {
  return (
    <div className={cn('relative bg-gradient-to-br from-indigo-50 via-white to-purple-100 rounded-1xl -md p-8 flex flex-col items-center transition-transform hover:scale-105 hover:-lg', className)}>
      {sellingStep?.image?.original && (
        <div className="relative w-[140px] h-[94px] mb-8 rounded-xl overflow-hidden  bg-white flex items-center justify-center">
          <Image
            src={sellingStep.image.original}
            alt={sellingStep.title}
            height={94}
            width={140}
            quality={100}
            className="object-contain"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-200/40 to-transparent pointer-events-none" />
        </div>
      )}
      {sellingStep?.title && (
        <h5 className="text-2xl font-extrabold text-indigo-700 dark:text-indigo-300 mb-2 tracking-tight drop--lg">
          {sellingStep.title}
        </h5>
      )}
      {sellingStep?.description && (
        <p className="mt-1 text-base text-gray-700 dark:text-gray-200 leading-relaxed text-center max-w-xs">
          {sellingStep.description}
        </p>
      )}
      <div className="absolute -top-4 -right-4 w-10 h-10 bg-gradient-to-br from-purple-400 to-indigo-400 rounded-full blur-xl opacity-40 pointer-events-none" />
      <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-tr from-indigo-300 to-purple-200 rounded-full blur-2xl opacity-30 pointer-events-none" />
    </div>
  );
}

export default SellingStep;
