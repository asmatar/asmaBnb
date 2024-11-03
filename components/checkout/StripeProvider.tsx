import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
function StripeProvider() {
  /*  const stripePromise = loadStripe(
    "pk_test_51JmxBgFkr8gEJezM0gPQ7Ugs9M4PPDdHk54S4Rs9JQjJfr8GJbXe1r0LFafzlupFGTfZKhMNdTLf6kRBMCJTWsiP00gaYhPXQd",
  );
  const options = {
    // passing the client secret obtained in step 3
    //clientSecret: "{{CLIENT_SECRET}}",
    clientSecret:
      "pi_3QEIJMFkr8gEJezM0cKvX9Ke_secret_UNRFeqrNPjt8AKXN9FkBtXUZG",
    // Fully customizable with appearance API.
    // appearance: {
    // ...
    //},
  }; */
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();
    const cardElement = elements?.getElement("card");
    if (!stripe || !cardElement) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    await stripe.confirmCardPayment(clientSecret, {
      //`Elements` instance that was used to create the Payment Element
      //elements,
      payment_method: { card: cardElement },
    });

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };
  return (
    <>
      {/* <RoomCard room={room} /> */}
      {/* <Elements stripe={stripePromise} options={options}> */}
      <form onSubmit={handleSubmit}>
        {/*   <PaymentElement /> */}
        <CardElement />
        <button>Submit</button>
      </form>
      {/*  </Elements> */}
    </>
  );
}

export default StripeProvider;
