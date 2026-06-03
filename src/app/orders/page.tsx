"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function OrdersPage() {

  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      setLoading(false);
      return;
    }

    const { data } = await supabase
      .from("orders")
      .select("*")
      .eq(
        "customer_email",
        session.user.email
      )
      .order("id", {
        ascending: false,
      });

    if (data) {
      setOrders(data);
    }

    setLoading(false);
  }

  return (
    <main
      className="
      min-h-screen
      bg-black
      text-[#D4AF37]
      px-8
      py-20
      "
    >
      <div
        className="
        max-w-5xl
        mx-auto
        "
      >
        <h1
          className="
          text-6xl
          font-bold
          mb-10
          "
        >
          My Orders
        </h1>

        {loading && (
          <p className="text-white">
            Loading orders...
          </p>
        )}

        {!loading && orders.length === 0 && (
          <p className="text-white">
            No orders found.
          </p>
        )}

        <div className="space-y-5">

          {orders.map((order) => (

            <div
              key={order.id}
              className="
              border
              border-[#D4AF37]
              rounded-2xl
              p-6
              "
            >
              <h3>
                Order #{order.id}
              </h3>

              <p>
                Total: ${order.total}
              </p>

              <p>
                Status: {order.status || "Pending"}
              </p>

              <p>
                Date: {new Date(
                  order.created_at
                ).toLocaleString()}
              </p>

              <div className="mt-3">

                {order.items?.map(
                  (
                    item: any,
                    index: number
                  ) => (
                    <p key={index}>
                      • {item.title}
                    </p>
                  )
                )}

              </div>

            </div>

          ))}

        </div>

      </div>
    </main>
  );
}