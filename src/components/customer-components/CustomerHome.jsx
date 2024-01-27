import { useState } from "react";
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Paper,
  Grid,
} from "@mantine/core";
import CustomerSidebar from "./CustomerSidebar";
import { Outlet } from "react-router-dom";

export default function CustomerHome() {
  return (
    <Paper p={0} m={0}>
      <Grid p={0} m={0}>
        <Grid.Col p={0} m={0} lg={2}>
          <CustomerSidebar />
        </Grid.Col>
        <Grid.Col p={0} m={0} lg={10}>
          <Outlet />
        </Grid.Col>
      </Grid>
    </Paper>
  );
}
