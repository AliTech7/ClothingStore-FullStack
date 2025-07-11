"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Sale = {
  _id: string;
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  userId: string;
  createdAt: string;
}

export default function ProfilePage() {
  const [sales, setSales] = useState<Sale[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    const userId = localStorage.getItem("userId") || "guest_123"

    const fetchSales = async () => {
      try {
        const res = await fetch(`/api/sales?userId=${userId}`)
        if (!res.ok) throw new Error("Failed to fetch orders")
        const data = await res.json()
        setSales(data)
      } catch {
        setError("Could not load your order history.")
      } finally {
        setLoading(false)
      }
    }

    fetchSales()
  }, [])

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Orders</h1>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : sales.length === 0 ? (
        <p className="text-center text-gray-600">You haven&apos;t placed any orders yet.</p>
      ) : (
        <div className="space-y-6">
          {sales.map((sale) => (
            <div
              key={sale._id}
              className="flex items-center gap-4 border-b pb-4 bg-white rounded-lg shadow p-4"
            >
              <Image
                src={sale.image}
                alt={sale.name}
                width={100}
                height={100}
                className="rounded object-cover"
              />
              <div className="flex flex-col">
                <h2 className="text-xl font-semibold">{sale.name}</h2>
                <p className="text-gray-600">Qty: {sale.quantity}</p>
                <p className="text-sm text-gray-500">
                  Ordered on: {new Date(sale.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}  