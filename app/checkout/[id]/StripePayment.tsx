"use client";
import StripeProvider from "@/components/checkout/StripeProvider";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
const stripePromise = loadStripe(
  "pk_test_51JmxBgFkr8gEJezM0gPQ7Ugs9M4PPDdHk54S4Rs9JQjJfr8GJbXe1r0LFafzlupFGTfZKhMNdTLf6kRBMCJTWsiP00gaYhPXQd",
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
      } catch (err: any) {
        toast.error(err.message);
      }
    };

    fetchPaymentIntent();
  }, [clientSecret]);

  return (
    <>
      <h2 className="text-2xl font-semibold mb-2">Payment Information</h2>
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
    </>
  );
};

export default StripePayment;
