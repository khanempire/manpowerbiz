/* eslint-disable react/prop-types */
import { Button, Grid, Modal, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import { Trash, TrashOff } from "tabler-icons-react";

const CancelScreenModal = ({ opened, setOpened, path }) => {
  return (
    <Modal
      styles={{
        close: {
          color: "black",
          backgroundColor: "#EAEAEA",
          borderRadius: "50%",
          "&:hover": {
            transition: "50ms",
            color: "white",
            backgroundColor: "red",
          },
        },
      }}
      opened={opened}
      transition="rotate-left"
      transitionduration={600}
      size={600}
      transitiontimingfunction="ease"
      onClose={() => setOpened(false)}
    >
      <Title align="center" order={3}>
        Are You Sure Yo Want To Cancel?
      </Title>
      <Grid align="center" justify="space-around" p="md">
        <Grid.Col align="center" xs={3} sm={3} md={4} lg={4}>
          <Button
            align="center"
            color="light"
            leftIcon={<TrashOff size={14} />}
            onClick={() => setOpened(false)}
          >
            {"No, Don't Cancel"}
          </Button>
        </Grid.Col>
        <Grid.Col align="center" xs={5} sm={4} md={4} lg={4}>
          <Button
            align="center"
            color="red"
            leftIcon={<Trash size={14} />}
            component={Link}
            to={path}
          >
            Yes, Cancel
          </Button>
        </Grid.Col>
      </Grid>
    </Modal>
  );
};

export default CancelScreenModal;
