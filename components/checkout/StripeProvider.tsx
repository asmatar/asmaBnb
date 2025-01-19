import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";

function StripeProvider() {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  //const { clientSecret } = useBookingStore();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    console.log("after close guard");
    //const clientSecret ="pi_3QOea7Fkr8gEJezM0dzwerez_secret_jIxOVw6sanH3qvJl7X7tRMK0d";
    try {
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: "",
        },
        redirect: "if_required",
      }); /* as {
        paymentIntent: Stripe.PaymentIntent;
        error: Stripe.StripeRawError;
      }; */
      const { paymentIntent, error } = result;
      if (error) {
        console.error("Error confirming payment:", error.message);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        router.push("/my-bookings");
        console.log("Payment succeeded:", paymentIntent);
        // Vous pouvez effectuer des actions personnalisées ici
      }
      console.log(paymentIntent);
      console.log(error);
    } catch (error) {
      console.log(error);
    }

    /*     if (error) {
      console.log("error", error);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      console.log("first");
    } */
  };

  return (
    <>
      {/* <RoomCard room={room} /> */}

      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" />
        <button disabled={!stripe || !elements} id="submit">
          <span id="button-text">Pay now</span>
        </button>
      </form>
    </>
  );
}

export default StripeProvider;
