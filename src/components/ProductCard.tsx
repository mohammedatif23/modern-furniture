import Link from "next/link";

type ProductProps = {
  id: number;
  image: string;
  title: string;
  price: string;
};

export default function ProductCard({
  id,
  image,
  title,
  price,
}: ProductProps) {
  return (
    <Link href={`/shop/${id}`}>
      {/* <div
        className="
        bg-white
        rounded-3xl
        overflow-hidden
        shadow-md
        hover:shadow-2xl
        transition-all
        duration-300
        hover:-translate-y-2
        cursor-pointer
        "
      > */}
            <div
        className="
        bg-white
        rounded-3xl
        shadow-md
        overflow-hidden
        transition
        hover:shadow-xl
        "
        >
        <div className="overflow-hidden">
          {/* <img
            src={image}
            alt={title}
            className="
            h-[300px]
            w-full
            object-cover
            transition-transform
            duration-500
            hover:scale-105
            "
          /> */}
                <img
        src={image}
        alt={title}
        className="
        h-[300px]
        w-full
        object-cover
        "
        />
        </div>

        {/* <div className="p-6">

          <h3
            className="
            text-xl
            font-semibold
            text-black
            "
          >
            {title}
          </h3>

          <p
            className="
            mt-2
            text-2xl
            font-bold
            text-black
            "
          >
            ${price}
          </p>

          <button
            className="
            mt-5
            w-full
            bg-black
            text-white
            py-3
            rounded-full
            font-medium
            hover:bg-gray-800
            transition
            "
          >
            View Product
          </button>

        </div> */}
                <div className="p-6">
        <h3 className="text-2xl font-semibold text-black">
            {title}
        </h3>

        <p className="mt-2 text-gray-600">
            ${price}
        </p>

        <button
            className="
            mt-5
            w-full
            bg-black
            text-white
            py-3
            rounded-full
            "
        >
            View Product
        </button>
        </div>
      </div>
    </Link>
  );
}