/*eslint-disable*/
import {
  createStyles,
  Group,
  Paper,
  SimpleGrid,
  Text,
  rem,
  Stack,
  Loader,
} from "@mantine/core";
import {
  IconUserPlus,
  IconDiscount2,
  IconReceipt2,
  IconCoin,
} from "@tabler/icons-react";
import CustomerDashboardChart from "./CustomerDashboardChart";
import { useEffect, useState } from "react";
import { customerDashboardCall } from "../../helpers/apiCallHelpers";

const useStyles = createStyles((theme) => ({
  root: {
    padding: `calc(${theme.spacing.xl} * 1.5)`,
  },

  value: {
    fontSize: rem(24),
    fontWeight: 700,
    lineHeight: 1,
  },

  diff: {
    lineHeight: 1,
    display: "flex",
    alignItems: "center",
  },

  icon: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[4],
  },

  title: {
    fontWeight: 700,
    textTransform: "uppercase",
  },
}));

const icons = {
  user: IconUserPlus,
  discount: IconDiscount2,
  receipt: IconReceipt2,
  coin: IconCoin,
};

const data = [
  {
    title: "Total Payment Amount",
    icon: "receipt",
    valueKey: "totalPaymentAmount",
  },
  {
    title: "Total Bookings Amount",
    icon: "coin",
    valueKey: "totalBookingsAmount",
  },
  {
    title: "Total Completed Bookings",
    icon: "discount",
    valueKey: "bookings",
  },
];

export function CustomerDashboard() {
  const { classes } = useStyles();

  const [loading, setLoading] = useState(true);
  const [customerData, setCustomerData] = useState([]);
  const userId = JSON.parse(localStorage.getItem("customerDetails"))?._id;

  const fetchUsersData = async () => {
    try {
      setLoading(true);
      const apiResponse = await customerDashboardCall(
        `customer/get-customer-dashboard`,
        userId
      );
      setCustomerData(apiResponse?.data);
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsersData();
  }, []);

  console.log("customerData", customerData);

  const stats = data.map((stat) => {
    const Icon = icons[stat.icon];
    return (
      <Paper withBorder p="md" radius="md" key={stat.title}>
        <Group position="apart">
          <Text size="xs" color="dimmed" className={classes.title}>
            {stat.title}
          </Text>
          <Icon className={classes.icon} size="1.4rem" stroke={1.5} />
        </Group>
        <Group align="flex-end" spacing="xs" mt={15}>
          <Text className={classes.value}>
            {stat.valueKey === "totalPaymentAmount" ||
            stat.valueKey === "totalBookingsAmount"
              ? `₹${customerData[0]?.[stat.valueKey]?.toLocaleString()}`
              : customerData[0]?.[stat.valueKey]?.toLocaleString()}
          </Text>
        </Group>
      </Paper>
    );
  });

  return (
    <div className={classes.root}>
      <Stack h={"100%"} w={"100%"} spacing={"xl"}>
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <Loader size={"xl"} />
          </div>
        ) : (
          <SimpleGrid
            cols={3}
            breakpoints={[
              { maxWidth: "md", cols: 2 },
              { maxWidth: "xs", cols: 1 },
            ]}
          >
            {stats}
          </SimpleGrid>
        )}
      </Stack>
    </div>
  );
}
