import { postCallWithHeaders } from "./apiCallHelpers";
import { failureNotification, successNotification } from "./notificationHelper";

export const stripeHandlePaymentCustomer = async (
  stripe,
  elements,
  setIsLoading,
  dataToSend,
  paymentValue,
  setMessage,
  nextStep,
  setDisabledStepper,
  setPaidBooking,
  setLoading,
  CardElement
) => {
  setLoading(true);
  if (!stripe || !elements) {
    console.log("Stripe: ", stripe);
    console.log("Elements: ", elements);
    // Stripe.js hasn't yet loaded.
    // Make sure to disable form submission until Stripe.js has loaded.
    setLoading(false);
    return;
  }

  setIsLoading(true);
  try {
    const { error, paymentIntent } = await stripe.confirmCardPayment(
      paymentValue, // This should be the payment amount
      {
        payment_method: {
          card: elements.getElement(CardElement), // Use the CardElement from Stripe Elements
        },
        // Any additional confirm options you might need
      }
    );

    if (error) {
      console.log("Payment error: ", error);
      failureNotification(error.message);
      setLoading(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setIsLoading(true);
      let apiResponse = await postCallWithHeaders(
        "customer/customer-create-payment",
        dataToSend
      );
      if (!apiResponse.status) {
        failureNotification(`${apiResponse.msg}`);
        setMessage(error.message);
        setLoading(false);
      } else {
        setPaidBooking(apiResponse.data);
        setMessage("Payment made successfully!");
        successNotification(`Payment made successfully`);
        setDisabledStepper(true);
        setLoading(false);
        nextStep();
      }
    }
  } catch (error) {
    console.log("ERROR: ", error);
    setIsLoading(false);
    setLoading(false);
  }
  setIsLoading(false);
  setLoading(false);
};
