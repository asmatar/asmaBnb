"use client";
import RoomCard from "@/components/RoomCard";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51JmxBgFkr8gEJezM0gPQ7Ugs9M4PPDdHk54S4Rs9JQjJfr8GJbXe1r0LFafzlupFGTfZKhMNdTLf6kRBMCJTWsiP00gaYhPXQd",
);
const Page = () => {
  return (
    <Elements stripe={stripePromise}>
      <StripeProvider />
    </Elements>
  );
};
function StripeProvider() {
  const options = {
    // passing the client secret obtained in step 3
    //clientSecret: "{{CLIENT_SECRET}}",
    clientSecret:
      "pi_3QEIJMFkr8gEJezM0cKvX9Ke_secret_UNRFeqrNPjt8AKXN9FkBtXUZG",
    // Fully customizable with appearance API.
    /* appearance: {
     ...
    },*/
  };
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const { error } = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "http://localhost:3000",
      },
    });

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      setErrorMessage(error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };
  return (
    <>
      <RoomCard room={room} />
      <Elements stripe={stripePromise} options={options}>
        <form onSubmit={handleSubmit}>
          <PaymentElement />
          <button>Submit</button>
        </form>
      </Elements>
    </>
  );
}
export default Page;
