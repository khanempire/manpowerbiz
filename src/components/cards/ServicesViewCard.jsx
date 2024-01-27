/* eslint-disable react/prop-types */
import { Carousel } from "@mantine/carousel";
import { Badge, Grid, Group, Image, Paper, Table, Text, Title } from "@mantine/core";
import { IconMap2, IconMapPin } from "@tabler/icons-react";

const ServicesViewCard = ({ data, setEmbla }) => {
  return (
    <Paper>
      <Carousel loop slideGap={"sm"} align={"start"} mx="auto" slidesToScroll={1} slideSize="100%" getEmblaApi={setEmbla}>
        {data?.serviceImages?.map((image, index) => {
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
            <Title order={3}>{data.serviceTitle}</Title>
            <Badge variant="filled" color={data.serviceStatus === true ? "green" : "red"}>
              {data.serviceStatus === true ? "Active" : "Inactive"}
            </Badge>
          </Group>
          <Group spacing={3} position="apart">
            <Group spacing={3}>
              <IconMap2 size={20} />
              <Text transform="capitalize">{data.serviceCity}</Text>
            </Group>
            <Text>
              <b>Created At:</b> {data.createdAt.split("T")[0]}
            </Text>
          </Group>
          <Group spacing={3} position="apart">
            <Group spacing={3}>
              <IconMapPin size={20} />
              {data?.serviceZipCode?.map((zip, index) => {
                return <Text key={index}>{zip}</Text>;
              })}
            </Group>
            <Text>
              <b>Updated At</b>: {data.updatedAt.split("T")[0]}
            </Text>
          </Group>
        </Grid.Col>
        <Grid.Col>
          <Text>{data.serviceDescription}</Text>
        </Grid.Col>
        <Table striped withBorder withColumnBorders>
          <thead>
            <tr>
              <th>Email</th>
              <th>Contact Number</th>
              <th>WhatsApp Number</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{data.serviceInfoEmail}</td>
              <td>{data.serviceContactPhone}</td>
              <td>{data.serviceWhatsAppPhone}</td>
            </tr>
          </tbody>
        </Table>
      </Grid>
    </Paper>
  );
};

export default ServicesViewCard;
