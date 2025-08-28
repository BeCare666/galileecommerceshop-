import type { LinkProps } from 'next/link';
import NextLink from 'next/link';

const AnchorLink: React.FC<
  LinkProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
    children?: React.ReactNode;
  }
> = ({ href, ...props }) => {
  if (!href) {
    console.warn('AnchorLink : href invalide', href);
    console.warn('ActiveLink: href est invalide', href);
    console.group('🚨 ActiveLink: href est invalide');
    console.error('Props reçues :', props);
    console.trace('Trace d’appel');
    console.groupEnd();
    return null;
  }
  return <NextLink href={href} {...props} />;
};

export default AnchorLink;
