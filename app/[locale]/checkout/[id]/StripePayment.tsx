"use client";
import StripeProvider from "@/components/checkout/StripeProvider";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,
);

const StripePayment = ({
  id,
  startDate,
  endDate,
  totalPrice,
  breakfastPrice,
  breakfastIncluded,
}: {
  id: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  breakfastPrice: number;
  breakfastIncluded: boolean;
}) => {
  const [clientSecret, setClientSecret] = useState();

  useEffect(() => {
    const fetchPaymentIntent = async () => {
      try {
        const response = await fetch(
          `/api/stripe/retrievePaymentIntent?id=${id}`,
        );

        if (!response.ok) {
          return toast.error("Failed to fetch payment intent");
        }

        const data = await response.json();
        setClientSecret(data.client_secret);
      } catch (err: unknown) {
        if (err instanceof Error) {
          toast.error(err.message);
        } else {
          toast.error("An unknown error occurred");
        }
      }
    };

    fetchPaymentIntent();
  }, [clientSecret, id]);

  return (
    <div className="space-y-6">
      {clientSecret && (
        <Elements
          options={{
            clientSecret,
          }}
          stripe={stripePromise}
        >
          <StripeProvider
            startDate={startDate}
            endDate={endDate}
            totalPrice={totalPrice}
            breakfastPrice={breakfastPrice}
            breakfastIncluded={breakfastIncluded}
          />
        </Elements>
      )}
    </div>
  );
};

export default StripePayment;
