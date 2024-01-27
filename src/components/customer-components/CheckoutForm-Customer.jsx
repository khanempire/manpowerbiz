/*eslint-disable*/
import React, { useEffect, useState } from "react";
import { PaymentElement, LinkAuthenticationElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { postCallWithHeaders } from "../../helpers/apiCallHelpers";
import { failureNotification, successNotification } from "../../helpers/notificationHelper";
import { Button, Group } from "@mantine/core";
import { IconArrowLeftTail } from "@tabler/icons-react";
import { IconArrowLeft } from "@tabler/icons-react";
import { useContext } from "react";
import { ShoppingCartContext } from "../../contexts/ShoppingCartContext";

export default function CheckoutFormCustomer({ clientSecret, paymentValue, setExternalElements, externalElements, externalStripe, setExternalStripe, dataToSend, nextStep, prevStep, invoiceData, setInvoiceData }) {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { setShoppingCartItems } = useContext(ShoppingCartContext);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {},
      redirect: "if_required",
    });

    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        failureNotification(error.message);
      } else {
        failureNotification("An unexpected error occurred.");
      }
    } else {
      let apiResponse = await postCallWithHeaders("customer/customer-create-payment", dataToSend);

      if (apiResponse?.error) {
        failureNotification(apiResponse.msg);
      } else {
        successNotification("Payment successful!");
        nextStep();
        setInvoiceData(apiResponse?.data);
        setShoppingCartItems([]);
      }
    }

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error?.type === "card_error" || error?.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement id="link-authentication-element" onChange={(e) => setEmail(e.target.value)} />
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <Group position="apart">
        <Button variant="filled" onClick={prevStep} leftIcon={<IconArrowLeft />}>
          Back
        </Button>
        <button
          disabled={isLoading || !stripe || !elements}
          id="submit"
          style={{
            backgroundColor: "#62A82C",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
          }}
        >
          <span id="button-text">{isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}</span>
        </button>
      </Group>
      {/* Show any error or success messages */}
      {/* {message && <div id="payment-message">{message}</div>} */}
    </form>
  );
}
