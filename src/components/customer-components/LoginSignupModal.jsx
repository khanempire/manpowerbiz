/* eslint-disable react/prop-types */
import { Modal, Title } from "@mantine/core";
import CustomerLogin from "./CustomerLogin";

import { useState } from "react";
import CustomerSignup from "./CustomerSignup";

const LoginSignupModal = ({ opened, setOpened }) => {
  const [customerSwitch, setCustomerSwitch] = useState(true);
  return (
    <Modal
      title={<Title order={3}>{customerSwitch ? "Login" : "Sign Up"}</Title>}
      opened={opened}
      onClose={() => setOpened(false)}
      closeOnClickOutside={false}
    >
      {customerSwitch ? (
        <CustomerLogin
          setOpened={setOpened}
          setCustomerSwitch={setCustomerSwitch}
          customerSwitch={customerSwitch}
        />
      ) : (
        <CustomerSignup
          setOpened={setOpened}
          setCustomerSwitch={setCustomerSwitch}
          customerSwitch={customerSwitch}
        />
      )}
    </Modal>
  );
};

export default LoginSignupModal;
