import { postCallWithHeaders } from "./apiCallHelpers";
import { failureNotification, successNotification } from "./notificationHelper";

export const stripeHandlePayment = async (
  stripe,
  elements,
  setIsLoading,
  selectedBooking,
  paymentValue,
  setMessage,
  nextStep,
  setDisabledStepper,
  setPaidBooking,
  setLoading
) => {
  setLoading(true);
  if (!stripe || !elements) {
    // Stripe.js hasn't yet loaded.
    // Make sure to disable form submission until Stripe.js has loaded.
    setLoading(false);
    return;
  }

  setIsLoading(true);
  try {
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {},
      redirect: "if_required",
    });
    if (error && error.message) {
      failureNotification(error.message);
      setLoading(false);
    } else {
      setIsLoading(true);
      let apiResponse = await postCallWithHeaders("admin/makePayment", {
        bookingId: selectedBooking,
        amount: paymentValue,
      });
      if (
        !apiResponse.status ||
        (error &&
          (error.type === "card_error" || error.type === "validation_error"))
      ) {
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
    setIsLoading(false);
    setLoading(false);
  }
  setIsLoading(false);
  setLoading(false);
};
