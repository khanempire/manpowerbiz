import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Grid, Paper, Title, Button, PasswordInput, TextInput, LoadingOverlay, Center, Select } from "@mantine/core";

import { X } from "tabler-icons-react";

import { useForm } from "@mantine/form";
import { editCallWithHeaders, getCallSpecificWithHeaders, postCallWithHeaders } from "../../helpers/apiCallHelpers";
import { failureNotification, successNotification } from "../../helpers/notificationHelper";
import CancelScreenModal from "../modals/CancelScreenModal";
import { IconEdit, IconPlus } from "@tabler/icons-react";
import { routes } from "../../helpers/routesHelper";
// import { IconX } from "@tabler/icons";

const AddUser = () => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(location.pathname.includes("edit") ? true : false);
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      cpassword: "",
      contactNumber: "",
      whatsappNumber: "",
      userType: "",
      status: "",
    },

    validate: {
      email: (value) =>
        /^(?!.*\.\.)[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/.test(value.trim())
          ? // /^\S+@[a-zA-Z]+\.[a-zA-Z]+$/.test(value.trim())
            null
          : "Invalid Email",
      password: location.pathname.includes("edit") ? null : (value) => (/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
      .test(value) ? null : "Must Contain 8 Characters with only character and number"),
      cpassword: location.pathname.includes("edit") ? null : (value, values) => (value === values.password ? null : "Passwords do not match"),
      fullName: (value) => (value.trim().length > 1 && /^[a-zA-Z\s]*$/.test(value.trim()) ? null : "Alphabetic Name with 2 or more characters"),
      contactNumber: (value) => (/^[1-9]\d{9}$/.test(value) ? null : "10 digit Phone Number"),
      whatsappNumber: (value) => (/^[1-9]\d{9}$/.test(value) ? null : "10 digit WhatsApp Number"),
    },
  });
  const getUserDetails = async () => {
    setLoading(true);

    const apiResponse = await getCallSpecificWithHeaders("admin/getAUser", params.id);
    setLoading(false);
    return apiResponse.data;
  };

  useEffect(() => {
    try {
      if (location.pathname.includes("edit")) {
        getUserDetails().then(form.setValues);
      } else {
        form.reset();
      }
    } catch (error) {
      failureNotification(error);
    }
  }, [location.pathname]);

  const AddUserFunction = async (values) => {
    setLoading(true);

    try {
      let res = await postCallWithHeaders("users/addUser", values);
      if (!res.error) {
        successNotification(res.msg);
        navigate(routes.viewUser);
      } else {
        failureNotification(res.msg);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const EditUserFunction = async (values) => {
    setLoading(true);
    try {
      let res = await editCallWithHeaders(`admin/updateUser`, params.id, values);
      if (!res.error) {
        successNotification(res.msg);
        navigate(routes.viewUser);
      } else {
        failureNotification(res.msg);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  // setCurrentLocation("Add User");
  // HOOKS
  /*eslint-disable*/
  const [errorMessages, setErrorMessages] = useState({});
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");

  const [disabled, setDisabled] = useState(false);

  const [opened, setOpened] = useState(false);
  const renderErrorMessage = (name) => {
    if (errorMessages[name]) {
      return errorMessages[name];
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
          <CancelScreenModal opened={opened} setOpened={setOpened} path={"/admindashboard/viewusers"} />
          <Title order={1} p="md" align="center">
            {location.pathname.includes("edit") ? "Edit User" : "Add User"}
          </Title>
          <form
            // onSubmit={form.onSubmit((values) => handleSubmit(values))}
            onSubmit={form.onSubmit((values) => {
              !location.pathname.includes("edit") ? AddUserFunction(values) : EditUserFunction(values);
            })}
          >
            <Grid justify="space-around">
              <Grid.Col md={12} lg={6} p="md">
                <Select
                  value={form.get}
                  label="Type"
                  required
                  size="md"
                  placeholder="Select User Type"
                  data={[
                    { value: "customer", label: "Customer" },
                    { value: "admin", label: "Admin" },
                  ]}
                  {...form.getInputProps("userType")}
                />
              </Grid.Col>
              <Grid.Col md={12} lg={6} p="md">
                <TextInput size="md" placeholder="Enter User's Email" required label="Email Address" {...form.getInputProps("email")} readOnly={location.pathname.includes("edit") ? true : false} />
              </Grid.Col>
              <Grid.Col md={12} lg={6} p="md">
                <TextInput size="md" required label="Full Name" placeholder="Enter User's Full Name" {...form.getInputProps("fullName")} />
              </Grid.Col>

              <Grid.Col md={12} lg={6} p="md">
                <Select
                  label="Status"
                  required
                  size="md"
                  placeholder="Select User Status"
                  // value={}
                  defaultValue={true}
                  data={[
                    { value: false, label: "Inactive" },
                    { value: true, label: "Active" },
                  ]}
                  {...form.getInputProps("status")}
                />
              </Grid.Col>
              <Grid.Col md={12} lg={6} p="md">
                <TextInput
                  size="md"
                  required
                  label="Contact Number"
                  placeholder="Enter 10 Digit Phone Number"
                  // disabled={disabled}
                  {...form.getInputProps("contactNumber")}
                />
              </Grid.Col>
              <Grid.Col md={12} lg={6} p="md">
                <TextInput
                  size="md"
                  required
                  label={
                    form.getInputProps("contactNumber").value.length === 11 ? (
                      <>
                        <span>WhatsApp Number</span> (
                        <span
                          style={{
                            color: "gray",
                            cursor: "pointer",
                          }}
                          onClick={() => form.setFieldValue("whatsappNumber", form.getInputProps("contactNumber").value)}
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
                  {...form.getInputProps("whatsappNumber")}
                />
              </Grid.Col>
              <Grid.Col md={12} lg={6} p="md">
                <PasswordInput
                  error={renderErrorMessage("password")}
                  size="md"
                  placeholder="Enter Password"
                  label="Password"
                  // disabled={disabled}
                  value={password}
                  onInput={(e) => {
                    if (e.target.value !== form.values.cpassword) {
                      form.setFieldError("cpassword", "Passwords Do Not Match");
                    } else {
                      form.setFieldError("cpassword", "");
                    }
                  }}
                  onChange={(e) => setPassword(e.target.value)}
                  {...form.getInputProps("password")}
                />
              </Grid.Col>
              <Grid.Col md={12} lg={6} p="md">
                <PasswordInput
                  // error={renderErrorMessage("cpassword")}
                  size="md"
                  label="Confirm Password"
                  // disabled={disabled}
                  placeholder="Re-Enter Password"
                  value={cpassword}
                  errorProps={(v) => {
                    return v !== password;
                  }}
                  onChange={(e) => setCPassword(e.target.value)}
                  {...form.getInputProps("cpassword")}
                />
              </Grid.Col>
            </Grid>

            <Grid justify="flex-end">
              <Grid.Col sm={6} xs={6} md={6} lg={3} p="md">
                <Button size="md" fullWidth variant="filled" color="red" disabled={loading} rightIcon={<X />} onClick={() => setOpened(true)}>
                  CANCEL
                </Button>
              </Grid.Col>
              <Grid.Col sm={6} xs={6} md={6} lg={3} p="md">
                <Button uppercase type="submit" size="md" fullWidth variant="filled" color="dark" disabled={disabled} loading={loading} rightIcon={location.pathname.includes("edit") ? <IconEdit /> : <IconPlus />}>
                  {location.pathname.includes("edit") ? "Edit" : "Add"}
                </Button>
              </Grid.Col>
            </Grid>
          </form>
        </Paper>
      </Center>
    </Paper>
  );
};

export default AddUser;
