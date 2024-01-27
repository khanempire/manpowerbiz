import { Avatar, Box, Card, Group, Paper, Stack, Text, Title } from "@mantine/core";
import { useEffect } from "react";
import { useState } from "react";
import { getCallWithOutHeaders } from "../../helpers/apiCallHelpers";
import { Carousel } from "@mantine/carousel";
import { IconThumbUp } from "@tabler/icons-react";

const CustomerTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  //   const [loading, setLoading] = useState(false);
  const getCustomerTestimonials = async () => {
    const apiResponse = await getCallWithOutHeaders("customer/get-landing-page-services");
    setTestimonials(apiResponse);
  };
  useEffect(() => {
    getCustomerTestimonials();
  }, []);
  const testimonialCards = testimonials?.map((serviceCard, index) => {
    return (
      <Carousel.Slide key={index}>
        <Card style={{ position: "relative" }} shadow="sm" p={"xl"} w={350}>
          <Avatar size={"lg"} radius={"xl"} src={"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"} />
          <Card.Section>
            <Group position="right"></Group>
            <Text>{"Description"}</Text>
          </Card.Section>
          <Card.Section>
            <Group position="apart">
              <Stack spacing={0}>
                <Text weight={"bold"}>{"Customer name"}</Text>
                <Text>{"Customer email"}</Text>
              </Stack>
              <Group spacing={3}>
                <IconThumbUp color="white" fill="blue" />
                <Text weight={"bold"} color="dimmed">
                  Verified
                </Text>
              </Group>
            </Group>
          </Card.Section>
        </Card>
      </Carousel.Slide>
    );
  });
  return (
    <Paper my={"xl"}>
      <Box my={"xl"}>
        <Title align="center">Don’t just take our word for it!</Title>
        <Title align="center" fw={"normal"} order={2}>
          See what our customers have to say
        </Title>
      </Box>
      <Carousel withControls withIndicators slideGap={"xl"} slidesToScroll={3} slideSize={33.333333333333}>
        {testimonialCards}
      </Carousel>
    </Paper>
  );
};

export default CustomerTestimonials;
