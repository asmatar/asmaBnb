// pages/api/create-checkout-session.js

import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-09-30.acacia",
});

export async function POST(req: Request) {
  //const supabase = await createClerkSupabaseClient();

  try {
    const body = await req.json();
    const { newBookingOne } = body;
    /*

      POINT 9
      POINT 10
      POINT 14
      POINT 2
      PAGINATION + verifier filtre meme si pas encore fetch
      */

    const paymentIntent = await stripe.paymentIntents.create({
      amount: newBookingOne.totalPrice * 100,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        id: newBookingOne.id,
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
