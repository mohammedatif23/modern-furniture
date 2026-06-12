"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabase";

export default function ShopPage() {

  const searchParams = useSearchParams();

  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(
  searchParams.get("category") || "All"
);
  const [sort, setSort] = useState("default");

  useEffect(() => {


    loadProducts();
  }, []);

  useEffect(() => {
  const categoryFromUrl =
    searchParams.get("category");

  if (categoryFromUrl) {
    setCategory(categoryFromUrl);
  }
}, [searchParams]);

  async function loadProducts() {

    const { data, error } = await supabase
      .from("products")
      .select("*");

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
      bg-black
      text-white
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
          text-[#D4AF37]
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

          {["All", "Sofa", "Bed", "Table", "Chair"].map(
            (item) => (
              <button
                key={item}
                onClick={() =>
                  setCategory(item)
                }
                className={`
                px-6
                py-3
                rounded-xl
                border

                ${
                  category === item
                    ? "bg-[#D4AF37] text-black border-[#D4AF37]"
                    : "border-white text-white"
                }
              `}
              >
                {item}
              </button>
            )
          )}
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
              border
              border-[#D4AF37]
              rounded-3xl
              overflow-hidden
              hover:scale-105
              duration-300
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
                  text-[#D4AF37]
                  text-2xl
                  font-bold
                "
                >
                  ${product.price}
                </p>

                <p
                  className="
                  text-gray-400
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