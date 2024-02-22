import React, { useState, useEffect } from "react";

import { failureNotification, successNotification } from "../../helpers/notificationHelper";
import { useContext } from "react";
import { ShoppingCartContext } from "../../contexts/ShoppingCartContext";
import {UserProfileContext} from '../../contexts/userProfileContext';
import { postCallWithHeaders } from "../../helpers/apiCallHelpers";

const RazorpayCheckoutForm = ({ clientSecret, paymentValue, currency, setExternalElements, externalElements, externalStripe, setExternalStripe, dataToSend, nextStep, prevStep, invoiceData, setInvoiceData, setShowRazorpay }) => {
    //Razorpay payment  STUFF
    // const [succeeded, setSucceeded] = useState(false);
    // const [error, setError] = useState(null);
    // const [processing, setProcessing] = useState(false);
    // const [disabled, setDisabled] = useState(true);

    const { setShoppingCartItems } = useContext(ShoppingCartContext);
    const { loggedInUserDetails } = useContext(UserProfileContext);
    console.log("loggedInUserDetails",loggedInUserDetails);
    const __DEV__ = document.domain === "localhost";
    
    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    const createPaymentIntent = async () => {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }
        try {
            const options = {
                key:import.meta.env.VITE_RAZORPAY_KEYID,
                currency: currency,
                amount: paymentValue,
                order_id: clientSecret,
                name: "Payment",
                description: "Thank you for taking the service, Do visit again",
                handler: function (response) {
                    console.log("response from razorpay", response);
                    handleSubmit(response);
                },
                modal: {
                    "ondismiss": function(){
                        setShowRazorpay(false);
                     }
                },
                prefill: {
                    name: loggedInUserDetails?.fullName,
                    email: loggedInUserDetails?.email,
                    phone_number: loggedInUserDetails?.contactNumber,
                },
                theme: {
                    color: "#3399cc",
                },
            };
            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (error) {
            console.log("razorpay error", error);
            // console.log(error.response);
            failureNotification(error.message);
        }
    };

    useEffect(() => {
        createPaymentIntent();
        //eslint-disable-next-line
    }, []);

    // const handleChange = async (event) => {
    //   setDisabled(event.empty);
    //   setError(event.error ? event.error.message : "");
    // };

    const handleSubmit = async (e) => {

        try {

            // setProcessing(true);

            let apiResponse = await postCallWithHeaders("customer/customer-create-payment", dataToSend);
            console.log("api response of creatimg payment", apiResponse);

            if (apiResponse?.error) {
                failureNotification(apiResponse.msg);
            } else {
                successNotification("Payment successful!");
                nextStep();
                setInvoiceData(apiResponse?.data);
                setShoppingCartItems([]);
            }


            // This point will only be reached if there is an immediate error when
            // confirming the payment. Otherwise, your customer will be redirected to
            // your `return_url`. For some payment methods like iDEAL, your customer will
            // be redirected to an intermediate site first to authorize the payment, then
            // redirected to the `return_url`.

            // setProcessing(false);
            // setError(null);
            // setSucceeded(true);
        } catch {
            // setSucceeded(false);
            // setError("Payment is successful, but failed to create the order"); 
            failureNotification("Payment is successful, but failed to create the order");
        }
    };

    return (
        <></>
        // <div>
        //     {succeeded ? (
        //         <article>
        //             <h4>Thank you</h4>
        //             <h4>Your have successfully completed the payment</h4>
        //             <h4>Redirecting to home page shortly</h4>
        //         </article>
        //     ) : (
        //         <article>
        //             <h4>Hello</h4>
        //             <p>
        //                 Your total amount is {paymentValue}
        //             </p>
        //             <p>Master Card Number : 5267 3181 8797 5449</p>
        //             <p>Visa Card Number : 4111 1111 1111 1111</p>
        //             <p>success@razorpay and failure@razorpay</p>
        //         </article>
        //     )}
        //     {/* show any error  that happens when processing the payment*/}
        //     {error && (
        //         <div className="card-error" role="alert">
        //             {error}
        //         </div>
        //     )}
        // </div>
    );
};

const Razorpay = () => {
    return (

        <CheckoutForm />

    );
};

export default RazorpayCheckoutForm;
