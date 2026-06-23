"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabase";

export default function ShopPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");



  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("is_sold", false);  

    if (!error && data) {
      setProducts(data);
    }
  }

  let filteredProducts = [...products];

  if (category !== "All") {
    filteredProducts = filteredProducts.filter(
      (item) =>
        item.category?.toLowerCase() ===
        category.toLowerCase()
    );
  }

  if (search) {
    filteredProducts = filteredProducts.filter(
      (item) =>
        item.title
          ?.toLowerCase()
          .includes(search.toLowerCase())
    );
  }

  if (sort === "low") {
    filteredProducts.sort(
      (a, b) => a.price - b.price
    );
  }

  if (sort === "high") {
    filteredProducts.sort(
      (a, b) => b.price - a.price
    );
  }

  return (
    <main
      className="
      min-h-screen
      bg-[#F1E4C8]
      text-black
      px-6
      md:px-12
      py-12
      "
    >
      <div
        className="
        max-w-7xl
        mx-auto
        "
      >
        <h1
          className="
          text-5xl
          md:text-7xl
          font-bold
          mb-10
          "
        >
          Shop
        </h1>

        <input
          type="text"
          placeholder="Search furniture"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="
          w-full
          bg-white
          text-black
          rounded-2xl
          p-5
          mb-8
          outline-none
          shadow-md
          "
        />

        <div
          className="
          flex
          flex-wrap
          gap-4
          mb-10
          "
        >
          <select
            value={sort}
            onChange={(e) =>
              setSort(e.target.value)
            }
            className="
            bg-white
            text-black
            rounded-xl
            px-5
            py-3
            shadow-md
            "
          >
            <option value="default">
              Default
            </option>

            <option value="low">
              Price Low → High
            </option>

            <option value="high">
              Price High → Low
            </option>
          </select>

          {[
            "All",
            "Sofa",
            "Bed",
            "Table",
            "Chair",
          ].map((item) => (
            <button
              key={item}
              onClick={() =>
                setCategory(item)
              }
              className={`
                px-6
                py-3
                rounded-full
                shadow-md

                ${
                  category === item
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }
              `}
            >
              {item}
            </button>
          ))}
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
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/shop/${product.id}`}
              className="
              bg-white
              rounded-3xl
              overflow-hidden
              shadow-md
              hover:shadow-xl
              transition-all
              duration-300
              hover:-translate-y-2
              "
            >
              <img
                src={product.image}
                alt={product.title}
                className="
                w-full
                h-64
                object-cover
                "
              />

              <div className="p-5">
                <h3
                  className="
                  text-xl
                  font-semibold
                  mb-2
                  "
                >
                  {product.title}
                </h3>

                <p
                  className="
                  text-2xl
                  font-bold
                  "
                >
                  ${product.price}
                </p>

                <p
                  className="
                  text-gray-500
                  mt-2
                  "
                >
                  {product.category}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}