// pages/api/create-checkout-session.js

import { createClerkSupabaseClient } from "@/lib/supabase/supabaseClient";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-09-30.acacia",
});

export async function POST(req: Request) {
  const supabase = await createClerkSupabaseClient();

  try {
    const body = await req.json();
    const { newBookingOne, totalePrice } = body;
    console.log(newBookingOne);
    // clause guard check if b ooking already booked
    const { data: existingBooking, error } = await supabase
      .from("booking")
      .select("id")
      .eq("room_id", newBookingOne.room_id)
      .or(
        `(start_date <= '${newBookingOne.endDate}' AND end_date >= '${newBookingOne.startDate}')`,
      );

      /* 
      FAIRE LA VERIFICATION SI LA CHAMBRE EST DEJA RESERVEE DANS SUPABASE + VERIF DEUX ECRAN
      A LA SUPPRESSION DE LA RESERVATION, SUPPRIMER DANS STRIPE
      CHANGER WORDING MYBOOKING SI ROOM RESERVER
      CHERCHER DATE DU DATE PICKER
      POINT 7
      POINT 8
      POINT 9
      POINT 10
      POINT 11
      POINT 2
      */
    if (error) {
      console.error("Error checking existing bookings:", error);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalePrice,
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
