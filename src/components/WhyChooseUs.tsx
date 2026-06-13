export default function WhyChooseUs() {
  const features = [
    {
      title: "Premium Quality",
      desc: "Crafted using high-quality materials built to last.",
      icon: "⭐",
    },
    {
      title: "Fast Delivery",
      desc: "Quick and reliable delivery across Australia.",
      icon: "🚚",
    },
    {
      title: "Secure Payments",
      desc: "Safe checkout experience with trusted payment methods.",
      icon: "🔒",
    },
    {
      title: "Modern Designs",
      desc: "Furniture designed for contemporary living spaces.",
      icon: "🏡",
    },
  ];

  return (
    <section className="py-24 bg-[#F1E4C8]">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-black mb-14 text-center">
          Why Choose Us
        </h2>

        <div className="grid md:grid-cols-4 gap-8">

          {features.map((item) => (
            <div
              key={item.title}
              className="
              bg-white
              rounded-3xl
              p-8
              text-center
              shadow-md
              hover:shadow-xl
              transition
              "
            >
              <div className="text-5xl mb-5">
                {item.icon}
              </div>

              <h3 className="text-2xl font-bold text-black mb-3">
                {item.title}
              </h3>

              <p className="text-gray-600">
                {item.desc}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}