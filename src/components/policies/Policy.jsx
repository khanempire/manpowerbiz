import {
    Paper,
    Button,
    Modal,
    Grid,
    Group,
    // LoadingOverlay,
} from "@mantine/core";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { showNotification } from "@mantine/notifications";

// import { RichTextEditor } from "@mantine/rte";
// import "./PolicyEditor.css";
import { Text, Title } from "@mantine/core";
import { useMantineTheme } from "@mantine/core";
// import axios from "axios";
import { RichTextEditor } from '@mantine/tiptap';
import { Edit, Plus, ThumbUp, X } from "tabler-icons-react";
// import Highlight from '@tiptap/extension-highlight';


const content =
    '<h2 style="text-align: center;">Welcome to Mantine rich text editor</h2><p><code>RichTextEditor</code> component focuses on usability and is designed to be as simple as possible to bring a familiar editing experience to regular users. <code>RichTextEditor</code> is based on <a href="https://tiptap.dev/" rel="noopener noreferrer" target="_blank">Tiptap.dev</a> and supports all of its features:</p><ul><li>General text formatting: <strong>bold</strong>, <em>italic</em>, <u>underline</u>, <s>strike-through</s> </li><li>Headings (h1-h6)</li><li>Sub and super scripts (<sup>&lt;sup /&gt;</sup> and <sub>&lt;sub /&gt;</sub> tags)</li><li>Ordered and bullet lists</li><li>Text align&nbsp;</li><li>And all <a href="https://tiptap.dev/extensions" target="_blank" rel="noopener noreferrer">other extensions</a></li></ul>';

//   const axios = require("axios");

