import { Avatar, Box, Grid, Group, Paper, Stack, Text, Title } from "@mantine/core"
let chatData = [{ title: "Shahrukh", contact: "03368811125", userType: "admin", image: "" }, { title: "Shahrukh", contact: "03368811125", userType: "admin", image: "" }, { title: "Shahrukh", contact: "03368811125", userType: "admin", image: "" }, { title: "Shahrukh", contact: "03368811125", userType: "admin", image: "" }]
const ChatScreen = () => {
    return (
        <Paper radius={0} h={"100%"}>
            <Grid grow>
                <Grid.Col span={3} >
                    {chatData?.map((chat, index) => {
                        return <Box style={{ border: "1px solid #eaeaea", padding: "10px", margin: "10px", borderRadius: "10px", width: "fit-content" }} key={index}>
                            <Group noWrap position="apart">
                                <Avatar src={chat.image} size={"lg"} radius={"xl"} />
                                <Group noWrap>
                                    <Title order={4}>{chat.title}</Title>
                                </Group>
                                <Stack >
                                    <Text align="right">{chat.userType}</Text>
                                    <Text align="right"> {chat.contact}</Text>
                                </Stack>
                            </Group>
                        </Box>
                    })}
                </Grid.Col>
                <Grid.Col span={9}>

                </Grid.Col>
            </Grid>
        </Paper>
    )
}

export default ChatScreen