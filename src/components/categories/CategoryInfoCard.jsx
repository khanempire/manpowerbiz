/*eslint-disable*/
import { AspectRatio, Button, Card, Image, Loader, Menu, SimpleGrid, Text, createStyles, rem } from "@mantine/core";
import { IconArrowsLeftRight, IconMessageCircle, IconPhoto, IconSearch, IconSettings, IconTrash } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { customerRoutes } from "../../helpers/routesHelper";

const useStyles = createStyles((theme) => ({
  card: {
    transition: "transform 150ms ease, box-shadow 150ms ease",
    border: "1px solid #ebebeb",

    "&:hover": {
      transform: "scale(1.01)",
      boxShadow: theme.shadows.md,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 600,
  },
}));

const CategoryInfoCard = ({ categories, loading }) => {
  const { classes } = useStyles();
  const navigate = useNavigate();

  const cards = categories?.map((category) => (
    <Card
      key={category._id}
      p="md"
      radius="md"
      component="a"
      href="#"
      className={classes.card}
      onClick={() => {
        navigate(`${customerRoutes.specificService}/${category._id}`);
      }}
    >
      <AspectRatio ratio={1920 / 1080}>
        <Image src={category.image} />
      </AspectRatio>
      <Text className={classes.title} mt={"xs"} size={"lg"} mb={"xs"}>
        {category.categoryTitle}
      </Text>

      <Menu
        shadow="md"
        transitionProps={{
          duration: 300,
          timingFunction: "ease",
          delay: 0,
        }}
        position="right-end"
        withArrow
        trigger="hover"
        openDelay={100}
        closeDelay={400}
      >
        <Menu.Target>
          <Button>Services</Button>
        </Menu.Target>
        <Menu.Dropdown>
          {category.categoryServices.map((service) => (
            <Menu.Item key={service._id}>{service.serviceTitle}</Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
    </Card>
  ));

  return (
    <>
      {loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <Loader size={"xl"} />
        </div>
      )}
      {!loading && cards.length === 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
            width: "100%",
          }}
        >
          No Services found
        </div>
      )}
      <SimpleGrid
        cols={3}
        breakpoints={[
          { maxWidth: "md", cols: 2 },
          { maxWidth: "sm", cols: 1 },
        ]}
      >
        {cards}
      </SimpleGrid>
    </>
  );
};
export default CategoryInfoCard;
