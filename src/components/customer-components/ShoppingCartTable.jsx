import { Button, Group, NumberInput, Table, Text } from "@mantine/core";
import { IconCurrencyRupee } from "@tabler/icons-react";
import { handleQuantityChange } from "../../helpers/shoppingCartHelper";
import { ShoppingCartContext } from "../../contexts/ShoppingCartContext";
import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { customerRoutes } from "../../helpers/routesHelper";
const ShoppingCartTable = () => {
  const location = useLocation();
  const { shoppingCartItems, setShoppingCartItems, cartTotal } = useContext(ShoppingCartContext);

  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>
              <Text align="left">Item</Text>
            </th>
            <th align="right">
              <Text align="right">Quantity</Text>
            </th>
            <th align="right">
              <Group position="right" spacing={3} noWrap>
                <IconCurrencyRupee />
                <Text align="right">Price</Text>
              </Group>
            </th>
          </tr>
        </thead>
        <tbody>
          {shoppingCartItems?.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.packageTitle}</td>
                <td align="right">
                  <NumberInput
                    value={item.quantity}
                    min={0}
                    max={3}
                    onChange={(e) => {
                      handleQuantityChange(e, shoppingCartItems, item, setShoppingCartItems);
                    }}
                  />
                </td>
                <td align="right">
                  <Text>{item.price?.toLocaleString()}</Text>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Button
        display={location.pathname.includes("viewCart") ? "none" : "block"}
        styles={{
          leftIcon: {
            width: "50%",
          },
          rightIcon: {
            width: "50%",
            display: "flex",
            justifyContent: "flex-end",
          },
        }}
        leftIcon={
          <Group spacing={3}>
            <IconCurrencyRupee />
            <Text>{cartTotal}</Text>
            <Text>({shoppingCartItems?.length} items)</Text>
          </Group>
        }
        rightIcon={<Text align="right">View Cart</Text>}
        my={"xs"}
        fullWidth
        component={Link}
        to={customerRoutes.viewCart}
        sx={{
          "@media (max-width: 600px)": {
            position: "fixed",
            zIndex: 111,
            bottom: 0,
            left: 0,
            margin: 0,
            borderRadius: 0,
          },
        }}
      ></Button>
    </>
  );
};

export default ShoppingCartTable;
