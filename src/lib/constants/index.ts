import { atom } from 'jotai';
import routes from '@/config/routes';

export const CART_KEY = 'pixer-cart';
export const CHECKOUT = 'pixer-checkout';
export const PRODUCTS_PER_PAGE = 30;
export const RTL_LANGUAGES: ReadonlyArray<string> = ['ar', 'he'];
export const LIMIT_HUNDRED = 100;
export const SUPER_ADMIN = 'super_admin';
export const STORE_OWNER = 'store_owner';
export const STAFF = 'staff';
export const TOKEN = 'AUTH_CRED';
export const PERMISSIONS = 'permissions';
export const AUTH_CRED = 'AUTH_CRED_SHOP';
export const checkIsMaintenanceModeComing = atom(false);
export const checkIsMaintenanceModeStart = atom(false);
export const RESPONSIVE_WIDTH = 1024 as number;
export const isMultiLangEnable =
  process.env.NEXT_PUBLIC_ENABLE_MULTI_LANG === 'true' &&
  !!process.env.NEXT_PUBLIC_AVAILABLE_LANGUAGES;
export const checkIsScrollingStart = atom(false);
export const NEWSLETTER_POPUP_MODAL_KEY = 'SEEN_POPUP';
export const REVIEW_POPUP_MODAL_KEY = 'SEEN_REVIEW_POPUP';

export function getDirection(language: string | undefined) {
  if (!language) return 'ltr';
  return RTL_LANGUAGES.includes(language) ? 'rtl' : 'ltr';
}

export const AuthorizedMenuItems = [
  {
    label: 'text-auth-profile',
    path: routes.profile,
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="#ec4899" viewBox="0 0 24 24" class="w-5 h-5"><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/><path d="M19.5 21a7.5 7.5 0 00-15 0"/></svg>`,
  },
  {
    label: 'text-auth-purchase',
    path: routes.purchases,
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="#ec4899" viewBox="0 0 24 24" class="w-5 h-5"><path d="M3 3h18v2H3V3zm2 4h14l-1 9H6l-1-9zm2 11a2 2 0 104 0h-4zm8 0a2 2 0 104 0h-4z"/></svg>`,
  },
  {
    label: 'text-auth-password',
    path: routes.password,
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="#ec4899" viewBox="0 0 24 24" class="w-5 h-5"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M12 11V7a4 4 0 118 0v4"/></svg>`,
  },
  {
    label: 'become seller',
    path: routes.becomeSeller,
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="#ec4899" viewBox="0 0 24 24" class="w-5 h-5"><path d="M12 2l9 21H3L12 2z"/></svg>`,
  },
];

{
  /**  {
    label: 'text-auth-wishlist',
    path: routes.wishlists,
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="#ec4899" viewBox="0 0 24 24" class="w-5 h-5"><path d="M12 21l-1-1C5 15 2 12 2 8a5 5 0 0110 0 5 5 0 0110 0c0 4-3 7-9 12l-1 1z"/></svg>`,
  },
  {
    label: 'text-followed-authors',
    path: routes.followedShop,
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="#ec4899" viewBox="0 0 24 24" class="w-5 h-5"><circle cx="12" cy="7" r="4"/><path d="M5.5 21a6.5 6.5 0 0113 0"/></svg>`,
  },
  
  {
    label: 'text-auth-settings',
    path: routes.settings,
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="#ec4899" viewBox="0 0 24 24" class="w-5 h-5">
  <path d="M19.14 12.936c.036-.303.06-.613.06-.936s-.024-.633-.07-.936l2.03-1.578a.5.5 0 00.121-.64l-1.923-3.323a.5.5 0 00-.607-.22l-2.39.96a7.024 7.024 0 00-1.62-.936l-.36-2.53A.5.5 0 0014.9 2h-3.8a.5.5 0 00-.497.422l-.36 2.53a7.024 7.024 0 00-1.62.936l-2.39-.96a.5.5 0 00-.607.22L3.703 8.846a.5.5 0 00.121.64l2.03 1.578c-.046.303-.07.613-.07.936s.024.633.07.936l-2.03 1.578a.5.5 0 00-.121.64l1.923 3.323a.5.5 0 00.607.22l2.39-.96c.486.39 1.034.707 1.62.936l.36 2.53a.5.5 0 00.497.422h3.8a.5.5 0 00.497-.422l.36-2.53a7.024 7.024 0 001.62-.936l2.39.96a.5.5 0 00.607-.22l1.923-3.323a.5.5 0 00-.121-.64l-2.03-1.578zM12 15.5A3.5 3.5 0 1115.5 12 3.504 3.504 0 0112 15.5z"/>
  </svg>
  `,
  },**/
}
