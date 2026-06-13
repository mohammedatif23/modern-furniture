"use client";

export default function BlogSection() {

  const blogs = [
    {
      title: "Perfect Sofa Guide",
      desc: "Learn how to select the ideal sofa for your home.",
      image: "/blog1.jpg",
    },
    {
      title: "Luxury Bedrooms",
      desc: "Create a relaxing and elegant bedroom experience.",
      image: "/blog2.jpg",
    },
    {
      title: "Dining Trends",
      desc: "Modern dining furniture ideas for every family.",
      image: "/blog3.jpg",
    },
    {
      title: "Interior Inspiration",
      desc: "Discover premium furniture styling techniques.",
      image: "/blog4.jpg",
    },
    {
      title: "Small Space Living",
      desc: "Maximize comfort without sacrificing style.",
      image: "/blog5.jpg",
    },
  ];

  

  return (
    <section className="py-24 bg-[#F1E4C8] overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 mb-12">
        <h2
         className="text-5xl md:text-6xl text-black italic font-serif"
            >
          Design Inspiration
        </h2>

        <p className="text-gray-700 mt-4 text-lg">
          Explore modern furniture ideas and lifestyle trends.
        </p>
      </div>

      <div className="overflow-hidden">

        <div className="flex animate-blog-scroll">

          {[...blogs, ...blogs].map(
            (blog, index) => (
              <div
                key={index}
                className="
                flex-shrink-0
                w-[700px]
                h-[320px]
                bg-[#C8A27A]
                overflow-hidden
                -skew-x-12
                border-r
                border-gray-200
                "
              >

                <div className="flex h-full skew-x-12">

                  <div
                    className="
                    w-1/3
                    p-8
                    flex
                    flex-col
                    justify-center
                    "
                  >
                    <h3
                    className="
                    text-3xl
                    text-black
                    italic
                    font-serif
                    mb-4
                    "
                    >
                      {blog.title}
                    </h3>

                    <p className="text-gray-600">
                      {blog.desc}
                    </p>
                  </div>

                  <div className="w-2/3">

                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="
                      w-full
                      h-full
                      object-cover
                      "
                    />

                  </div>

                </div>

              </div>
            )
          )}

        </div>

      </div>

    </section>
  );
}