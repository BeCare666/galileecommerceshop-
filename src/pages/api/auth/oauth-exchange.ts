// pages/api/auth/oauth-exchange.ts
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") return res.status(405).end();

    const { provider, profile } = req.body;

    if (!profile?.email)
        return res.status(400).json({ error: "Missing profile email" });

    try {
        const backendRes = await axios.post(
            `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/social-login-token`,
            {
                name: profile.name,
                email: profile.email,
                provider,
            }
        );

        return res.status(200).json(backendRes.data);
    } catch (err: any) {
        console.error("OAuth exchange error:", err?.response?.data ?? err.message);
        return res.status(500).json({
            error: "OAuth Exchange Failed",
            detail: err?.response?.data ?? err.message,
        });
    }
}
