"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { supabase } from "../lib/supabase";

export default function FeaturedProducts() {
  const [products, setProducts] =
    useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("products")
        .select("*")
        .limit(4);

      if (data) {
        setProducts(data);
      }
    }

    load();
  }, []);

  return (
    <section className="py-24 bg-[#F1E4C8]">
      <div
        className="
        max-w-7xl
        mx-auto
        px-6
        md:px-12
        "
      >
        <div className="mb-16">

          <p
            className="
            uppercase
            tracking-[0.25em]
            text-gray-500
            text-sm
            mb-4
            "
          >
            Featured Collection
          </p>

          <h2
            className="
            text-5xl
            md:text-6xl
            font-bold
            tracking-tight
            text-black
            "
          >
            Best Sellers
          </h2>

          <p
            className="
            mt-4
            text-gray-600
            text-lg
            max-w-2xl
            "
          >
            Discover our most loved pieces,
            crafted to elevate modern living.
          </p>

        </div>

        <div
          className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-8
          "
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price.toString()}
              image={product.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
}