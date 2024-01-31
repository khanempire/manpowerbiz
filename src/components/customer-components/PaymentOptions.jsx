/* eslint-disable react/prop-types */
import { createStyles, Paper, Title, rem, Button } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  card: {
    height: rem(440),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  title: {
    fontFamily: `Greycliff CF ${theme.fontFamily}`,
    fontWeight: 900,
    color: theme.white,
    lineHeight: 1.2,
    fontSize: rem(32),
    marginTop: theme.spacing.xs,
  },

  category: {
    color: theme.white,
    opacity: 0.7,
    fontWeight: 700,
    textTransform: "uppercase",
  },
}));

export const PaymentOptions = ({ image, title, buttonTitle, setPaymentMethod, nextStep, setDataBeforeBooking, nextNextStep }) => {
  const { classes } = useStyles();

  return (
    <div style={{display:'flex', justifyContent:'center', alignContent:'center', marginTop:'50px'}}>
      <Button style={{marginRight:'20px'}}
        onClick={() => {
          setPaymentMethod("cod");
          setDataBeforeBooking((prevData) => ({
            ...prevData,
            bookingPaymentStatus: "cod",
          }));
          nextStep();
          // if (buttonTitle == "Pay by Cash") {
          //   setPaymentMethod("cod");
          //   setDataBeforeBooking((prevData) => ({
          //     ...prevData,
          //     bookingPaymentStatus: "cod",
          //   }));
          //   nextStep();
          //   // nextNextStep();
          // }
          // if (buttonTitle == "Credit Card") {
          //   setPaymentMethod("card");
          //   setDataBeforeBooking((prevData) => ({
          //     ...prevData,
          //     bookingPaymentStatus: "full",
          //   }));
          //   nextNextStep();
          // }
        }}
      >
        {/* {buttonTitle} */}
        Pay by Cash
      </Button>
      <Button
        onClick={() => {
          setPaymentMethod("card");
          setDataBeforeBooking((prevData) => ({
            ...prevData,
            bookingPaymentStatus: "full",
          }));
          nextNextStep();
          // if (buttonTitle == "Pay by Cash") {
          //   setPaymentMethod("cod");
          //   setDataBeforeBooking((prevData) => ({
          //     ...prevData,
          //     bookingPaymentStatus: "cod",
          //   }));
          //   nextStep();
          //   // nextNextStep();
          // }
          // if (buttonTitle == "Credit Card") {
          //   setPaymentMethod("card");
          //   setDataBeforeBooking((prevData) => ({
          //     ...prevData,
          //     bookingPaymentStatus: "full",
          //   }));
          //   nextNextStep();
          // }
        }}
      >
        {/* {buttonTitle} */}
        Pay Online
      </Button>
    </div>
    // <Paper shadow="md" p="xl" radius="md" sx={{ backgroundImage: `url(${image})`, position: "relative" }} className={classes.card}>
    //   {/* <div
    //     style={{
    //       position: "absolute",
    //       height: "100%",
    //       width: "100%",
    //       backgroundColor: "black",
    //       top: 0,
    //       left: 0,
    //       opacity: 0.45,
    //       borderRadius: "10px",
    //     }}
    //   ></div>
    //   <div style={{ position: "initial", zIndex: 2 }}>
    //     <Title order={3} className={classes.title}>
    //       {title}
    //     </Title>
    //   </div> */}
    //   <Button
    //     onClick={() => {
    //       setPaymentMethod("cod");
    //       setDataBeforeBooking((prevData) => ({
    //         ...prevData,
    //         bookingPaymentStatus: "cod",
    //       }));
    //       nextStep();
    //       // if (buttonTitle == "Pay by Cash") {
    //       //   setPaymentMethod("cod");
    //       //   setDataBeforeBooking((prevData) => ({
    //       //     ...prevData,
    //       //     bookingPaymentStatus: "cod",
    //       //   }));
    //       //   nextStep();
    //       //   // nextNextStep();
    //       // }
    //       // if (buttonTitle == "Credit Card") {
    //       //   setPaymentMethod("card");
    //       //   setDataBeforeBooking((prevData) => ({
    //       //     ...prevData,
    //       //     bookingPaymentStatus: "full",
    //       //   }));
    //       //   nextNextStep();
    //       // }
    //     }}
    //   >
    //     {/* {buttonTitle} */}
    //     Pay by Cash
    //   </Button>
    //   <Button
    //     onClick={() => {
    //       setPaymentMethod("card");
    //       setDataBeforeBooking((prevData) => ({
    //         ...prevData,
    //         bookingPaymentStatus: "full",
    //       }));
    //       nextNextStep();
    //       // if (buttonTitle == "Pay by Cash") {
    //       //   setPaymentMethod("cod");
    //       //   setDataBeforeBooking((prevData) => ({
    //       //     ...prevData,
    //       //     bookingPaymentStatus: "cod",
    //       //   }));
    //       //   nextStep();
    //       //   // nextNextStep();
    //       // }
    //       // if (buttonTitle == "Credit Card") {
    //       //   setPaymentMethod("card");
    //       //   setDataBeforeBooking((prevData) => ({
    //       //     ...prevData,
    //       //     bookingPaymentStatus: "full",
    //       //   }));
    //       //   nextNextStep();
    //       // }
    //     }}
    //   >
    //     {/* {buttonTitle} */}
    //     Pay Online
    //   </Button>
    // </Paper>
  );
};
