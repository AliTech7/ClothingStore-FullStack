"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
    const router = useRouter();
    const [userId, setUserId] = useState("");

    useEffect(() => {
        const storedId = localStorage.getItem("userId");
        if (storedId) {
            setUserId(storedId);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("userId");
        setUserId("");
        router.push("/");
    };

    return (
        <nav className="bg-gray-900 px-6 py-4 flex justify-between items-center">
            <div className="font-bold text-xl">ClothingStore</div>
            <div className="space-x-6">
                <Link href="/" className="hover:underline">Home</Link>
                <Link href="/shop" className="hover:underline">Shop</Link>
                <Link href="/cart" className="hover:underline">Cart</Link>
                {userId ? (
                    <>
                        <Link href="/profile" className="hover:underline">Profile</Link>
                        <button
                            onClick={handleLogout}
                            className="hover:underline text-red-400 ml-4"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link href="/auth/login" className="hover:underline">Login</Link>
                        <Link href="/auth/signup" className="hover:underline">Signup</Link>
                    </>
                )}
            </div>
        </nav>
    );
}
