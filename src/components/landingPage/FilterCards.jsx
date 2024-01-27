/*eslint-disable*/
import { createStyles, Card, Text, SimpleGrid, UnstyledButton, Anchor, Group, rem, Image, Loader, Title } from "@mantine/core";

import dry_cleaning from "../../assets/map_dry_cleaning.svg";
import electrician from "../../assets/map_electrician.svg";
import plumber from "../../assets/map_plumber.svg";
import gardening from "../../assets/gardening.svg";
import cleaner from "../../assets/cleaner.svg";
import { useMediaQuery } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { getCallWithOutHeaders } from "../../helpers/apiCallHelpers";
import { Link, useNavigate } from "react-router-dom";
import { customerRoutes } from "../../helpers/routesHelper";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
    width: "60vw",
    border: "2px solid #eaeaea",
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
  },

  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: theme.radius.md,
    height: rem(120),
    width: "auto",
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    transition: "box-shadow 150ms ease, transform 100ms ease",
    border: "1px solid #eaeaea",

    "&:hover": {
      boxShadow: theme.shadows.md,
      transform: "scale(1.05)",
    },
  },
}));

const FilterCards = () => {
  const { classes } = useStyles();
  const match1200 = useMediaQuery("(max-width: 1200px)");
  const [loading, setLoading] = useState(true);

  /*eslint-disable*/
  const [services, setServices] = useState([]);
  const getServiceCategories = async () => {
    const apiResponse = await getCallWithOutHeaders("customer/get-landing-page-services");
    setServices(apiResponse);
    setLoading(false);
  };

  useEffect(() => {
    getServiceCategories();
  }, []);

  const navigate = useNavigate();

  console.log(services, "services");

  const items = services?.map((item) => {
    return (
      <UnstyledButton
        key={item.SR}
        className={classes.item}
        p={"xl"}
        onClick={() => {
          navigate(`${customerRoutes.specificService}/${item._id}`);
        }}
      >
        <Image
          src={
            item?.image?.length > 0 && item?.image[0]
            // item.categoryTitle.toLowerCase() === "cleaning"
            //   ? dry_cleaning
            //   : item.categoryTitle.toLowerCase() === "home services"
            //   ? plumber
            //   : item.categoryTitle.toLowerCase() === "electricity"
            //   ? electrician
            //   : item.categoryTitle.toLowerCase() === "gardening"
            //   ? gardening
            //   : item.categoryTitle.toLowerCase() === "air cleaning"
            //   ? cleaner
            //   : null
          }
          alt={"ICON"}
          height={50}
          width={50}
        />
        <Text size="xs" mt={7}>
          {item.categoryTitle}
        </Text>
      </UnstyledButton>
    );
  });

  return (
    <>
      <Title my={"xl"} align="center">
        Some of our services
      </Title>
      {loading ? (
        <div
          style={{
            height: "50vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loader size="xl" />
        </div>
      ) : (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Card withBorder radius="md" className={classes.card} p={"xl"}>
            <Group position="apart">
              <Text className={classes.title}>Services</Text>
              <Anchor size="xs" color="black" fw={500} sx={{ lineHeight: 1 }} component={Link} to={customerRoutes.categories}>
                View all services
              </Anchor>
            </Group>
            <SimpleGrid
              cols={3}
              spacing="md"
              breakpoints={[
                // { maxWidth: "lg", cols: 2 },
                { maxWidth: "md", cols: 2 },
                { maxWidth: "sm", cols: 1 },
              ]}
              style={{
                marginTop: match1200 ? "2rem" : "3rem",
                marginBottom: match1200 ? "2rem" : "3rem",
              }}
            >
              {items}
            </SimpleGrid>
          </Card>
        </div>
      )}
    </>
  );
};

export default FilterCards;
