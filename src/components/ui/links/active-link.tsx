import type { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import AnchorLink from '@/components/ui/links/anchor-link';
import classNames from 'classnames';

interface ActiveLinkProps extends LinkProps {
  activeClassName?: string;
  children?: React.ReactNode;
}

const ActiveLink: React.FC<
  ActiveLinkProps & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>
> = ({ href, className, activeClassName = 'active', ...props }) => {
  const { pathname } = useRouter();

  // 🔒 Ne pas rendre si href est invalide
  if (!href) {
    console.warn('ActiveLink: href est invalide', href);
    console.group('🚨 ActiveLink: href est invalide');
    console.error('Props reçues :', props);
    console.trace('Trace d’appel');
    console.groupEnd();
    return null;
  }

  return (
    <AnchorLink
      href={href}
      className={classNames(className, {
        [activeClassName]: pathname === href,
      })}
      {...props}
    />
  );
};


export default ActiveLink;