const Policy = () => {
    
    const [value, onChange] = useState(`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tortor nisi, luctus eget nibh quis, faucibus auctor sapien. Mauris pretium erat turpis. Vivamus pellentesque viverra massa, id consectetur leo mattis sit amet. Proin ornare, ligula at pellentesque commodo, dui diam mollis neque, id condimentum nibh velit a massa. Donec fermentum, lorem a venenatis lacinia, sem nibh sodales justo, eget tempor eros mi non quam. Maecenas volutpat nunc lorem, in elementum ipsum fringilla et. Nam non velit id ante scelerisque pharetra. Sed eros nisl, vestibulum eu pulvinar nec, maximus pellentesque orci. Aenean ac risus hendrerit, malesuada nunc sed, convallis sapien. Etiam elementum sem magna, at rutrum ligula hendrerit ac. Quisque efficitur ante erat. Fusce tempus eget lacus et hendrerit. Pellentesque mattis dignissim odio et maximus. Duis rutrum, elit ut tincidunt auctor, libero nulla tristique libero, at suscipit libero mauris non dui. Aliquam pulvinar lacus velit, non elementum eros luctus a. Aenean lorem velit, tincidunt a purus at, consectetur volutpat nisl.

    In dignissim pellentesque pretium.Curabitur placerat vel tellus a maximus.Quisque in nisi velit.Praesent bibendum tortor ut leo luctus, in pretium felis volutpat.Sed tortor justo, eleifend sed arcu at, consectetur lobortis felis.Praesent tincidunt ipsum eget ipsum suscipit fringilla quis at purus.Nam tincidunt urna id eros blandit, id aliquam lectus vulputate.Ut feugiat mi ligula, vitae condimentum felis interdum ut.Donec tempor bibendum lectus, sed iaculis massa feugiat ut.Fusce ut ex vel nisi aliquam sagittis ut ut libero.
    
    Integer rhoncus leo eget sollicitudin fringilla.Sed ac purus vel turpis dignissim consectetur.Morbi gravida, est vel interdum vulputate, dolor orci scelerisque ex, id laoreet lectus turpis et enim.Nulla vestibulum dapibus ipsum nec cursus.Sed a egestas dolor.Morbi arcu lectus, efficitur nec pellentesque vel, cursus a orci.Nunc suscipit mauris ut odio maximus fermentum.Cras at risus sit amet eros lacinia fermentum.Vivamus et est quam.Vestibulum interdum nisi eget eros tristique iaculis.Proin blandit sagittis sapien finibus fermentum.Sed sed sem vel purus bibendum volutpat a eget risus.Nunc ac maximus felis, nec ultricies justo.Fusce non ligula diam.Maecenas fringilla pretium turpis, quis euismod dui aliquet sollicitudin.In sollicitudin, lectus at aliquet aliquam, metus massa interdum erat, at auctor ex enim eu libero.`);
    const [opened, setOpened] = useState(false);
    // const [refresh, setRefresh] = useState(true);
    const [change, setChange] = useState(true);
    // const [visible, setVisible] = useState(true);

    const theme = useMantineTheme();
    // const url1 = "https://a-wep.herokuapp.com/superAdmin/getPolicy";

    // React.useEffect(() => {
    //     //getting all venue owners

    //     if (refresh) {
    //         axios.get(url1).then((res) => {
    //             // console.log(res.data);
    //             // customer = (id, img, name, date, email, contact, status)
    //             if (res.data.status === "success") {
    //                 // console.log("res.data.data", res.data.data.policy);
    //                 //   setLoading(false);
    //                 if (res.data.data !== null) {
    //                     onChange(res.data.data.policy);
    //                 } else {
    //                     onChange("No Policy");
    //                 }
    //                 setRefresh(false);

    //                 setVisible(false);
    //             } else {
    //                 // alert("Error");
    //             }
    //         });
    //     }
    // }, [refresh]);
    let navigate = useNavigate();

    // const handleSubmit = async () => {
    //     setVisible(true);
    //     const body = {
    //         policy: value,
    //     };

    //     const headers = {
    //         "Content-Type": "application/json",
    //     };
    //     try {
    //         const response = await axios({
    //             method: "patch",
    //             url: "https://a-wep.herokuapp.com/superAdmin/makePolicy",
    //             data: body,
    //             headers: headers,
    //         });
    //         // setLoading(false);
    //         console.log(response.data);

    //         if (response.data.status === "error") {
    //             // setErrorMessages(response.data.error);
    //             showNotification({
    //                 color: "green",
    //                 title: `ERROR`,

    //                 message: `${response.data.message}`,
    //             });
    //             setVisible(false);
    //             console.log(response.data.error);
    //         } else {
    //             showNotification({
    //                 color: "green",
    //                 title: `Successfully`,

    //                 message: `POLICY ADDED SUCCESSFULLY!!`,
    //             });
    //             console.log("navigating");
    //             // setOpened(true);
    //             console.log("navigated");
    //             setChange(true);
    //             setVisible(false);
    //         }
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };
    // const editor = useEditor({
    //     extensions: [
    //         StarterKit,
    //         Underline,
    //         Link,
    //         Superscript,
    //         Subscript,
    //         // Highlight,
    //         TextAlign.configure({ types: ['heading', 'paragraph'] }),
    //     ],
    //     content,
    // });
    return (
        <Paper
            style={{
                width: "100%",
                height: "100%",
                position: "relative",
            }}
        >
            {/* <LoadingOverlay
                visible={visible}
                loaderProps={{ size: "xl", color: "pink", variant: "bars" }}
                overlayOpacity={0.5}
                overlayColor="#c5c5c5"
            /> */}
            <Button
                // loading={loading}
                rightIcon={<Edit color="green" />}
                variant="filled"
                color="dark"
                radius="lg"
                p="s"
                m="md"
                hidden={!change}
                size="sm"
                onClick={() => {
                    setChange(false);
                }}
            >
                UPDATE POLICY
            </Button>
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
                align="center"
                opened={opened}
                overlayColor={
                    theme.colorScheme === "dark"
                        ? theme.colors.dark[9]
                        : theme.colors.gray[2]
                }
                overlayOpacity={0.55}
                overlayBlur={3}
                // onClose={() => navigate("/customers")}
                size="lg"
            >
                <Title p="md" order={3}>
                    Congrats!!
                </Title>
                <Text p="md" align="center" size="xl">
                    Are You Sure You Want to Discard All Changes?
                </Text>
                <Button
                    m="md"
                    type="submit"
                    size="md"
                    variant="filled"
                    color="dark"
                    rightIcon={<ThumbUp />}
                    onClick={() => setOpened(false)}
                >
                    No, Keep Changes
                </Button>
                <Button
                    m="md"
                    type="submit"
                    size="md"
                    variant="filled"
                    color="red"
                    rightIcon={<ThumbUp />}
                    onClick={() => navigate("/")}
                >
                    Yes, Discard
                </Button>
            </Modal>
            {value && (
                <>
                    <RichTextEditor >
                        <RichTextEditor.Toolbar sticky stickyOffset={60}>
                            <RichTextEditor.ControlsGroup>
                                <RichTextEditor.Bold />
                                <RichTextEditor.Italic />
                                <RichTextEditor.Underline />
                                <RichTextEditor.Strikethrough />
                                <RichTextEditor.ClearFormatting />
                                <RichTextEditor.Highlight />
                                <RichTextEditor.Code />
                            </RichTextEditor.ControlsGroup>

                            <RichTextEditor.ControlsGroup>
                                <RichTextEditor.H1 />
                                <RichTextEditor.H2 />
                                <RichTextEditor.H3 />
                                <RichTextEditor.H4 />
                            </RichTextEditor.ControlsGroup>

                            <RichTextEditor.ControlsGroup>
                                <RichTextEditor.Blockquote />
                                <RichTextEditor.Hr />
                                <RichTextEditor.BulletList />
                                <RichTextEditor.OrderedList />
                                <RichTextEditor.Subscript />
                                <RichTextEditor.Superscript />
                            </RichTextEditor.ControlsGroup>

                            <RichTextEditor.ControlsGroup>
                                <RichTextEditor.Link />
                                <RichTextEditor.Unlink />
                            </RichTextEditor.ControlsGroup>

                            <RichTextEditor.ControlsGroup>
                                <RichTextEditor.AlignLeft />
                                <RichTextEditor.AlignCenter />
                                <RichTextEditor.AlignJustify />
                                <RichTextEditor.AlignRight />
                            </RichTextEditor.ControlsGroup>
                        </RichTextEditor.Toolbar>
                        <RichTextEditor.Content />
                    </RichTextEditor>
                    <Grid justify="flex-end">
                        <Grid.Col offset={6} lg={3}>
                            <Group mt="lg">
                                <Button
                                    fullWidth
                                    leftIcon={<X />}
                                    color="red"
                                    hidden={change}
                                    // onClick={() => {
                                    //   setCancelSubmit(true);
                                    // }}
                                    size="md"
                                >
                                    CANCEL
                                </Button>
                            </Group>
                        </Grid.Col>
                        <Grid.Col lg={3}>
                            <Group mt="lg">
                                <Button
                                    fullWidth
                                    // loading={loading}
                                    hidden={change}
                                    rightIcon={<Plus />}
                                    size="md"
                                    color="dark"
                                // onClick={handleSubmit}
                                >
                                    UPDATE POLICY
                                </Button>
                            </Group>
                        </Grid.Col>
                    </Grid>
                </>
            )}
        </Paper>
    );
};

export default Policy;
