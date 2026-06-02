export default function Footer() {
  return (
    <footer className="bg-black text-white py-20">

      <div className="max-w-7xl mx-auto px-8">

        <div className="grid md:grid-cols-4 gap-10">

          <div>
            <h2 className="text-3xl font-bold">
              UrbanFurniture
            </h2>

            <p className="mt-4 text-gray-400">
              Premium furniture for modern homes.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">
              Shop
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li>Sofas</li>
              <li>Beds</li>
              <li>Dining</li>
              <li>Tables</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">
              Company
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li>About</li>
              <li>Delivery</li>
              <li>Contact</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">
              Subscribe
            </h3>

            <input
              type="email"
              placeholder="Enter email"
              className="
                w-full
                p-4
                rounded-xl
                text-black
              "
            />

            <button
              className="
                mt-4
                w-full
                bg-white
                text-black
                py-4
                rounded-xl
              "
            >
              Subscribe
            </button>

          </div>

        </div>

        <div className="mt-16 border-t border-gray-800 pt-8 text-gray-500">
          © 2026 UrbanFurniture
        </div>

      </div>

    </footer>
  );
}