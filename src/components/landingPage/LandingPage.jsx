import { Container, Divider, Paper } from "@mantine/core";
import MainSearchArea from "./MainSearchArea";
import FilterCards from "./FilterCards";
import TopRepairsSection from "./TopRepairsSection";
import CustomerTestimonials from "./CustomerTestimonials";
import OurClientsSection from "./OurClientsSection";
import SecurePaymentsSection from "./SecurePaymentsSection";

const LandingPage = () => {
  return (
    <Paper radius={0} p={0} m={0}>
      <MainSearchArea />
      <Container size={"xl"} pos={"relative"}>
        <FilterCards />
        <Divider my={"5rem"} />
        <TopRepairsSection />
        {/* <Divider my={"5rem"} /> */}
        {/* <CustomerTestimonials /> */}
        <Divider my={"5rem"} />
        <OurClientsSection />
        <Divider my={"5rem"} />
        <SecurePaymentsSection />
      </Container>
    </Paper>
  );
};

export default LandingPage;
