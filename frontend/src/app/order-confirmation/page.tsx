"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useCartStore from "@/store/cartStore";

export default function OrderConfirmationPage() {
    const { cartItems } = useCartStore()
    const router = useRouter()

    const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    )
    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

    // Redirecting
    useEffect(() => {
        if(cartItems.length === 0) {
            router.replace("/shop")
        }
    }, [cartItems, router])

    return (
        <div className="p-6 max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-green-600 mb-4">
                Thank you for your order!
            </h1>
            <p className="text-lg mb-2">
                You purchased <strong>{itemCount}</strong> item{itemCount !== 1 && "s"}
                totaling{" "}
                <strong>{total.toFixed(2)}</strong>
            </p>

            <p className="text-gray-600">We hope you enjoy your shopping experience!</p>
        </div>
    )
}
