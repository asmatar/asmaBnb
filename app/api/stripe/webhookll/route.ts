/* import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);
 */
/* export default async function handler(req, res) {
  console.log("handler");
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    return res.status(400).json({ error: `Webhook error: ${err.message}` });
  }

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;
    console.log("here i qm");
    await supabase
      .from("bookings")
      .update({ paymentStatus: "paid" })
      .eq("payment_intent_id", paymentIntent.id);

    console.log(`Booking updated: ${paymentIntent.id}`);
  }

  res.json({ received: true });
}
 */
