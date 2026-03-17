import { NextRequest, NextResponse } from "next/server";
import { getAuthToken } from '../../../data/client/token.utils';

const token = getAuthToken();
export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const query = Object.fromEntries(url.searchParams.entries());

        // 🔹 Transforme les "undefined" en null
        for (const key in query) {
            if (query[key] === "undefined") query[key] = null;
        }

        const res = await fetch(`{process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/products/corridor`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // <- token sécurisé côté serveur
            },
            body: JSON.stringify(query),
        });

        if (!res.ok) {
            return NextResponse.json({ error: "Erreur NestJS", status: res.status }, { status: res.status });
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Erreur interne Next.js" }, { status: 500 });
    }
}