"use client";
import StripeProvider from "@/components/checkout/StripeProvider";
//import StripeProvider from "@/components/checkout/StripeProvider";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51JmxBgFkr8gEJezM0gPQ7Ugs9M4PPDdHk54S4Rs9JQjJfr8GJbXe1r0LFafzlupFGTfZKhMNdTLf6kRBMCJTWsiP00gaYhPXQd",
);

const Page = () => {
  //const roomBooked = await getOneRoom(room);
  //const roomBooked = await getOneRoom(room);

  return (
    <Elements stripe={stripePromise}>
      <StripeProvider />
    </Elements>
  );
};

export default Page;
