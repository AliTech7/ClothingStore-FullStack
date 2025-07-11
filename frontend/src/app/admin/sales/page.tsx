"use client";

import { useEffect, useState } from "react";

type Sale = {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    userId: string;
}

export default function AdminSalesPage() {
    const [sales, setSales] = useState<Sale[]>([])
    const [error, setError] = useState("")

    useEffect(() => {
        const fetchSales = async () => {
            const params = new URLSearchParams(window.location.search)
            const token = params.get("admin_token")

            if (!token) {
                setError("Missing admin_token in URL")
                return
            }

            try {
                const res = await fetch(`http://localhost:3001/sales?admin_token=${token}`)
                if (!res.ok) {
                    const errData = await res.json()
                    setError(errData.message || "Failed to fetch sales")
                    return
                }
                const data = await res.json()
                setSales(data)
            } catch (err) {
                setError("Error Feaching Sales")
                console.error(err)
            }
        }

        fetchSales()
    }, [])

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Admin - Sales</h1>

            {error ? (
                <p className="text-red-600 font-semibold">{error}</p>
            ) : sales.length === 0 ? (
                <p className="text-gray-600">No Sales Found!</p>
            ) : (
                <table className="w-full table-auto border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-4 py-2">Product</th>
                            <th className="border px-4 py-2">Price</th>
                            <th className="border px-4 py-2">Quantity</th>
                            <th className="border px-4 py-2">User ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.map((sale, index) => (
                            <tr key={index}>
                                <td className="border px-4 py-2">{sale.name}</td>
                                <td className="border px-4 py-2">{sale.price.toFixed(2)}</td>
                                <td className="border px-4 py-2">{sale.quantity}</td>
                                <td className="border px-4 py-2">{sale.userId}</td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            )}
        </div>
    )
}