/*eslint-disable*/
import { Accordion, Button, Center, Grid, LoadingOverlay, Paper, PasswordInput, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { editCallWithoutHeaders, editCallWithHeaders, getCallSpecificWithoutHeaders } from "../../helpers/apiCallHelpers";
import { IconEdit, IconUserEdit } from "@tabler/icons-react";
import { failureNotification, successNotification } from "../../helpers/notificationHelper";

const CustomerSettings = () => {
  const [loading, setLoading] = useState(true);
  const [loggedUser, setLoggedUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const user = JSON.parse(localStorage.getItem("customerDetails"));
  const admin = JSON.parse(localStorage.getItem("adminData"));

  const updateCustomerProfile = useForm({
    validateInputOnChange: true,
    initialValues: {
      contactNumber: "",
      whatsappNumber: "",
    },
    validate: {
      contactNumber: (value) => (/^[1-9]\d{9}$/.test(value) ? null : "10 digit Phone Number"),
      whatsappNumber: (value) => (/^[1-9]\d{9}$/.test(value) ? null : "10 digit WhatsApp Number"),
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
      currentPassword: (value) => (/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
      .test(value) || value === "" ? null : "Length must be 8 (Characters + Number)"),
      newPassword: (value, values) => (/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
      .test(value) || value === "" ? (values.currentPassword !== value ? null : "The current password and new password cant be the same") : "Must Contain 8 Characters, 1 Uppercase, 1 Lowercase, 1 Number, 1 Special Character"),
      confirmPassword: (value, values) => (value === values.newPassword ? null : "Passwords do not match"),
    },
  });

  const checkUser = async () => {
    // const user = await JSON.parse(localStorage.getItem("customerDetails"));
    // const admin = await JSON.parse(localStorage.getItem("adminData"));

    // if (user) {
    //   setLoggedUser(user);
    // } else if (admin) {
    //   setLoggedUser(admin);
    // } else {
    //   setLoggedUser(null);
    // }

    if (location.pathname.includes("admindashboard")) {
      if (admin) {
        setLoggedUser(admin);
        setCurrentUser("admin");
      }
    } else {
      if (Object.keys(user || {}).length > 0) {
        setLoggedUser(user);
        setCurrentUser("customer");
      }
    }
  };

  const fetchUserData = async () => {
    if (loggedUser && loggedUser?._id) {
      try {
        const apiResponse = await getCallSpecificWithoutHeaders("customer/get-me", loggedUser?._id);
        updateCustomerProfile.setValues(apiResponse.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    if (loggedUser) {
      fetchUserData();
    }
  }, [loggedUser]);

  const updateProfile = async (values) => {
    setLoading(true);
    try {
      if (currentUser === "customer") {
        const apiResponse = await editCallWithoutHeaders(`customer/edit-profile`, loggedUser?._id, {
          email: values.email,
          fullName: values.fullName,
          contactNumber: values.contactNumber,
          whatsappNumber: values.whatsappNumber,
        });
      } else {
        const apiResponse = await editCallWithHeaders(`admin/updateUser`, loggedUser?._id, {
          email: values.email,
          fullName: values.fullName,
          contactNumber: values.contactNumber,
          whatsappNumber: values.whatsappNumber,
        });
      }

      if (apiResponse.error) {
        failureNotification(`Profile couldn't be updated`);
      } else {
        successNotification(`Profile updated successfully`);
      }
    } catch (error) {
      failureNotification(`${error}`);
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async (values) => {
    setLoading(true);
    try {
      const apiResponse = await editCallWithoutHeaders(`customer/edit-password`, loggedUser?._id, {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });
      if (apiResponse.error) {
        failureNotification(apiResponse.msg);
      } else {
        successNotification(apiResponse.msg);
        updateCustomerPassword.reset();
      }
    } catch (error) {
      failureNotification(`${error}`);
    } finally {
      setLoading(false);
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
      <LoadingOverlay visible={loading} loaderProps={{ size: "xl", color: "pink", variant: "bars" }} overlayOpacity={0.5} overlayColor="#c5c5c5" />
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
              updateProfile(values);
            })}
          >
            <Grid justify="space-around">
              <Grid.Col md={12} lg={6} p="md">
                <TextInput size="md" readOnly placeholder="Enter User's Email" required label="Email Address" {...updateCustomerProfile.getInputProps("email")} />
              </Grid.Col>
              <Grid.Col md={12} lg={6} p="md">
                <TextInput size="md" required label="Full Name" placeholder="Enter User's Full Name" {...updateCustomerProfile.getInputProps("fullName")} />
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
                    updateCustomerProfile.getInputProps("contactNumber").value?.length === 11 ? (
                      <>
                        <span>WhatsApp Number</span> (
                        <span
                          style={{
                            color: "gray",
                            cursor: "pointer",
                          }}
                          onClick={() => updateCustomerProfile.setFieldValue("whatsappNumber", updateCustomerProfile.getInputProps("contactNumber").value)}
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
              updatePassword(values);
            })}
          >
            <Accordion p={"xs"} variant="contained" defaultValue="updatePassword">
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
                          if (event.target.value === updateCustomerPassword.values.newPassword) {
                            updateCustomerPassword.setFieldError("newPassword", "CURRENT PASSWORD AND NEW PASSWORD CANT BE THE SAME");
                          } else {
                            updateCustomerPassword.setFieldError("newPassword", "");
                          }
                        }}
                        {...updateCustomerPassword.getInputProps("currentPassword")}
                      />
                    </Grid.Col>
                    <Grid.Col md={12} lg={6} p="md">
                      <PasswordInput
                        size="md"
                        placeholder="New Password"
                        label="New Password"
                        required
                        onCopy={(e) => e.preventDefault()}
                        onInput={(event) => {
                          if (event.target.value !== updateCustomerPassword.values.confirmPassword) {
                            updateCustomerPassword.setFieldError("confirmPassword", "New password and confirm password don't match");
                          } else {
                            updateCustomerPassword.setFieldError("confirmPassword", "");
                          }
                        }}
                        {...updateCustomerPassword.getInputProps("newPassword")}
                      />
                    </Grid.Col>
                    <Grid.Col md={12} lg={6} p="md">
                      <PasswordInput size="md" placeholder="Confirm Password" label="Confirm Password" required {...updateCustomerPassword.getInputProps("confirmPassword")} />
                    </Grid.Col>
                  </Grid>
                  <Grid justify="flex-end">
                    <Grid.Col p={"md"} xl={3} lg={4} md={4} sm={6} xs={12}>
                      <Button
                        type="submit"
                        fullWidth
                        rightIcon={<IconEdit />}
                        disabled={updateCustomerPassword.values.confirmPassword && updateCustomerPassword.values.newPassword && updateCustomerPassword.values.currentPassword && updateCustomerPassword.values.currentPassword !== updateCustomerPassword.values.newPassword && /^(?=.*[a-zA-Z\d]).{8,}$/.test(updateCustomerPassword.values.currentPassword) && /^(?=.*[a-zA-Z\d]).{8,}$/.test(updateCustomerPassword.values.newPassword) && /^(?=.*[a-zA-Z\d]).{8,}$/.test(updateCustomerPassword.values.confirmPassword) && updateCustomerPassword.values.newPassword === updateCustomerPassword.values.confirmPassword ? false : true}
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
