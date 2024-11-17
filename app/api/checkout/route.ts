// pages/api/create-checkout-session.js

import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-09-30.acacia",
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { room, totalePrice } = body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalePrice,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        id: room.id,
      },
    });

    return NextResponse.json({ paymentIntent });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to create Stripe session" },
      { status: 500 },
    );
  }
}
