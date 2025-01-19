import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-09-30.acacia",
});

export async function GET(req: Request) {
  // Extraire les paramètres de la requête
  const { searchParams } = new URL(req.url);
  const paymentIntentId = searchParams.get("id");

  if (!paymentIntentId) {
    return NextResponse.json(
      { error: "Missing paymentIntentId" },
      { status: 400 },
    );
  }

  try {
    // Récupérer le Payment Intent avec Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    return NextResponse.json(paymentIntent, { status: 200 });
  } catch (error: any) {
    console.error("Error retrieving payment intent:", error.message);
    return NextResponse.json(
      { error: "Failed to retrieve payment intent", message: error.message },
      { status: 500 },
    );
  }
}
