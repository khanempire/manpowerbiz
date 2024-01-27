import {
    Grid,
    Title,
} from "@mantine/core";
// import React from "react";
// import { useDispatch } from "react-redux";
import { Paper, createStyles, Image, Accordion, Col, Container } from "@mantine/core";
// import image from "./image.svg";

const FrequentlyAskedQuestions = () => {
    // const [checked, setChecked] = React.useState(false);
    // const dispatch = useDispatch();
    // const setDarkMode = () => {
    //     dispatch(changeDarkMode({ darkMode: true }));
    //     localStorage.setItem("settings", JSON.stringify({ darkMode: true }));
    // };
    // const setLightMode = () => {
    //     dispatch(changeDarkMode({ darkMode: false }));
    //     localStorage.setItem("settings", JSON.stringify({ darkMode: false }));
    // };
    // const settings = useSelector((state) => state.settings.value);
    // CURRENT LOCATION
    // setCurrentLocation("Settings");
    const useStyles = createStyles((theme) => ({
        wrapper: {
            paddingTop: theme.spacing.xl * 2,
            paddingBottom: theme.spacing.xl * 2,
        },

        title: {
            marginBottom: theme.spacing.md,
            paddingLeft: theme.spacing.md,
            color: theme.colorScheme === "dark" ? theme.white : theme.black,
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        },

        item: {
            fontSize: theme.fontSizes.sm,
            color:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[1]
                    : theme.colors.gray[7],
        },
    }));

    const placeholder =
        "It can’t help but hear a pin drop from over half a mile away, so it lives deep in the mountains where there aren’t many people or Pokémon.";
    const { classes } = useStyles();
    return (
        // <Grid p="md">
        //   <Grid.Col lg={6}>
        //     <Group position="apart">
        //       <div>
        //         <Title order={3}>Light Mode/Dark Mode</Title>
        //         <Text>Change the Color Scheme of your app!</Text>
        //       </div>

        //       <Center>
        //         <Switch
        //           size="lg"
        //           onLabel="ON"
        //           offLabel="OFF"
        //           checked={settings.darkMode}
        //           onChange={(event) => {
        //             {
        //               // event.currentTarget.checked
        //               //   ? setApptheme("dark")
        //               //   : setApptheme("light");
        //               event.currentTarget.checked ? setDarkMode() : setLightMode();
        //             }

        //             // setChecked(event.currentTarget.checked);
        //           }}
        //         />
        //       </Center>
        //     </Group>
        //   </Grid.Col>
        //   <Grid.Col lg={6}>
        <Paper className={classes.wrapper}>
            <Container size="xl">
                <Grid id="faq-grid" gutter={50}>
                    <Col span={12} md={6}>
                        <Image
                            src="https://img.freepik.com/free-vector/faqs-concept-illustration_114360-5245.jpg?w=2000"
                            alt="Frequently Asked Questions"
                        />
                    </Col>
                    <Col span={12} md={6}>
                        <Title order={2} align="left" className={classes.title}>
                            Frequently Asked Questions
                        </Title>

                        <Accordion
                            chevronPosition="right"
                            defaultValue="reset-password"
                            variant="separated"
                        >
                            <Accordion.Item className={classes.item} value="reset-password">
                                <Accordion.Control>
                                    How can I reset my password?
                                </Accordion.Control>
                                <Accordion.Panel>{placeholder}</Accordion.Panel>
                            </Accordion.Item>

                            <Accordion.Item className={classes.item} value="another-account">
                                <Accordion.Control>
                                    Can I create more that one account?
                                </Accordion.Control>
                                <Accordion.Panel>{placeholder}</Accordion.Panel>
                            </Accordion.Item>

                            <Accordion.Item className={classes.item} value="newsletter">
                                <Accordion.Control>
                                    How can I subscribe to monthly newsletter?
                                </Accordion.Control>
                                <Accordion.Panel>{placeholder}</Accordion.Panel>
                            </Accordion.Item>

                            <Accordion.Item className={classes.item} value="credit-card">
                                <Accordion.Control>
                                    Do you store credit card information securely?
                                </Accordion.Control>
                                <Accordion.Panel>{placeholder}</Accordion.Panel>
                            </Accordion.Item>

                            <Accordion.Item className={classes.item} value="payment">
                                <Accordion.Control>
                                    What payment systems to you work with?
                                </Accordion.Control>
                                <Accordion.Panel>{placeholder}</Accordion.Panel>
                            </Accordion.Item>
                        </Accordion>
                    </Col>
                </Grid>
            </Container>
        </Paper>
        //   </Grid.Col>
        // </Grid>
    );
};

export default FrequentlyAskedQuestions;
