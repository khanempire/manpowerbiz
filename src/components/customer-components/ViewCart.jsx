import { ActionIcon, Box, Card, Container, Divider, Grid, Group, Title } from "@mantine/core";
import ShoppingCartTable from "./ShoppingCartTable";
import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import CheckoutTable from "./CheckoutTable";

const ViewCart = () => {
  const navigate = useNavigate();
  return (
    <Container size={"xl"}>
      <Grid>
        <Grid.Col lg={12}>
          <Box my={"sm"}>
            <Group spacing={15}>
              <ActionIcon
                color="primary"
                onClick={() => {
                  navigate(-1);
                }}
              >
                <IconArrowLeft />
              </ActionIcon>
              <Title>Your Cart Summary</Title>
            </Group>
          </Box>
        </Grid.Col>
      </Grid>
      <Divider my={"sm"} />
      <Grid justify="space-between">
        <Grid.Col lg={7}>
          <ShoppingCartTable />
          <Divider />
        </Grid.Col>
        <Grid.Col lg={4}>
          <Card withBorder>
            <Title order={3}>Payment Breakdown</Title>
            <CheckoutTable />
          </Card>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default ViewCart;
