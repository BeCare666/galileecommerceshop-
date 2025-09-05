import cn from 'classnames';
import Image from '@/components/ui/image';
import AnchorLink from '@/components/ui/links/anchor-link';
import routes from '@/config/routes';
import { useIsMounted } from '@/lib/hooks/use-is-mounted';
import { useIsDarkMode } from '@/lib/hooks/use-is-dark-mode';
import { siteSettings } from '@/data/static/site-settings';
import { useSettings } from '@/data/settings';

export default function Logo({
  className = 'w-28', // augmente un peu la largeur du logo
  ...props
}: React.AnchorHTMLAttributes<{}>) {
  const isMounted = useIsMounted();
  const { isDarkMode } = useIsDarkMode();
  const { lightLogo, darkLogo } = siteSettings;
  const { settings }: any = useSettings();

  return (
    <AnchorLink
      href={routes.home}
      className={cn(
        'relative flex items-center text-dark focus:outline-none dark:text-light',
        className,
      )}
      {...props}
    >
      <span
        className="relative overflow-hidden  p-1 shadow-sm"
        style={{
          width: '138vh', // ajuste selon ta maquette bg-dark-300
          height: '11vh', // ajuste selon ta maquette
        }}
      >
        {isMounted && isDarkMode && (
          <Image
            src={settings?.dark_logo?.original ?? darkLogo}
            fill
            loading="eager"
            alt={settings?.siteTitle ?? 'Dark Logo'}
            className="object-contain rounded-[5px]"
            priority
            sizes="(max-width: 968px) 150vw, (max-width: 1800px) 150vw, 123vw"
          />
        )}
        {isMounted && !isDarkMode && (
          <Image
            src={settings?.logo?.original ?? lightLogo}
            fill
            loading="eager"
            alt={settings?.siteTitle ?? 'Light Logo'}
            className="object-contain rounded-[5px]"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 43vw"
          />
        )}
      </span>
    </AnchorLink>
  );
}
