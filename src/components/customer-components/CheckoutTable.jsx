import { Box, Button, Divider, Group, Table, Text } from "@mantine/core";
import { useContext } from "react";
import { ShoppingCartContext } from "../../contexts/ShoppingCartContext";
import { IconCurrencyRupee } from "@tabler/icons-react";
import { useState } from "react";
import LoginSignupModal from "./LoginSignupModal";
import BookingModal from "./BookingModal";

// eslint-disable-next-line react/prop-types
const CheckoutTable = ({ hideCheckoutButton }) => {
  const [bookingModal, setBookingModal] = useState(false);
  const [loginSignupModalOpened, setLoginSignupModalOpened] = useState(false);
  const { cartTotal, taxTotal, totalAmountWithTaxes, discount } = useContext(ShoppingCartContext);

  return (
    <Box>
      <BookingModal opened={bookingModal} setOpened={setBookingModal} />
      <LoginSignupModal opened={loginSignupModalOpened} setOpened={setLoginSignupModalOpened} />
      <Table>
        <thead>
          <tr>
            <th>
              <Group position="left">
                <Text>Shopping Cart</Text>
              </Group>
            </th>
            <th>
              <Group spacing={3} position="right">
                <IconCurrencyRupee />
                <Text>Amount</Text>
              </Group>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Items</td>
            <td align="right">{cartTotal?.toLocaleString()}</td>
          </tr>
          <tr>
            <td>Fees & Tax</td>
            <td align="right">{taxTotal?.toLocaleString()}</td>
          </tr>
          {discount && (
            <tr>
              <td>Discount</td>
              <td align="right">{discount}%</td>
            </tr>
          )}
        </tbody>
      </Table>
      <Divider my={"xs"} />
      <Table>
        <thead>
          <tr>
            <th>
              <Group position="left">
                <Text>Total</Text>
              </Group>
            </th>
            <th>
              <Group spacing={3} position="right">
                <IconCurrencyRupee />
                <Text>{totalAmountWithTaxes?.toLocaleString()}</Text>
              </Group>
            </th>
          </tr>
        </thead>
      </Table>
      <Button
        display={hideCheckoutButton ? "none" : "block"}
        my={"xs"}
        fullWidth
        onClick={() => {
          let customer = localStorage.getItem("customerDetails");
          if (!customer || customer == "{}") {
            setLoginSignupModalOpened(true);
            // setBookingModal(!bookingModal);
          } else {
            setBookingModal(!bookingModal);
          }
        }}
      >
        Check Out
      </Button>
    </Box>
  );
};

export default CheckoutTable;
