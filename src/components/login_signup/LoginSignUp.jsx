import { useToggle } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Stack,
  Center,
  Grid,
  Title,
  BackgroundImage,
  LoadingOverlay,
} from "@mantine/core";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  failureNotification,
  successNotification,
} from "../../helpers/notificationHelper";
import { IconLogin, IconUserPlus } from "@tabler/icons-react";
import { postCallWithoutHeaders } from "../../helpers/apiCallHelpers";
import { backendURL } from "../../helpers/config";
// import { useEffect } from 'react';
// import { Link } from 'react-router-dom';

const backendURI = backendURL();
export default function LoginSignUp() {
  const registerNewUserFunction = async (values) => {
    setLoading(true);
    try {
      let res = await postCallWithoutHeaders("users/addUser", values);
      if (!res.error) {
        successNotification(res.msg);
        toggle();
      } else {
        failureNotification(res.msg);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const signUpForm = useForm({
    validateInputOnChange: true,
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      cpassword: "",
      contactNumber: "",
      whatsappNumber: "",
      userType: "customer",
      status: true,
    },

    validate: {
      email: (value) =>
        /^(?!.*\.\.)[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/.test(
          value.trim()
        )
          ? null
          : "Invalid Email",
      password: (value) =>
        /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).{8,}$/.test(value.trim())
          ? null
          : "Password Must Contain 8 Characters, 1 Uppercase, 1 Lowercase, 1 Number, 1 Special Character",
      cpassword: (value, values) =>
        value === values.password ? null : "Passwords do not match",
      fullName: (value) =>
        value.trim()?.length > 1 && /^[a-zA-Z\s]*$/.test(value.trim())
          ? null
          : "Alphabetic Name with 2 or more characters",
      contactNumber: (value) =>
        /^[1-9]\d{9}$/.test(value.trim()) ? null : "10 digit Phone Number",
      whatsappNumber: (value) =>
        /^[1-9]\d{9}$/.test(value.trim()) ? null : "10 digit WhatsApp Number",
    },
  });
  const loginApiCall = async (credentials) => {
    try {
      let apiResponse = await axios({
        method: "post",
        url: `${backendURI}/users/login`,
        data: credentials,
      });
      if (!apiResponse.data.error) {
        if (apiResponse.data.data.userType === "admin") {
          successNotification(apiResponse.data.msg);
          localStorage.setItem(
            "adminData",
            JSON.stringify(apiResponse.data.data)
          );
          localStorage.setItem("adminDataToken", apiResponse.data.token);
          navigate("/adminDashboard");
        } else {
          failureNotification(`${credentials.email} is not an admin`);
        }
      } else {
        failureNotification(apiResponse.data.msg);
      }
      // if (apiResponse) { }
    } catch (err) {
      console.log(err);
      failureNotification(err.message);
    } finally {
      setLoading(false);
    }
  };
  const loginFunction = (credentials) => {
    setLoading(true);
    loginApiCall(credentials);
  };
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) =>
        /^(?!.*\.\.)[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/.test(
          value.trim()
        )
          ? null
          : "Invalid email",
      password: (value) =>
        /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).{8,}$/.test(value.trim())
          ? null
          : "Password must contain 1 upper case letter, 1 special & 1 digit",
    },
  });

  const [type, toggle] = useToggle(["login", "register"]);
  return (
    <Center
      component={BackgroundImage}
      src="https://images.unsplash.com/photo-1613375920388-f1f70f341f8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
      h={"100vh"}
    >
      <Paper radius="md" p="2rem" withBorder pos={"relative"}>
        <LoadingOverlay
          visible={loading}
          loaderProps={{ size: "xl", color: "pink", variant: "bars" }}
          overlayOpacity={0.5}
          overlayColor="#c5c5c5"
        />
        <Stack miw={"30vw"} maw={"50vw"}>
          <Title order={2} align="center">
            Welcome to ManpowerBiz, {type}
          </Title>
          {type === "login" ? (
            <form
              onSubmit={form.onSubmit((values) => {
                loginFunction(values);
              })}
            >
              <Grid
                p={0}
                m={0}
                justify="space-around"
                miw={"25vh"}
                maw={"50vw"}
              >
                <Grid.Col p={0} m={0} xs={12} sm={12} lg={12}>
                  <TextInput
                    label="Email address"
                    placeholder="hello@gmail.com"
                    size="md"
                    {...form.getInputProps("email")}
                  />
                </Grid.Col>
                <Grid.Col p={0} m={0}>
                  {" "}
                  <PasswordInput
                    label="Password"
                    placeholder="Your password"
                    mt="md"
                    size="md"
                    {...form.getInputProps("password")}
                  />
                </Grid.Col>
                <Grid.Col p={0} m={0}>
                  {" "}
                  <Button
                    type="submit"
                    fullWidth
                    mt="xl"
                    size="md"
                    loading={loading}
                    // component={Link}
                    // to={"/"}
                    rightIcon={<IconLogin />}
                  >
                    Login
                  </Button>
                </Grid.Col>
              </Grid>
            </form>
          ) : (
            <form
              // onSubmit={form.onSubmit((values) => handleSubmit(values))}
              onSubmit={signUpForm.onSubmit((values) => {
                registerNewUserFunction(values);
                // !location.pathname.includes("edit") ? AddUserFunction(values) : EditUserFunction(values)
              })}
            >
              <Grid justify="space-around" miw={"30vh"} maw={"50vw"}>
                <Grid.Col md={12} lg={6} p="md">
                  <TextInput
                    // error={renderErrorMessage("email")}
                    size="md"
                    placeholder="Enter User's Email"
                    required
                    label="Email Address"
                    {...signUpForm.getInputProps("email")}
                  />
                </Grid.Col>
                <Grid.Col md={12} lg={6} p="md">
                  <TextInput
                    // error={renderErrorMessage("fullName")}
                    size="md"
                    required
                    label="Full Name"
                    placeholder="Enter User's Full Name"
                    {...signUpForm.getInputProps("fullName")}
                  />
                </Grid.Col>

                <Grid.Col md={12} lg={6} p="md">
                  <TextInput
                    // error={renderErrorMessage("contactNumber")}
                    size="md"
                    required
                    label="Contact Number"
                    placeholder="Enter 10 Digit Phone Number"
                    // disabled={disabled}
                    {...signUpForm.getInputProps("contactNumber")}
                  />
                </Grid.Col>
                <Grid.Col md={12} lg={6} p="md">
                  <TextInput
                    size="md"
                    required
                    label={
                      signUpForm.getInputProps("contactNumber").value
                        ?.length === 11 ? (
                        <>
                          <span>WhatsApp Number</span> (
                          <span
                            style={{
                              color: "gray",
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              signUpForm.setFieldValue(
                                "whatsappNumber",
                                signUpForm.getInputProps("contactNumber").value
                              )
                            }
                          >
                            Same As Phone?
                          </span>
                          )
                        </>
                      ) : (
                        "WhatsApp Number"
                      )
                    }
                    placeholder="Enter 10 Digit WhatsApp Number"
                    // disabled={disabled}
                    {...signUpForm.getInputProps("whatsappNumber")}
                  />
                </Grid.Col>
                <Grid.Col md={12} lg={6} p="md">
                  <PasswordInput
                    //error={renderErrorMessage("password")}
                    size="md"
                    placeholder="Enter Password"
                    label="Password"
                    // disabled={disabled}
                    value={password}
                    onInput={(e) => {
                      if (e.target.value !== signUpForm.values.cpassword) {
                        signUpForm.setFieldError(
                          "cpassword",
                          "Passwords Do Not Match"
                        );
                      } else {
                        signUpForm.setFieldError("cpassword", "");
                      }
                    }}
                    onChange={(e) => setPassword(e.target.value)}
                    {...signUpForm.getInputProps("password")}
                  />
                </Grid.Col>
                <Grid.Col md={12} lg={6} p="md">
                  <PasswordInput
                    // error={renderErrorMessage("cpassword")}
                    size="md"
                    label="Confirm Password"
                    // disabled={disabled}
                    placeholder="Re-Enter Password"
                    // value={cpassword}
                    errorProps={(v) => {
                      return v !== password;
                    }}
                    //onChange={(e) => setCPassword(e.target.value)}
                    {...signUpForm.getInputProps("cpassword")}
                  />
                </Grid.Col>
              </Grid>

              <Button
                mt={"xl"}
                uppercase
                type="submit"
                size="md"
                fullWidth
                // disabled={disabled}
                // loading={loading}
                rightIcon={<IconUserPlus />}
              >
                {"Sign Up"}
              </Button>
            </form>
          )}

          <Group noWrap>
            <Text>
              {type === "login" ? "Don't " : "Already "}have an account?{" "}
            </Text>
            <Text
              style={{ cursor: "pointer" }}
              onClick={() => {
                toggle();
              }}
              color="blue"
            >
              Click here
            </Text>
          </Group>
        </Stack>
      </Paper>
    </Center>
  );
}
