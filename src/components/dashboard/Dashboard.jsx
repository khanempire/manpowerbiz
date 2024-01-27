/*eslint-disable*/
import {
  createStyles,
  Group,
  Paper,
  SimpleGrid,
  Text,
  rem,
  Loader,
} from "@mantine/core";
import {
  IconUserPlus,
  IconDiscount2,
  IconReceipt2,
  IconCoin,
} from "@tabler/icons-react";
import { useEffect } from "react";
import { adminDashboardCall } from "../../helpers/apiCallHelpers";
import { useState } from "react";

const useStyles = createStyles((theme) => ({
  titles: {
    fontSize: "25px",
    margin: "20px 0px",
    padding: 0,
  },
  root: {
    height: "100%",
    width: "100%",
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
    title: "Total Payment",
    icon: "receipt",
    valueKey: "totalPaymentAmount",
    diff: 34,
    fill: "#8884d8",
  },
  {
    title: "Total Bookings",
    icon: "coin",
    valueKey: "totalBookingsAmount",
    diff: -13,
    fill: "#83a6ed",
  },
  {
    title: "Total Users",
    icon: "user",
    valueKey: "users",
    diff: 18,
    fill: "#8dd1e1",
  },
  {
    title: "Total Bookings",
    icon: "user",
    valueKey: "bookings",
    diff: -30,
    fill: "#82ca9d",
  },
  {
    title: "Total Packages",
    icon: "discount",
    valueKey: "packages",
    diff: 18,
    fill: "#82ca9d",
  },
];

export function Dashboard() {
  const { classes } = useStyles();

  const [loading, setLoading] = useState(true);
  const [usersData, setUsersData] = useState([]);

  const fetchUsersData = async () => {
    try {
      setLoading(true);
      const apiResponse = await adminDashboardCall("admin/get-admin-dashboard");
      setUsersData(apiResponse?.data);
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

  const stats = data.map((stat, idx) => {
    const Icon = icons[stat.icon];

    const isCurrencyValue = [
      "totalPaymentAmount",
      "totalBookingsAmount",
    ].includes(stat.valueKey);
    const formattedValue = isCurrencyValue
      ? `₹${usersData[stat.valueKey]?.toLocaleString()}`
      : usersData[stat.valueKey]?.toLocaleString();

    return (
      <Paper withBorder p={"md"} radius="md" key={idx}>
        <Group position="apart">
          <Text size="xs" color="dimmed" className={classes.title}>
            {stat.title}
          </Text>
          <Icon className={classes.icon} size="1.4rem" stroke={1.5} />
        </Group>

        <Group align="flex-end" spacing="xs" mt={25}>
          <Text className={classes.value}>{formattedValue}</Text>
        </Group>
      </Paper>
    );
  });

  return (
    <Paper p={"md"} className={classes.root}>
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
    </Paper>
  );
}
