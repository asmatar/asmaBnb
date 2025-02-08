import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

function StripeProvider({
  startDate,
  endDate,
  totalPrice,
  breakfastPrice,
  breakfastIncluded,
}: {
  startDate: string;
  endDate: string;
  totalPrice: number;
  breakfastPrice: number;
  breakfastIncluded: boolean;
}) {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  //const { clientSecret } = useBookingStore();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    try {
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: "",
        },
        redirect: "if_required",
      });
      const { paymentIntent, error } = result;
      if (error) {
        console.error("Error confirming payment:", error.message);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        router.push("/my-bookings");
      }

      console.log(error);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
        <div className="flex flex-col gap-1 mt-4">
          <h2 className="text-lg mb-1 font-semibold">Your booking summary</h2>
          <div className="">you will check in on {startDate} at 5PM</div>
          <div className="">you will check out on {endDate} at 11PM</div>
          {breakfastIncluded && (
            <div className="">you will be served breakfast each day at 8PM</div>
          )}
          <Separator />
          <div className="font-bold text-lg ">
            <div className="mb-2">Breakfast Price: ${breakfastPrice}</div>
            total price: ${totalPrice}
          </div>
        </div>
        <Button
          disabled={!stripe || !elements}
          id="submit"
          type="submit"
          className="mt-4"
          variant="default"
        >
          <span id="button-text">Pay now</span>
        </Button>
      </form>
    </>
  );
}

export default StripeProvider;
