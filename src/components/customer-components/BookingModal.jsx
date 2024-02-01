/* eslint-disable */
import {
  Button,
  Card,
  Grid,
  Group,
  Modal,
  Select,
  SimpleGrid,
  Stepper,
  Text,
  TextInput,
  Textarea,
  Title,
  MultiSelect,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { ShoppingCartContext } from "../../contexts/ShoppingCartContext";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { ArrowLeft, ArrowRight, ChevronDown } from "tabler-icons-react";
import { DateInput } from "@mantine/dates";
import dayjs from "dayjs";
import CheckoutTable from "./CheckoutTable";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import {
  postCallWithHeaders,
  postCallWithoutHeaders,
} from "../../helpers/apiCallHelpers";
import {
  failureNotification,
  successNotification,
} from "../../helpers/notificationHelper";
import { Elements, CardElement } from "@stripe/react-stripe-js";
import { loadStripe } from "react-stripe-js";
import CheckoutForm from "../payment/CheckoutForm";
import card from "../../assets/card.jpg";
import cod from "../../assets/cod.jpg";
import { PaymentOptions } from "./PaymentOptions";
import InvoiceViewCard from "../cards/InvoiceViewCard";
import { UserProfileContext } from "../../contexts/userProfileContext";
import { CategoriesContext } from "../../contexts/categoriesContext";
import { v4 } from "uuid";
import { customerRoutes } from "../../helpers/routesHelper";
import { useNavigate } from "react-router-dom";
import CheckoutFormCustomer from "./CheckoutForm-Customer";
import { stripeHandlePaymentCustomer } from "../../helpers/stripePaymentHelperCustomer";
import { allCodesAppended, SelectItem } from "../services/AddServices";
import RazorpayCheckoutForm from "./RazorpayCheckoutForm";
const stripePromise = loadStripe(
  "pk_test_51LZZvfE15s0GgNMhr1G5APbmPXyGbm10KdljXh7FWBA9QvUtisLvRVN6SAswoq2M1D6v5f0hTi484tqZDs50P8Rq00pU0tq3QQ"
);
const BookingModal = ({ opened, setOpened }) => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("card");
  // STRIPE
  const [externalStripe, setExternalStripe] = useState(null);
  const [externalElements, setExternalElements] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [currency, setCurrency] = useState("INR");
  const [loading, setLoading] = useState(false);
  const [disabledStepper, setDisabledStepper] = useState(false);
  const [paidBooking, setPaidBooking] = useState({});
  const [invoiceData, setInvoiceData] = useState({});

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  const [step1FormValues, setStep1FormValues] = useState({});
  const [dataBeforeBooking, setDataBeforeBooking] = useState({});
  const { shoppingCartItems, totalAmountWithTaxes, setShoppingCartItems } =
    useContext(ShoppingCartContext);
  const { loggedInUserDetails } = useContext(UserProfileContext);
  const { categoriesData } = useContext(CategoriesContext);
  const [showRazorpay,setShowRazorpay] = useState(false);

  const step1Form = useForm({
    validateInputOnChange: true,
    initialValues: {
      bookingZip: "",
      bookingDate: "",
    },
    validate: {
      bookingZip: (value) => (value.trim().length > 0 ? null : "Select A ZIP"),
    },
  });
  const [active, setActive] = useState(0);
  const nextStep = () =>
    setActive((current) => (current < 5 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));
  const nextNextStep = () =>
    setActive((current) => (current < 5 ? current + 2 : current));
  const prevPrevStep = () =>
    setActive((current) => (current > 0 ? current - 2 : current));

  const step1FormHandleSubmit = (values) => {
    console.log(values);
    setStep1FormValues(values);
    nextStep();
  };

  const contactInformationForm = useForm({
    validateInputOnChange: true,
    initialValues: {
      bookingContactNumber: "",
      bookingEmailAddress: "",
      bookingDescription: "",
    },
    validate: {
      bookingEmailAddress: (value) =>
        /^(?!.*\.\.)[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/.test(
          value.trim()
        )
          ? null
          : "Invalid Email",
      bookingContactNumber: (value) =>
        /^[1-9]\d{9}$/.test(value) ? null : "10 digit Phone Number",
      bookingDescription: (value) => null,
    },
  });

  useEffect(() => {
    if (loggedInUserDetails) {
      try {
        contactInformationForm.setValues({
          bookingContactNumber: loggedInUserDetails?.contactNumber.toString(),
          bookingEmailAddress: loggedInUserDetails?.email,
        });
      } catch (e) {
        console.log("Failed to prefill values");
      }
    }
  }, [loggedInUserDetails]);

  const contactInformationFunction = async (values) => {
    try {
      const invoicePackages = shoppingCartItems.map((pkg) => ({
        package: pkg,
        bookingDate: step1FormValues.bookingDate.toLocaleString(),
        quantity: pkg.quantity,
      }));
      let bookingData = {
        ...step1FormValues,
        ...values,
        ...{ bookingPackage: invoicePackages },
        ...{ bookingCustomer: loggedInUserDetails },
      };

      (bookingData.bookingDate = step1FormValues.bookingDate.toISOString()),
        (bookingData.bookingId =
          "kolkata" +
          "_" +
          step1FormValues.bookingZip +
          "_" +
          loggedInUserDetails?.fullName[0] +
          "_" +
          new Date().toISOString().toLocaleString().split("T")[0] +
          "_" +
          v4().split("-")[0]);
      bookingData.bookingStatus = "IN PROGRESS";
      bookingData.bookingPaidAmount = 0;
      bookingData.bookingPrice = totalAmountWithTaxes.toFixed(2);
      bookingData.bookingCity = "kolkata";
      bookingData.bookingServices = shoppingCartItems
        .map((pkg) => pkg.packageService) // Get an array of packageService IDs
        .flat() // Flatten the array of arrays into a single array
        .filter((value, index, self) => self.indexOf(value) === index) // Filter out duplicate IDs
        .map((serviceId) => {
          console.log("SID", serviceId);
          return {
            _id: serviceId,
          };
          // return categoriesData.categoryServices.find(
          //   (category) => category._id === serviceId
          // );
        });

      setDataBeforeBooking(bookingData);

      const apiResponse = await postCallWithHeaders(
        "customer/customer-payment-intent",
        {
          amount: totalAmountWithTaxes.toFixed(0),
        }
      );
      if (apiResponse.error) {
        failureNotification(`${apiResponse.msg}`);
      } else {
        console.log("apiResponse", apiResponse)
        setClientSecret(apiResponse.data);
        setCurrency(apiResponse.fullIntent.currency)
        nextStep();
      }
    } catch (error) {
      failureNotification(`${error}`);
    }
  };

  const createBooking = async () => {
    console.log("This is the final booking data:  ", dataBeforeBooking);
    const apiResponse = await postCallWithoutHeaders(
      "customer/customer-create-payment",
      dataBeforeBooking
    );
    if (!apiResponse.error) {
      successNotification(`Booking successful`);
      setShoppingCartItems([]);
      nextStep();
    } else {
      failureNotification(`Booking unsuccessful`);
    }
  };
  const [dataToSend, setDataToSend] = useState({});

  useEffect(() => {
    setDataToSend({
      bookingCity: dataBeforeBooking?.bookingCity,
      bookingZip: dataBeforeBooking?.bookingZip,
      bookingDate: dataBeforeBooking?.bookingDate,
      bookingPackage: dataBeforeBooking?.bookingPackage,
      bookingCustomer: dataBeforeBooking?.bookingCustomer,
      bookingContactNumber: dataBeforeBooking?.bookingContactNumber,
      bookingDescription: dataBeforeBooking?.bookingDescription,
      bookingEmailAddress: dataBeforeBooking?.bookingEmailAddress,
      bookingId: dataBeforeBooking?.bookingId,
      bookingStatus: dataBeforeBooking?.bookingStatus,
      bookingPrice: dataBeforeBooking?.bookingPrice,
      bookingPaymentStatus: dataBeforeBooking?.bookingPaymentStatus,
      bookingPaidAmount: dataBeforeBooking?.bookingPaidAmount,
      bookingServices: dataBeforeBooking?.bookingServices,
    });
  }, [dataBeforeBooking]);

  return (
    <Modal
      size="auto"
      opened={opened}
      closeOnClickOutside={false}
      closeOnEscape={false}
      onClose={() => {
        setOpened(!opened);
      }}
      title="Booking"
    >
      <Title order={3} align="center">
        If payment method is card, once payment is done the information can not
        be changed!
      </Title>
      <Stepper
        size="xs"
        active={active}
        onStepClick={setActive}
        breakpoint="sm"
        p={"md"}
        m={"md"}
        allowNextStepsSelect={false}
        sx={{ overflow: "auto" }}
      >
        <Stepper.Step
          label="Selected Packages"
          description="Confirm your selections"
        >
          <form
            style={{ width: "100%" }}
            onSubmit={step1Form.onSubmit((values) => {
              step1FormHandleSubmit(values);
            })}
          >
            <Grid>
              <Grid.Col lg={12}>
                <Card withBorder>
                  <Card.Section>
                    <CheckoutTable hideCheckoutButton={true} />
                  </Card.Section>
                </Card>
              </Grid.Col>
              <Grid.Col lg={12}>
                <Select
                  mt={0}
                  withinPortal
                  searchable
                  required
                  size="sm"
                  label="Zip"
                  placeholder="Select Zip"
                  itemComponent={SelectItem}
                  data={allCodesAppended?.map((d) => ({ value: d, label: d }))}
                  rightSection={<ChevronDown size={14} />}
                  rightSectionWidth={40}
                  {...step1Form.getInputProps("bookingZip")}
                />

                <DateInput
                  mb={0}
                  size="sm"
                  required
                  label="Booking Date"
                  placeholder="Select Booking Date"
                  searchable
                  minDate={dayjs(new Date())
                    .startOf("month")
                    .add(new Date().getDate() - 1, "days")
                    .toDate()}
                  inputFormat="YYYY-MM-DD"
                  {...step1Form.getInputProps("bookingDate")}
                />
              </Grid.Col>
            </Grid>
            <Grid justify="flex-end">
              <Grid.Col span={6} xl={3} lg={4} sm={6} xs={6}>
                <Button
                  fullWidth
                  uppercase
                  onClick={() => {
                    prevStep();
                  }}
                  leftIcon={<IconArrowLeft />}
                >
                  Previous
                </Button>
              </Grid.Col>
              <Grid.Col span={6} xl={3} lg={4} sm={6} xs={6}>
                <Button
                  type="submit"
                  fullWidth
                  uppercase
                  onClick={() => { }}
                  rightIcon={<IconArrowRight />}
                >
                  Next
                </Button>
              </Grid.Col>
            </Grid>
          </form>
        </Stepper.Step>
        <Stepper.Step
          label="Contact information"
          description="Confirm your contact information"
        >
          <form
            onSubmit={contactInformationForm.onSubmit((values) =>
              contactInformationFunction(values)
            )}
            style={{ width: "100%" }}
          >
            <Group position="apart">
              <Text weight="bold" size="xl" py="md">
                Contact Information
              </Text>
              <Text weight="bold" color="red" size="xl" py="md">
                Total Cost Rs. {totalAmountWithTaxes.toLocaleString()}
              </Text>
            </Group>
            <Grid>
              <Grid.Col md={12} lg={6}>
                <TextInput
                  size="sm"
                  required
                  label="Contact Number"
                  placeholder="Enter 10 Digit Phone Number"
                  {...contactInformationForm.getInputProps(
                    "bookingContactNumber"
                  )}
                />
              </Grid.Col>
              <Grid.Col md={12} lg={6}>
                <TextInput
                  size="sm"
                  placeholder="Enter User's Email"
                  required
                  label="Email Address"
                  {...contactInformationForm.getInputProps(
                    "bookingEmailAddress"
                  )}
                />
              </Grid.Col>
              <Grid.Col md={12} lg={12} py="md">
                <Textarea
                  minRows={5}
                  size="sm"
                  placeholder="Describe Your Event"
                  // disabled={disabled}
                  label="Booking Description"
                  {...contactInformationForm.getInputProps(
                    "bookingDescription"
                  )}
                />
              </Grid.Col>
            </Grid>
            <Grid justify="flex-end">
              <Grid.Col span={6} sm={6} xs={12} md={5} lg={4} xl={3} p="md">
                <Button
                  size="sm"
                  fullWidth
                  variant="filled"
                  // disabled={loading}
                  leftIcon={<ArrowLeft />}
                  onClick={prevStep}
                  uppercase
                >
                  BACK
                </Button>
              </Grid.Col>
              <Grid.Col span={6} sm={6} xs={12} md={5} lg={4} xl={3} p="md">
                <Button
                  size="sm"
                  fullWidth
                  variant="filled"
                  type="submit"
                  // disabled={disabled}
                  // loading={loading}
                  rightIcon={<ArrowRight />}
                  uppercase
                >
                  Next
                </Button>
              </Grid.Col>
            </Grid>
          </form>
        </Stepper.Step>

        <Stepper.Step
          label="Payment Options"
          description="Choose a payment option"
        >
          <SimpleGrid breakpoints={[]} cols={1}>
            {/* <div>
              <PaymentOptions image={card} nextStep={nextStep} title={"CARD PAYMENT"} buttonTitle={"Credit Card"} setPaymentMethod={setPaymentMethod} setDataBeforeBooking={setDataBeforeBooking} nextNextStep={nextNextStep} />
            </div> */}
            <div>
              <PaymentOptions
                image={cod}
                nextStep={nextStep}
                buttonTitle={"Credit Card"}
                title={"Credit Card"}
                setPaymentMethod={setPaymentMethod}
                setDataBeforeBooking={setDataBeforeBooking}
                nextNextStep={nextNextStep}
              />
            </div>
          </SimpleGrid>
        </Stepper.Step>

        <Stepper.Step label="Payment" description="Pay for your booking">
          <p>Please pay for your booking</p>
          <Grid justify="flex-end">
            <Grid.Col span={6} sm={6} xs={12} md={5} lg={4} xl={3} p="md">
              <Button
                size="sm"
                fullWidth
                variant="filled"
                // disabled={loading}
                leftIcon={<ArrowLeft />}
                onClick={() => {
                  setShowRazorpay(false);
                  prevStep()
                  // paymentMethod === "card" ? prevStep() : prevPrevStep();
                }}
                uppercase
              >
                BACK
              </Button>
            </Grid.Col>
            <Grid.Col span={6} sm={6} xs={12} md={5} lg={4} xl={3} py="md">
              <Button
                size="sm"
                fullWidth
                variant="filled"
                // disabled={disabled}
                // loading={loading}
                rightIcon={<ArrowRight />}
                uppercase
                onClick={() => {
                  setShowRazorpay(true);
                  //paymentMethod === "card" ? prevStep() : createBooking();
                }}
              >
                {/* {paymentMethod === "card" ? "Proceed to Payment" : "Confirm"} */}
                Proceed to Payment
              </Button>
            </Grid.Col>
          </Grid>
          <Grid align="start">
            <Grid.Col sm={12} md={12} lg={12}>
              {clientSecret.length > 0 && showRazorpay && (
                // <Elements options={options} stripe={stripePromise}>
                //   <CheckoutFormCustomer
                //     clientSecret={clientSecret}
                //     paymentValue={totalAmountWithTaxes}
                //     setExternalElements={setExternalElements}
                //     externalElements={externalElements}
                //     externalStripe={externalStripe}
                //     setExternalStripe={setExternalStripe}
                //     dataToSend={dataToSend}
                //     nextStep={nextNextStep}
                //     prevStep={prevStep}
                //     invoiceData={invoiceData}
                //     setInvoiceData={setInvoiceData}
                //   />
                // </Elements>
                <RazorpayCheckoutForm
                  clientSecret={clientSecret}
                  paymentValue={totalAmountWithTaxes}
                  setExternalElements={setExternalElements}
                  externalElements={externalElements}
                  externalStripe={externalStripe}
                  setExternalStripe={setExternalStripe}
                  dataToSend={dataToSend}
                  nextStep={nextNextStep}
                  prevStep={prevStep}
                  invoiceData={invoiceData}
                  setInvoiceData={setInvoiceData}
                  currency={currency}
                  setShowRazorpay={setShowRazorpay}
                />
              )}
            </Grid.Col>
          </Grid>
        </Stepper.Step>

        <Stepper.Step
          label="Confirm Booking"
          description="Confirm your booking details"
        >
          {/* <InvoiceViewCard data={dataBeforeBooking} /> */}
          <p>Please confirm your booking</p>
          <Grid justify="flex-end">
            <Grid.Col span={6} sm={6} xs={12} md={5} lg={4} xl={3} p="md">
              <Button
                size="sm"
                fullWidth
                variant="filled"
                // disabled={loading}
                leftIcon={<ArrowLeft />}
                onClick={() => {
                  paymentMethod === "card" ? prevPrevStep() : prevPrevStep();
                }}
                uppercase
              >
                BACK
              </Button>
            </Grid.Col>
            <Grid.Col span={6} sm={6} xs={12} md={5} lg={4} xl={3} py="md">
              <Button
                size="sm"
                fullWidth
                variant="filled"
                // disabled={disabled}
                // loading={loading}
                rightIcon={<ArrowRight />}
                uppercase
                onClick={() => {
                  createBooking();
                  //paymentMethod === "card" ? prevStep() : createBooking();
                }}
              >
                {/* {paymentMethod === "card" ? "Proceed to Payment" : "Confirm"} */}
                Confirm
              </Button>
            </Grid.Col>
          </Grid>
        </Stepper.Step>
        <Stepper.Completed>
          <Grid>
            <Grid.Col>
              <Title fw="normal" order={3} my="md">
                Your booking was created{" "}
                <b style={{ color: "green" }}>successfully</b> and has been
                added to your dashboard!{" "}
              </Title>

              <Title fw="normal" order={3} my="md">
                Click on <b>Dashboard</b> to see your bookings
              </Title>
            </Grid.Col>
          </Grid>
          <Grid justify="flex-end">
            <Grid.Col span={6} sm={6} xs={12} md={5} lg={4} xl={3} p="md">
              <Button
                disabled
                size="sm"
                fullWidth
                variant="filled"
                // disabled={loading}
                leftIcon={<ArrowLeft />}
                onClick={() => {
                  prevStep();
                }}
                uppercase
              >
                BACK
              </Button>
            </Grid.Col>
            <Grid.Col span={6} sm={6} xs={12} md={5} lg={4} xl={3} py="md">
              <Button
                size="sm"
                fullWidth
                variant="filled"
                // disabled={disabled}
                // loading={loading}
                rightIcon={<ArrowRight />}
                uppercase
                onClick={() => {
                  navigate(customerRoutes.customerHome);
                }}
              >
                Dashboard
              </Button>
            </Grid.Col>
          </Grid>
        </Stepper.Completed>
      </Stepper>
    </Modal>
  );
};

export default BookingModal;
