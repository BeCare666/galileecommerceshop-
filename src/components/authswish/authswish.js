import { useRouter } from "next/router";

export default function AuthSwitch({ mode = "login" }) {
    const router = useRouter();

    return (
        <p className="text-sm text-center text-gray-500 mt-4">
            {mode === "login" ? (
                <>
                    Vous n’avez pas de compte ?{" "}
                    <span
                        onClick={() => router.push("/register")}
                        className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
                    >
                        Créer un compte
                    </span>
                </>
            ) : (
                <>
                    Vous avez déjà un compte ?{" "}
                    <span
                        onClick={() => router.push("/login")}
                        className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
                    >
                        Connectez-vous
                    </span>
                </>
            )}
        </p>
    );
}
