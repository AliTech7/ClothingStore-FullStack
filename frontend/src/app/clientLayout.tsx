"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setIsLoggedIn(!!userId);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <>
      <nav className="bg-white border-b shadow px-6 py-4 flex justify-between items-center">
        <div className="space-x-6 font-medium">
          <Link href="/" className="text-blue-600 text-lg">Home</Link>
          <Link href="/shop" className="text-blue-600 text-lg">Shop</Link>
          <Link href="/cart" className="text-blue-600 text-lg">Cart</Link>
          {isLoggedIn && <Link href="/profile" className="text-green-700 text-lg">Profile</Link>}
        </div>
        <div className="space-x-4 text-sm">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-green-700 text-lg hover:underline cursor-pointer"
            >
              Logout
            </button>
          ) : (
            <>
              <Link href="/auth/signup" className="text-lg text-blue-600 hover:underline">
                Signup
              </Link>
              <Link href="/auth/login" className="text-lg text-blue-600 hover:underline">
                Login
              </Link>
            </>
          )}
        </div>
      </nav>


      <main className="max-w-5xl mx-auto p-6">{children}</main>
    </>
  );
}
