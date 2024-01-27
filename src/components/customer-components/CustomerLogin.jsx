/* eslint-disable react/prop-types */
import { Anchor, Button, Container, Group, Paper, PasswordInput, Text, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { postCallWithoutHeaders } from "../../helpers/apiCallHelpers";
import { failureNotification, successNotification } from "../../helpers/notificationHelper";
import { UserProfileContext } from "../../contexts/userProfileContext";
import { useContext } from "react";
import { useEffect } from "react";
import { useMediaQuery } from "@mantine/hooks";
const CustomerLogin = ({ setOpened, setCustomerSwitch, customerSwitch }) => {
  const match600 = useMediaQuery("(max-width: 600px)");
  /*eslint-disable*/
  const { loggedInUserDetails, setLoggedInUserDetails } = useContext(UserProfileContext);
  const loginForm = useForm({
    validateInputOnChange: true,
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      emailPhone: (value) =>
        // /^(?!.*\.\.)[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/.test(
        //   value.trim()
        // )
        //   ? null
        //   : "Invalid Email",
        null,
        password: (value) =>
        value.trim().length >= 8
          ? null
          : "Password must be 8 characters or longer",
      
    },
  });
  const handleLogin = async (values) => {
    const apiResponse = await postCallWithoutHeaders(`customer/login-customer`, values);
    if (apiResponse.error) {
      failureNotification(`Login failed due to : ${apiResponse.msg}`);
    } else {
      if (apiResponse.data.userType != "customer") {
        failureNotification(`This login is only for customers`);
      } else {
        successNotification(`Login successful!`);
        localStorage.setItem("customerDetails", JSON.stringify(apiResponse.data));
        setOpened(false);
        setLoggedInUserDetails(apiResponse.data);
      }
    }
  };
  useEffect(() => {
    loginForm.reset();
  }, [customerSwitch]);
  return (
    <Container size={420} my={30}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome back!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{" "}
        <Anchor
          size="sm"
          component="button"
          onClick={() => {
            setCustomerSwitch(!customerSwitch);
          }}
        >
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form
          onSubmit={loginForm.onSubmit((values) => {
            handleLogin(values);
          })}
        >
          <TextInput
            label="Email or Phone number"
            placeholder="email/phone"
            required
            {...loginForm.getInputProps("emailPhone")}
            style={{
              width: !match600 ? "100%" : "74%",
            }}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            {...loginForm.getInputProps("password")}
            style={{
              width: !match600 ? "100%" : "74%",
            }}
          />
          <Group mt="lg">
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button
            type="submit"
            style={{
              width: !match600 ? "100%" : "70%",
            }}
            mt="xl"
          >
            Sign In
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default CustomerLogin;
