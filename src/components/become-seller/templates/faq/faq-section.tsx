import Accordion from '@/components/ui/accordion';
import SectionHeading from '@/components/ui/section-heading';
import { cn } from '@/lib/cn';
import { BecomeSellerPageOptions } from '@/types';
import React from 'react';

interface FaqSectionProps
  extends Pick<
    BecomeSellerPageOptions,
    'faqTitle' | 'faqDescription' | 'faqItems'
  > {
  className?: string;
}

function prepareForAccordion(data: any[]) {
  return data.map((item) => ({
    faq_title: item?.title,
    faq_description: item?.description,
  }));
}

export default function FaqSection({
  faqTitle,
  faqDescription,
  faqItems,
  className,
}: FaqSectionProps) {
  return (
    <section
      className={cn(
        'relative pt-20 pb-[70px] bg-gradient-to-br from-indigo-50 via-white to-purple-100 rounded-2xl overflow-hidden',
        className
      )}
    >
      {/* Gradient accent blobs */}
      <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-purple-400 to-indigo-400 rounded-full blur-2xl opacity-30 pointer-events-none" />
      <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-gradient-to-tr from-indigo-300 to-purple-200 rounded-full blur-3xl opacity-20 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[94.75rem] px-4">
        <SectionHeading
          title={faqTitle}
          subtitle={faqDescription}
        />
        <div className="max-w-[1000px] mx-auto mt-10">
          <div className="bg-white/80 dark:bg-dark-300/80 rounded-2xl shadow-xl p-8 transition-transform hover:scale-[1.01]">
            {prepareForAccordion(faqItems)?.map((item, index) => (
              <Accordion
                items={item}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
