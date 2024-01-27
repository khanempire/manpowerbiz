/* eslint-disable react/prop-types */
import { Grid, Group, Image, Paper, Text, Badge } from "@mantine/core";

const ServiceCategoryViewCard = ({ data }) => {
  console.log("VALUE OF ADAATA", data);

  return (
    <Paper>
      <Image radius="md" height={400} src={data?.image[0]} alt="Random unsplash image" fit="cover" />

      <Grid p={0} m={0}>
        <Grid.Col lg={12}>
          <Group position="apart">
            <Text weight="bold" size="xl">
              {data.categoryTitle}
            </Text>
            <Badge variant="filled" color={data.status === true ? "green" : "red"}>
              {data.status === true ? "Active" : "Inactive"}
            </Badge>
          </Group>
        </Grid.Col>
        <Grid.Col>
          <Text size="lg" weight="bold">
            Description:
          </Text>
          <Text align="justify">{data.categoryDescription}</Text>
        </Grid.Col>
      </Grid>
    </Paper>
  );
};

export default ServiceCategoryViewCard;
