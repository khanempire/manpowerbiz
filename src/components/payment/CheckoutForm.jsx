/* eslint-disable */
import { useEffect, useState } from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Paper, Title } from "@mantine/core";

export default function CheckoutForm({
  clientSecret,
  setExternalStripe,
  setExternalElements,
  message,
}) {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!stripe) {
      return;
    } else {
      setExternalStripe(stripe);
    }
    if (!clientSecret) {
      return;
    }
    if (!elements) {
      return;
    } else {
      setExternalElements(elements);
    }
  }, [stripe]);

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <Paper p={"xl"}>
      <form
        id="payment-form"
        style={{
          width: "30vw",
          minWidth: "500px",
          alignSelf: "center",
          boxShadow:
            "0px 0px 0px 0.5px rgba(50, 50, 93, 0.1), 0px 2px 5px 0px rgba(50, 50, 93, 0.1) ,0px 1px 1.5px 0px rgba(0, 0, 0, 0.07)",
          borderRadius: "7px",
          padding: "40px",
        }}
      >
        <Title order={2} mb={"md"} align="center">
          Stripe Payment
        </Title>
        <LinkAuthenticationElement
          id="link-authentication-element"
          onChange={(e) => setEmail(e.target.value)}
        />
        <PaymentElement id="payment-element" options={paymentElementOptions} />
      </form>
    </Paper>
  );
}
