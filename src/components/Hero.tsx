import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-[#F1E4C8]">
      <div
        className="
        max-w-7xl
        mx-auto
        px-8
        py-24
        grid
        lg:grid-cols-2
        gap-16
        items-center
        "
      >
        <div>
          <h1
            className="
            text-black
            text-6xl
            md:text-8xl
            font-bold
            "
          >
            Modern Furniture
          </h1>

          <p
            className="
            mt-8
            text-xl
            text-gray-700
            "
          >
            Premium sofas, beds and dining collections
            designed for modern Australian homes.
          </p>

          <div className="mt-10 flex gap-4">
            <Link href="/shop">
              <button
                className="
                bg-black
                text-white
                px-8
                py-4
                rounded-full
                "
              >
                Shop Now
              </button>
            </Link>
          </div>
        </div>

        <img
          src="/hero.jpg"
          alt="Furniture"
          className="
          w-full
          h-[600px]
          object-cover
          rounded-3xl
          shadow-xl
          "
        />
      </div>
    </section>
  );
}