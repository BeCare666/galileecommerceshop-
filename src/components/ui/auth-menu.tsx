import { Menu } from '@/components/ui/dropdown';
import ActiveLink from '@/components/ui/links/active-link';
import { Transition } from '@/components/ui/transition';
import { useLogout } from '@/data/user';
import { AuthorizedMenuItems } from '@/lib/constants';
import { User } from '@/types';
import { useTranslation } from 'next-i18next';
import { Fragment } from 'react';
import Avatar from '@/components/ui/avatar';

export default function AuthorizedMenu({ user }: { user: User }) {
  const { mutate: logout } = useLogout();
  const { t } = useTranslation('common');
  return (
    <Menu>
      <Menu.Button className="relative inline-flex h-8 w-8 justify-center rounded-full border border-light-400 bg-light-300 dark:border-dark-500 dark:bg-dark-500 text-black">
        <Avatar size="sm" name={user?.name} src={user?.profile?.avatar?.url} />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute  top-[5%] md:top-16 z-[9999] mt-4 w-56 rounded-md bg-light py-1.5 text-dark shadow-dropdown ltr:right-0 ltr:origin-top-right rtl:left-0 rtl:origin-top-left dark:bg-dark-250 dark:text-light">
          {AuthorizedMenuItems?.map((item) => (
            <Menu.Item key={item.label}>
              <ActiveLink
                href={item.path}
                className="transition-fill-colors flex w-full items-center gap-2 px-5 py-2.5 hover:bg-light-400 dark:hover:bg-dark-600"
              >
                {/* Affichage du SVG comme HTML */}
                <span dangerouslySetInnerHTML={{ __html: item.icon }} />
                <span>{t(item.label)}</span>
              </ActiveLink>
            </Menu.Item>
          ))}
          <Menu.Item>
            <button
              type="button"
              className="flex items-centertransition-fill-colors w-full px-5 py-2.5 hover:bg-light-400 ltr:text-left rtl:text-right dark:hover:bg-dark-600"
              onClick={() => logout()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="#ec4899"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                width="20"
                height="20"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 12H9m0 0l3-3m-3 3l3 3"
                />
              </svg>
              &nbsp; &nbsp;<p>{t('text-logout')}</p>
            </button>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
