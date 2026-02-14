import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const defaultLocale = process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE || 'fr';
const locales = (process.env.NEXT_PUBLIC_AVAILABLE_LANGUAGES || 'fr').split(',').map(l => l.trim());

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Vérifier si la locale est déjà dans l'URL
    const pathnameHasLocale = locales.some(
        locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) {
        return NextResponse.next();
    }

    // Rediriger vers la locale par défaut
    return NextResponse.redirect(
        new URL(`/${defaultLocale}${pathname}`, request.url)
    );
}

export const config = {
    matcher: [
        // Exclure les fichiers statiques et API
        '/((?!_next|api|.*\\..*|public).*)',
    ],
};
