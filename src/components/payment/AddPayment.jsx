/*eslint-disable*/
import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import {
  getCallWithHeaders,
  postCallWithHeaders,
} from "../../helpers/apiCallHelpers";
import {
  Button,
  Center,
  Grid,
  LoadingOverlay,
  Paper,
  Select,
  Stepper,
  Text,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import "./CheckoutForm.css";
import { ArrowLeft, ArrowRight } from "tabler-icons-react";
import { stripeHandlePayment } from "../../helpers/stripePaymentHelper";
import PaymentPolicy from "./PaymentPolicy";
import InvoiceViewCard from "../cards/InvoiceViewCard";
import { useNavigate } from "react-router-dom";
import { routes } from "../../helpers/routesHelper";
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  "pk_test_51LZZvfE15s0GgNMhr1G5APbmPXyGbm10KdljXh7FWBA9QvUtisLvRVN6SAswoq2M1D6v5f0hTi484tqZDs50P8Rq00pU0tq3QQ"
);

export default function App() {
  const navigate = useNavigate();

  const [paidBooking, setPaidBooking] = useState({});
  const [loading, setLoading] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const [bookings, setBookings] = useState([]);
  const [customers, setCustomers] = useState([]);

  const [customerBookings, setCustomerBookings] = useState([]);
  const [customerValue, setCustomerValue] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState("");
  const [serviceValue, setServiceValue] = useState("");
  const [packageValue, setPackageValue] = useState("");
  const [paymentDescription, setPaymentDescription] = useState("");
  const [paymentValue, setPaymentValue] = useState(0);
  //ERRORS

  const [customerError, setCustomerError] = useState("");
  const [bookingError, setBookingError] = useState("");
  const [serviceError, setServiceError] = useState("");
  const [packageError, setPackageError] = useState("");
  const [amountError, setAmountError] = useState("");
  //

  // External Stripe
  const [externalStripe, setExternalStripe] = useState(null);
  const [externalElements, setExternalElements] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [disabledStepper, setDisabledStepper] = useState(false);
  //
  const [active, setActive] = useState(0);
  const nextStep = () =>
    setActive((current) => (current < 4 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const getPaymentData = async () => {
    const [customers, bookings] = await Promise.all([
      getCallWithHeaders("admin/getAllUsers"),
      getCallWithHeaders("admin/getAllBookings"),
    ]);

    let customerArray = customers.filter((user) => {
      if (user.userType !== "admin") {
        return user;
      }
    });
    customerArray.map((customer) => {
      customer.label = customer.email;
      customer.value = customer._id;
    });

    let bookingsArray = bookings.map((booking) => ({
      ...booking,
      label: booking.bookingDate,
      value: booking._id,
    }));

    setCustomers(customerArray);
    setBookings(bookingsArray);

    setLoading(false);
  };

  useEffect(() => {
    getPaymentData();
    // Create PaymentIntent as soon as the page loads
  }, []);

  console.log("customer:", customers);
  console.log("bookings:", bookings);

  const checkCustomerBookings = (value) => {
    if (!value) {
      console.log("no customers");
      return;
    }

    setCustomerBookings([]);
    setServiceValue("");
    setPackageValue("");
    setPaymentValue(0);
    let checkBooking = bookings.filter((booking) => {
      if (
        value === booking.bookingCustomer._id &&
        booking.bookingRemainingAmount > 0
      ) {
        return booking;
      } else {
        console.log("Booking not found!");
      }
    });
    if (checkBooking.length > 0) {
      console.log("Customer found");
    }
    setCustomerBookings(checkBooking);
  };

  const checkPackageAndService = (value) => {
    let checkPkgAndSvc = bookings.filter((booking) => {
      if (value === booking._id) {
        console.log("booking found");
        return booking;
      }
    });
    if (checkPkgAndSvc.length > 0) {
      setServiceValue(checkPkgAndSvc[0].bookingService.serviceTitle);
      setPackageValue(checkPkgAndSvc[0].bookingPackage.packageTitle);
      setPaymentValue(checkPkgAndSvc[0].bookingRemainingAmount);
    }
  };

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  const checkBeforePaymentIntent = async () => {
    setCustomerError("");
    setBookingError("");
    setServiceError("");
    setPackageError("");
    setAmountError();
    if (!customerValue.length > 0) {
      setCustomerError("A customer must be selected");
    } else if (!selectedBooking.length > 0) {
      setBookingError("A booking must be selected");
    } else if (!serviceValue.length > 0) {
      setServiceError("Service must be selected");
    } else if (!packageValue.length > 0) {
      setPackageError("Package must be selected");
    } else if (!paymentValue > 0) {
      setAmountError(
        "An amount greater than 0 must be present to make booking"
      );
    } else {
      setLoading(true);
      const apiResponse = await postCallWithHeaders(
        "admin/createPaymentIntent",
        {
          amount: paymentValue,
        }
      );
      if (apiResponse.error) {
        setLoading(false);
      } else {
        setLoading(false);
        setClientSecret(apiResponse.data);
        nextStep();
      }
      // nextStep();
    }
  };

  return (
    <Paper
      pos={"relative"}
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <LoadingOverlay
        visible={loading}
        loaderProps={{ size: "xl", color: "pink", variant: "bars" }}
        overlayOpacity={0.5}
        overlayColor="#c5c5c5"
      />
      <Center>
        <Paper
          py="xl"
          style={{
            width: "80%",
            height: "100%",
          }}
        >
          <Title order={2} align="center" py="xl">
            Add Payment
          </Title>
          <Stepper
            color="grape"
            active={active}
            onStepClick={setActive}
            breakpoint="sm"
            pt="xl"
          >
            <Stepper.Step
              disabled={disabledStepper}
              label="Payment Details"
              description="General Details"
              allowStepSelect={active > 0}
            >
              <Text weight="bold" size="xl" py="md">
                General Details
              </Text>

              <Grid>
                <Grid.Col sm={12} lg={6}>
                  <Select
                    searchable
                    required
                    size="md"
                    label={"Select Customer"}
                    value={customerValue}
                    data={customers}
                    placeholder="Select Customer"
                    onChange={(event) => {
                      setCustomerValue(event);
                      checkCustomerBookings(event);
                    }}
                    error={customerError}
                  />
                </Grid.Col>
                <Grid.Col sm={12} lg={6}>
                  <Select
                    searchable
                    required
                    value={selectedBooking}
                    size="md"
                    placeholder="Select Booking"
                    label={"Select Booking"}
                    data={customerBookings}
                    onChange={(event) => {
                      setSelectedBooking(event);
                      checkPackageAndService(event);
                    }}
                    // value={customerValue}
                    // onChange={(event) => {
                    //   console.log("ChNGED")
                    //   checkCustomerBookings(event);
                    // }}
                    error={bookingError}
                  />
                </Grid.Col>

                <Grid.Col lg={6}>
                  <TextInput
                    placeholder="Select Booking"
                    readOnly
                    required
                    size="md"
                    label={"Booked Service"}
                    value={serviceValue}
                    // onChange={(event) => {
                    //   checkCustomerBookings(event);
                    error={serviceError}
                    // }}
                  />
                </Grid.Col>
                <Grid.Col lg={6}>
                  <TextInput
                    placeholder="Select Booking"
                    readOnly
                    required
                    size="md"
                    label={"Booked Package"}
                    value={packageValue}
                    error={packageError}
                  />
                </Grid.Col>
                <Grid.Col lg={12}>
                  <TextInput
                    required
                    error={amountError}
                    size="md"
                    readOnly
                    value={paymentValue}
                    label={"Payment Amount"}
                  />
                </Grid.Col>
                <Grid.Col lg={12}>
                  <Textarea
                    value={paymentDescription}
                    size="md"
                    label={"Payment Details"}
                    maxLength={200}
                    maxRows={3}
                    minRows={3}
                    onChange={(e) => {
                      setPaymentDescription(e.target.value);
                    }}
                  />
                </Grid.Col>
              </Grid>

              <Grid justify="flex-end" py="md">
                <Grid.Col xs={6} sm={6} md={6} lg={3} xl={3}>
                  <Button
                    fullWidth
                    leftIcon={<ArrowLeft />}
                    color="red"
                    size="md"
                    onClick={prevStep}

                    // disabled={disabled}
                  >
                    BACK
                  </Button>
                </Grid.Col>

                <Grid.Col xs={6} sm={6} md={6} lg={3} xl={3}>
                  <Button
                    fullWidth
                    rightIcon={<ArrowRight />}
                    size="md"
                    color="dark"
                    onClick={() => {
                      checkBeforePaymentIntent();
                    }}
                  >
                    NEXT
                  </Button>
                </Grid.Col>
              </Grid>
            </Stepper.Step>

            <Stepper.Step
              disabled={disabledStepper}
              label="Make Payment"
              description="Payment Details"
              allowStepSelect={active > 0}
            >
              <Text weight="bold" size="xl" py="md">
                Payment Details
              </Text>

              <Grid align="start">
                <Grid.Col sm={12} md={6} lg={6}>
                  <PaymentPolicy />
                </Grid.Col>
                <Grid.Col sm={12} md={6} lg={6}>
                  {clientSecret.length > 0 && (
                    <Elements options={options} stripe={stripePromise}>
                      <CheckoutForm
                        clientSecret={clientSecret}
                        paymentValue={paymentValue}
                        selectedBooking={selectedBooking}
                        setMessage={setMessage}
                        message={message}
                        setExternalElements={setExternalElements}
                        externalElements={externalElements}
                        externalStripe={externalStripe}
                        setExternalStripe={setExternalStripe}
                      />
                    </Elements>
                  )}
                </Grid.Col>
              </Grid>
              <Grid justify="flex-end" py="md">
                <Grid.Col xs={6} sm={6} md={6} lg={3} xl={3}>
                  <Button
                    fullWidth
                    leftIcon={<ArrowLeft />}
                    color="red"
                    size="md"
                    onClick={prevStep}

                    // disabled={disabled}
                  >
                    BACK
                  </Button>
                </Grid.Col>

                <Grid.Col xs={6} sm={6} md={6} lg={3} xl={3}>
                  <Button
                    fullWidth
                    rightIcon={<ArrowRight />}
                    size="md"
                    color="dark"
                    onClick={() => {
                      stripeHandlePayment(
                        externalStripe,
                        externalElements,
                        setIsLoading,
                        selectedBooking,
                        paymentValue,
                        setMessage,
                        nextStep,
                        setDisabledStepper,
                        setPaidBooking,
                        setLoading
                      );
                    }}
                    uppercase
                  >
                    pay {paymentValue.toLocaleString()} now
                  </Button>
                </Grid.Col>
              </Grid>
            </Stepper.Step>
            <Stepper.Completed>
              <Title align="center" order={2}>
                Payment Completed
              </Title>

              <InvoiceViewCard data={paidBooking} />
              <Grid justify="flex-end" py="md">
                <Grid.Col xs={6} sm={6} md={6} lg={3} xl={3}>
                  <Button
                    fullWidth
                    rightIcon={<ArrowRight />}
                    size="md"
                    color="dark"
                    onClick={() => {
                      // nextStep();
                      navigate(routes.viewPayments);
                    }}
                  >
                    All Payments
                  </Button>
                </Grid.Col>
              </Grid>
            </Stepper.Completed>
          </Stepper>
        </Paper>
      </Center>
    </Paper>
  );
}
