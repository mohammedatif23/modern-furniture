/* import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY!
);

export async function POST(req: Request) {
  const { cart } = await req.json();

  const session =
    await stripe.checkout.sessions.create({
      payment_method_types: ["card"],

      line_items: cart.map((item: any) => ({
        price_data: {
          currency: "aud",

          product_data: {
            name: item.title,
          },

          unit_amount: item.price * 100,
        },

        quantity: 1,
      })),

      mode: "payment",

      success_url:
       `${process.env.NEXT_PUBLIC_SITE_URL}`,

      cancel_url:
      `${process.env.NEXT_PUBLIC_SITE_URL}/cart`,
    });

  return NextResponse.json({
  url: session.url,
});
} */

import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY!
);

export async function POST(req: Request) {
  try {
    const { cart } = await req.json();

    const session =
      await stripe.checkout.sessions.create({
        payment_method_types: ["card"],

        line_items: cart.map((item: any) => ({
          price_data: {
            currency: "aud",

            product_data: {
              name: item.title,
            },

            unit_amount: Math.round(item.price * 100),
          },

          quantity: 1,
        })),

        mode: "payment",

        success_url:
          `${process.env.NEXT_PUBLIC_SITE_URL}/success`,

        cancel_url:
          `${process.env.NEXT_PUBLIC_SITE_URL}/cart`,
      });

    return NextResponse.json({
      url: session.url,
    });

  } catch (error: any) {

    console.error("STRIPE ERROR:", error);

    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}