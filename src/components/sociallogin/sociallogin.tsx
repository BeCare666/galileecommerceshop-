'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GoogleLogin } from '@react-oauth/google';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import jwt_decode from 'jwt-decode';
import toast, { Toaster } from 'react-hot-toast';

export default function SocialLogin() {
    const router = useRouter();
    const API_URL = process.env.NEXT_PUBLIC_REST_API_ENDPOINT;
    const [loading, setLoading] = useState(false);

    // 🔹 Appel au backend
    const loginBackend = async (profile: { name: string; email: string }, provider: 'google' | 'facebook') => {
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/auth/social-login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...profile, provider }),
            });

            const data = await res.json();

            if (res.ok && data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('permissions', JSON.stringify(data.permissions));
                toast.success(data.message || 'Connexion réussie !');
                router.push('/dashboard'); // ou la page d'accueil
            } else {
                toast.error(data.message || 'Erreur lors de la connexion.');
            }
        } catch (err) {
            console.error(err);
            toast.error('Erreur serveur. Veuillez réessayer.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-4 items-center">
            <Toaster position="top-right" />

            {loading && <div className="text-gray-600">Connexion en cours...</div>}

            {/* Google Login */}
            <GoogleLogin
                onSuccess={(credentialResponse) => {
                    if (!credentialResponse.credential) return;
                    const decoded: any = (jwt_decode as any)(credentialResponse.credential);
                    loginBackend({ name: decoded.name, email: decoded.email }, 'google');
                }}
                onError={() => {
                    toast.error('Échec de la connexion Google.');
                }}
            />

            {/* Facebook Login */}
            <FacebookLogin
                appId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID!}
                autoLoad={false}
                callback={(response: any) => {
                    if (response.status === 'unknown') {
                        toast.error('Échec de la connexion Facebook.');
                        return;
                    }
                    loginBackend({ name: response.name, email: response.email }, 'facebook');
                }}
                render={(renderProps: any) => (
                    <button
                        onClick={renderProps.onClick}
                        disabled={loading}
                        className="bg-blue-600 text-white py-2 px-4 rounded disabled:opacity-50"
                    >
                        {loading ? 'Connexion...' : 'Se connecter avec Facebook'}
                    </button>
                )}
            />
        </div>
    );
}
