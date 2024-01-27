import { Paper, Text, Title, createStyles, rem, Stack } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  card: {
    marginTop: "23px",
    height: rem(448),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  title: {
    fontFamily: `Greycliff CF ${theme.fontFamily}`,
    fontWeight: 900,
    color: theme.black,
    lineHeight: 1.2,
    fontSize: rem(32),
    marginTop: theme.spacing.xs,
  },

  category: {
    color: theme.black,
    opacity: 0.7,
    fontWeight: 700,
    textTransform: "uppercase",
  },
}));
const PaymentPolicy = () => {
  const { classes } = useStyles();
  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      sx={{
        backgroundImage: `url(https://images.unsplash.com/photo-1613243555988-441166d4d6fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80})`,
      }}
      className={classes.card}
    >
      <div>
        <Stack>
          <Text className={classes.category} size="xs">
            {"All payments are protected with stripe"}
          </Text>
          <Title order={1}>{"10% upfront"}</Title>
          <Title order={3}>{"Trust us to provide"}</Title>
          <Title order={3}>{"the best!"}</Title>
        </Stack>
      </div>
    </Paper>
  );
};

export default PaymentPolicy;
