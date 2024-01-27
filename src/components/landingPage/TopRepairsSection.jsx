import { Card, Image, Paper, Text, Title } from "@mantine/core";
import { useEffect } from "react";
import { getCallWithOutHeaders } from "../../helpers/apiCallHelpers";
import { useState } from "react";
import { Carousel } from "@mantine/carousel";
import { Link } from "react-router-dom";
import { customerRoutes } from "../../helpers/routesHelper";

const TopRepairsSection = () => {
  const [services, setServices] = useState([]);
  //   const [loading, setLoading] = useState(false);
  const getServiceCategories = async () => {
    const apiResponse = await getCallWithOutHeaders(
      "customer/get-landing-page-services"
    );
    setServices(apiResponse);
  };

  useEffect(() => {
    getServiceCategories();
  }, []);

  // console.log("services::", services);

  const categoryCards = services?.map((serviceCard, index) => {
    return (
      <Carousel.Slide key={index}>
        <Card
          p="lg"
          w={350}
          component={Link}
          to={`${customerRoutes.specificService}/${serviceCard._id}`}
        >
          <Card.Section>
            <Image
              radius={"md"}
              src={serviceCard?.image[0]}
              height={200}
              alt="No way!"
            />
          </Card.Section>

          <Text align="center" weight={500} size="lg" mt="md">
            {serviceCard?.categoryTitle}
          </Text>
        </Card>
      </Carousel.Slide>
    );
  });
  return (
    <Paper my={"xl"}>
      <Title my={"xl"} align="center">
        Repairs of all sorts, now at your doorstep!
      </Title>
      <Carousel
        height={275}
        slideGap={"xl"}
        slidesToScroll={3}
        slideSize={33.333333333333}
      >
        {categoryCards}
      </Carousel>
    </Paper>
  );
};

export default TopRepairsSection;
