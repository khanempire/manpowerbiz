/*eslint-disable*/
import {
  Accordion,
  Button,
  Center,
  Grid,
  LoadingOverlay,
  Paper,
  PasswordInput,
  Select,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { getCallSpecificWithoutHeaders } from "../../helpers/apiCallHelpers";
import { IconEdit, IconUserEdit } from "@tabler/icons-react";

const CustomerSettings = () => {
  const [errorMessages, setErrorMessages] = useState({});
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const renderErrorMessage = (name) => {
    if (errorMessages[name]) {
      return errorMessages[name];
    }
  };

  const [loading, setLoading] = useState(false);
  const updateCustomerProfile = useForm({
    validateInputOnChange: true,
    initialValues: {
      contactNumber: "",
      whatsappNumber: "",
    },
    validate: {
      contactNumber: (value) =>
        /^[1-9]\d{9}$/.test(value) ? null : "10 digit Phone Number",
      whatsappNumber: (value) =>
        /^[1-9]\d{9}$/.test(value) ? null : "10 digit WhatsApp Number",
    },
  });

  const updateCustomerPassword = useForm({
    validateInputOnChange: true,
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },

    validate: {
      currentPassword: (value, values) =>
      /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
.test(
          value
        ) || value === ""
          ? null
          : "Must Contain 8 Characters, 1 Uppercase, 1 Lowercase, 1 Number, 1 Special Character",
      newPassword: (value, values) =>
      /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
.test(
          value
        ) || value === ""
          ? values.currentPassword !== value
            ? null
            : "The current password and new password cant be the same"
          : "Must Contain 8 Characters, 1 Uppercase, 1 Lowercase, 1 Number, 1 Special Character",
      confirmPassword: (value, values) =>
        value === values.newPassword ? null : "Passwords do not match",
    },
  });

  const fetchUserData = async () => {
    const apiResponse = await getCallSpecificWithoutHeaders(
      "customer/get-me",
      JSON.parse(localStorage.getItem("customerDetails"))._id
    );
    updateCustomerProfile.setValues(apiResponse.data);
  };
  useEffect(() => {
    fetchUserData();
  }, []);

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
          style={{
            width: "80%",
            height: "100%",
          }}
        >
          <Title order={1} p="md" align="center">
            Edit Profile
          </Title>

          <form
            onSubmit={updateCustomerProfile.onSubmit((values) => {
              console.log("values", values);
            })}
          >
            <Grid justify="space-around">
              <Grid.Col md={12} lg={6} p="md">
                <TextInput
                  readOnly
                  size="md"
                  placeholder="Enter User's Email"
                  required
                  label="Email Address"
                  {...updateCustomerProfile.getInputProps("email")}
                />
              </Grid.Col>
              <Grid.Col md={12} lg={6} p="md">
                <TextInput
                  readOnly
                  size="md"
                  required
                  label="Full Name"
                  placeholder="Enter User's Full Name"
                  {...updateCustomerProfile.getInputProps("fullName")}
                />
              </Grid.Col>

              <Grid.Col md={12} lg={6} p="md">
                <TextInput
                  size="md"
                  required
                  label="Contact Number"
                  placeholder="Enter 10 Digit Phone Number"
                  // disabled={disabled}
                  {...updateCustomerProfile.getInputProps("contactNumber")}
                />
              </Grid.Col>
              <Grid.Col md={12} lg={6} p="md">
                <TextInput
                  size="md"
                  required
                  label={
                    updateCustomerProfile.getInputProps("contactNumber").value
                      ?.length === 11 ? (
                      <>
                        <span>WhatsApp Number</span> (
                        <span
                          style={{
                            color: "gray",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            updateCustomerProfile.setFieldValue(
                              "whatsappNumber",
                              updateCustomerProfile.getInputProps(
                                "contactNumber"
                              ).value
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
                  placeholder="Enter 11 Digit WhatsApp Number"
                  // disabled={disabled}
                  {...updateCustomerProfile.getInputProps("whatsappNumber")}
                />
              </Grid.Col>
            </Grid>
            <Grid justify="flex-end">
              <Grid.Col p={"md"} xl={3} lg={4} md={4} sm={6} xs={12}>
                <Button type="submit" fullWidth rightIcon={<IconUserEdit />}>
                  Edit Profile
                </Button>
              </Grid.Col>
            </Grid>
          </form>

          <form
            onSubmit={updateCustomerPassword.onSubmit((values) => {
              console.log(values);
            })}
          >
            <Accordion
              p={"xs"}
              variant="contained"
              defaultValue="updatePassword"
            >
              <Accordion.Item value="updatePassword">
                <Accordion.Control>
                  <Title order={3}>Change Password</Title>
                </Accordion.Control>
                <Accordion.Panel>
                  <Grid>
                    <Grid.Col p="md">
                      <PasswordInput
                        size="md"
                        placeholder="Current Password"
                        label="Current Password"
                        required
                        onInput={(event) => {
                          if (
                            event.target.value ===
                            updateCustomerPassword.values.newPassword
                          ) {
                            updateCustomerPassword.setFieldError(
                              "newPassword",
                              "CURRENT PASSWORD AND NEW PASSWORD CANT BE THE SAME"
                            );
                          } else {
                            updateCustomerPassword.setFieldError(
                              "newPassword",
                              ""
                            );
                          }
                        }}
                        {...updateCustomerPassword.getInputProps(
                          "currentPassword"
                        )}
                      />
                    </Grid.Col>
                    <Grid.Col md={12} lg={6} p="md">
                      <PasswordInput
                        size="md"
                        placeholder="New Password"
                        label="New Password"
                        required
                        onInput={(event) => {
                          if (
                            event.target.value !==
                            updateCustomerPassword.values.confirmPassword
                          ) {
                            updateCustomerPassword.setFieldError(
                              "confirmPassword",
                              "New password and confirm password don't match"
                            );
                          } else {
                            updateCustomerPassword.setFieldError(
                              "confirmPassword",
                              ""
                            );
                          }
                        }}
                        {...updateCustomerPassword.getInputProps("newPassword")}
                      />
                    </Grid.Col>
                    <Grid.Col md={12} lg={6} p="md">
                      <PasswordInput
                        size="md"
                        placeholder="Confirm Password"
                        label="Confirm Password"
                        required
                        {...updateCustomerPassword.getInputProps(
                          "confirmPassword"
                        )}
                      />
                    </Grid.Col>
                  </Grid>
                  <Grid justify="flex-end">
                    <Grid.Col p={"md"} xl={3} lg={4} md={4} sm={6} xs={12}>
                      <Button
                        type="submit"
                        fullWidth
                        rightIcon={<IconEdit />}
                        disabled={
                          updateCustomerPassword.values.confirmPassword &&
                          updateCustomerPassword.values.newPassword &&
                          updateCustomerPassword.values.currentPassword &&
                          updateCustomerPassword.values.currentPassword !==
                            updateCustomerPassword.values.newPassword &&
                            /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
.test(
                            updateCustomerPassword.values.currentPassword
                          ) &&
                          /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
.test(
                            updateCustomerPassword.values.newPassword
                          ) &&
                          /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
.test(
                            updateCustomerPassword.values.confirmPassword
                          ) &&
                          updateCustomerPassword.values.newPassword ===
                            updateCustomerPassword.values.confirmPassword
                            ? false
                            : true
                        }
                      >
                        Edit Password
                      </Button>
                    </Grid.Col>
                  </Grid>
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </form>
        </Paper>
      </Center>
    </Paper>
  );
};

export default CustomerSettings;
