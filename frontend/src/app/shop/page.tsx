"use client";

import products from "@/data/products.json";
import Link from "next/link";
import Image from "next/image";
import useCartStore from "@/store/cartStore"; 

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
};

export default function ShopPage() {
  const addToCart = useCartStore((state) => state.addToCart); 

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product: Product) => (
        <div
          key={product.id}
          className="relative bg-white rounded-lg shadow-md overflow-hidden group"
        >
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={400}
            className="w-full h-64 object-cover"
          />

          <div className="p-4">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600">${product.price}</p>
          </div>

          {/* Hover Buttons */}
          <div className="absolute inset-0 z-10 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-4">
            <button
              onClick={() => addToCart(product)} 
              className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 cursor-pointer"
            >
              Add to Cart
            </button>
            <Link
              href={`/product/${product.id}`}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
            >
              View
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
