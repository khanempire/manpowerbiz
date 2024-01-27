import { Grid, Paper, Title, Button } from "@mantine/core";
const WhatsAppButton = () => {
  const phoneNumber = "8420161635"; // Replace with the actual phone number

  const handleWhatsAppClick = () => {
    const whatsappUrl = `https://wa.me/${phoneNumber}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <Button
      onClick={handleWhatsAppClick}
      variant={"outline"}
      color="primary"
      sx={{
        marginTop: "1rem",
        padding: "0rem 3rem",
      }}
    >
      Join
    </Button>
  );
};
const SecurePaymentsSection = () => {
  return (
    <Paper>
      <Grid align="center" justify="center">
        {/* <Grid.Col lg={2}>
          <Image src={monitorMan} />
        </Grid.Col> */}
        <Grid.Col lg={8} align={"center"}>
          <Title>Join Our WhatsApp Community</Title>
          <WhatsAppButton />
        </Grid.Col>
      </Grid>
    </Paper>
  );
};

export default SecurePaymentsSection;
