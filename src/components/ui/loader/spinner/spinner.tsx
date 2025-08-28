import React from 'react';
import styles from './spinner.module.css';
import cn from 'classnames';
import { SpinnerIcon } from '@/components/icons/spinner-icon';
import { useTranslation } from 'next-i18next';

interface Props {
  className?: string;
  text?: string;
  showText?: boolean;
  simple?: boolean;
}

const Spinner = ({ className, showText = true, text = 'Chargement...', simple }: Props) => {

  return simple ? (
    <span className={cn(styles.simple_loading, className)} />
  ) : (
    <div className={cn('flex h-screen w-full flex-col items-center justify-center', className)}>
      <div className={styles.logo_spinner_container}>
        <div className={styles.logo_spinner_circle}></div>
        <img
          src="https://galileecommerce.netlify.app/img/logo_galile_pc.png"
          alt="Galilée Commerce"
          className={styles.logo_spinner_image}
        />
      </div>
      {showText && (
        <h3 className="text-body text-lg font-semibold italic text-blue-600 mt-4">
          {text}
        </h3>
      )}
    </div>
  );
};

interface SpinnerPops {
  className?: string;
}

export const SpinnerLoader = ({ className }: SpinnerPops) => {
  return (
    <span
      className={cn(
        'border-t-accent inline-flex h-5 w-5 animate-spin rounded-full border-2 border-t-2 border-transparent',
        className
      )}
    />
  );
};

interface PageLoaderProps {
  className?: string;
  text?: string;
  showText?: boolean;
}

export const PageLoader = ({ className, showText = true, text }: PageLoaderProps) => {
  const { t } = useTranslation('common');
  return (
    <div className={cn('flex w-full flex-grow text-lg', className)}>
      <SpinnerIcon className="m-auto h-auto w-6 animate-spin" />
      {showText && <span className="ml-1">{text || t('text-loader-title')}</span>}
    </div>
  );
};

export default Spinner;
