/* eslint-disable react/prop-types */
import { Carousel } from "@mantine/carousel";
import { Grid, Group, Image, Paper, Table, Text, Title, Badge } from "@mantine/core";
import { IconMap2, IconMapPin } from "@tabler/icons-react";

const PackageViewCard = ({ data }) => {
  return (
    <Paper>
      <Carousel loop slideGap={"sm"} align={"start"} mx="auto" slidesToScroll={1} slideSize="100%">
        {data?.packageImages?.map((image, index) => {
          return (
            <Carousel.Slide size="100%" key={index}>
              <Image fit="cover" height={500} src={image} />
            </Carousel.Slide>
          );
        })}
      </Carousel>
      <Grid>
        <Grid.Col>
          <Group position="apart">
            <Title order={3}>
              {data.packageTitle}({data.serviceTitle})
            </Title>
            <Badge variant="filled" color={data.packageStatus === true ? "green" : "red"}>
              {data.packageStatus === true ? "Active" : "Inactive"}
            </Badge>
          </Group>

          <Title order={3}></Title>

          <Group spacing={3} position="apart">
            <Text transform="capitalize">
              <b>price:</b> {data?.packagePrice?.toLocaleString()}
            </Text>
            <Text>
              <b>Created At:</b> {data.createdAt.split("T")[0]}
            </Text>
          </Group>
          <Group spacing={3} position="apart">
            <Group spacing={3}>
              <Text>
                <b>Total Bookings: </b>
                {data?.packageBookings?.length?.toLocaleString()}
              </Text>
            </Group>
            <Text>
              <b>Updated At</b>: {data.updatedAt.split("T")[0]}
            </Text>
          </Group>
        </Grid.Col>
        <Grid.Col>
          <Text>{data.packageDescription}</Text>
        </Grid.Col>
      </Grid>
    </Paper>
  );
};

export default PackageViewCard;
