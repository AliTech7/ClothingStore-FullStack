"use client";

import Image from "next/image";
import useCartStore from "@/store/cartStore";
import { useRouter } from "next/navigation"; 

export default function CartPage() {
  const {
    cartItems,
    clearCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCartStore();

  const router = useRouter();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {

    const userId = localStorage.getItem("userId") || "guest_123"

    const itemsWithUser = cartItems.map(item => ({
      ...item,
      userId,
    }))

    try {
      const res = await fetch("/api/sales", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(itemsWithUser),
      });

      const data = await res.json();
      console.log("Order Response:", data);


      router.push("/order-confirmation")
      clearCart();
    } catch (err) {
      console.error("Checkout failed", err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center border-b pb-4 gap-4"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="object-cover rounded"
                />

                <div className="flex-grow">
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <p>Price: ${item.price.toFixed(2)}</p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm"
                    >
                      -
                    </button>
                    <span className="text-sm font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <p className="text-lg font-bold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 text-sm hover:underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between items-center">
            <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
            <button
              onClick={handleCheckout}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 cursor-pointer"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
