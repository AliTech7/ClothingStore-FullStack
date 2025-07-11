import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        try {
            const backendRes = await fetch("http://localhost:3001/sales", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(req.body),
            })

            const data = await backendRes.json()
            return res.status(200).json(data)
        } catch (err) {
            console.error("Error posting to backend:", err)
            return res.status(500).json({ message: "Failed to post sale" })
        }
    } else {
        res.status(405).json({ message: "Method Not Allowed" })
    }
}
