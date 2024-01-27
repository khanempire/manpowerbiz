import { Carousel } from "@mantine/carousel";
import { Box, Card, Image, Paper, Title } from "@mantine/core";

import logo from "../../assets/Logo.png";
import logo1 from "../../assets/Logo-1.png";
import logo2 from "../../assets/Logo-2.png";
import logo3 from "../../assets/Logo-3.png";
import logo4 from "../../assets/Logo-4.png";
import logo5 from "../../assets/Logo-5.png";
import logo6 from "../../assets/Logo-6.png";
const data = [
  {
    companyName: "",
    logo: logo,
  },
  {
    companyName: "",
    logo: logo1,
  },
  {
    companyName: "",
    logo: logo2,
  },
  {
    companyName: "",
    logo: logo3,
  },
  {
    companyName: "",
    logo: logo4,
  },
  {
    companyName: "",
    logo: logo5,
  },
  {
    companyName: "",
    logo: logo6,
  },
];
const logoCards = data?.map((card, index) => {
  return (
    <Carousel.Slide key={index}>
      <Card>
        <Card.Section>
          <Image fit="contain" src={card.logo} width={50} height={50} />
        </Card.Section>
      </Card>
    </Carousel.Slide>
  );
});
const OurClientsSection = () => {
  return (
    <Paper my={"xl"}>
      <Box my={"xl"}>
        <Title align="center">Our Partners</Title>
        <Title align="center" fw={"normal"} order={2}>
          We have been working with some real big names!
        </Title>
      </Box>
      <Carousel
        align={"center"}
        withControls={false}
        withIndicators={false}
        draggable={false}
        slideGap={"xl"}
        slidesToScroll={7}
        slideSize={100}
      >
        {logoCards}
      </Carousel>
    </Paper>
  );
};

export default OurClientsSection;
