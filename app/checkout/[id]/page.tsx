"use client";
import StripeProvider from "@/components/checkout/StripeProvider";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";

const stripePromise = loadStripe(
  "pk_test_51JmxBgFkr8gEJezM0gPQ7Ugs9M4PPDdHk54S4Rs9JQjJfr8GJbXe1r0LFafzlupFGTfZKhMNdTLf6kRBMCJTWsiP00gaYhPXQd",
);

const Page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [clientSecret, setClientSecret] = useState();

  //const roomBooked = await getOneRoom(room);
  useEffect(() => {
    const fetchPaymentIntent = async () => {
      try {
        const response = await fetch(
          `/api/stripe/retrievePaymentIntent?id=${id}`,
        );

        if (!response.ok) {
          throw new Error("Failed to retrieve payment intent");
        }

        const data = await response.json();
        console.log(data);
        setClientSecret(data.client_secret);
      } catch (err: any) {
        console.log(err);
      }
    };

    fetchPaymentIntent();
  }, [clientSecret]);

  return (
    <>
      <p className="mt-40"></p>
      {clientSecret && (
        <Elements options={{ clientSecret }} stripe={stripePromise}>
          <StripeProvider />
        </Elements>
      )}
    </>
  );
};

export default Page;
