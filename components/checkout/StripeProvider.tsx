import { updateBooking } from "@/services/bookingService";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Calendar, Utensils } from "lucide-react";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Separator } from "../ui/separator";

function Submit() {
  const { pending } = useFormStatus();
  const stripe = useStripe();
  const elements = useElements();
  return (
    <Button
      disabled={!stripe || !elements || pending}
      id="submit"
      type="submit"
      className="w-full mt-6 py-6 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300"
      variant="default"
    >
      <span id="button-text" className="text-lg">
        {pending ? "Traitement en cours..." : "Payer maintenant"}
      </span>
    </Button>
  );
}

function Form({
  action,
  startDate,
  endDate,
  totalPrice,
  breakfastPrice,
  breakfastIncluded,
}: {
  action: (formData: FormData) => Promise<void>;
  startDate: string;
  endDate: string;
  totalPrice: number;
  breakfastPrice: number;
  breakfastIncluded: boolean;
}) {
  const t = await getTranslations("CheckoutStripe");
  return (
    <form action={action} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">{t("paymentInformation")}</h3>
        <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
      </div>

      <Card className="p-6 border-primary/10">
        <h3 className="text-lg font-medium mb-4">{t("summary")}</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-muted-foreground">
            <Calendar className="w-5 h-5" />
            <div>
              <p>
                {t("arrival")}: {startDate} à 17h
              </p>
              <p>
                {t("departure")}: {endDate} à 11h
              </p>
            </div>
          </div>

          {breakfastIncluded && (
            <div className="flex items-center gap-3 text-muted-foreground">
              <Utensils className="w-5 h-5" />
              <p>{t("breakfastIncluded")}</p>
            </div>
          )}

          <Separator className="my-4" />

          <div className="space-y-2">
            {breakfastIncluded && (
              <div className="flex justify-between">
                <span>{t("breakfast")}:</span>
                <span className="font-medium">${breakfastPrice}</span>
              </div>
            )}
            <div className="flex justify-between text-lg">
              <span className="font-medium">{t("total")}:</span>
              <span className="font-bold">${totalPrice}</span>
            </div>
          </div>
        </div>
      </Card>

      <Submit />
    </form>
  );
}

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

  const handleSubmit = async () => {
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
        await updateBooking(paymentIntent.id);
        router.push("/thank-you");
      }
      console.log(error);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form
      action={handleSubmit}
      startDate={startDate}
      endDate={endDate}
      totalPrice={totalPrice}
      breakfastPrice={breakfastPrice}
      breakfastIncluded={breakfastIncluded}
    />
  );
}

export default StripeProvider;
