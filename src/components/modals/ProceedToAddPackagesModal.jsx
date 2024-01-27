/* eslint-disable react/prop-types */
import { Button, Grid, Modal, Text, Title } from "@mantine/core"
import { IconEye, IconPackages } from "@tabler/icons-react"
import { useNavigate } from "react-router-dom"

const ProceedToAddPackagesModal = ({ opened, setOpened, title, data, path, cancelPath }) => {
    let navigate = useNavigate()
    return (
        <Modal title={<Title>{title}</Title>} opened={opened} onClose={() => {
            setOpened(false);
            navigate(`${cancelPath}`)
        }} withCloseButton size={"xl"}

        >
            <Text>{data}</Text>
            <Grid justify="center" py="md">
                <Grid.Col xs={6} sm={6} md={6} lg={3} xl={3}>
                    <Button rightIcon={<IconEye />} onClick={() => { navigate(`${cancelPath}`) }}>View Services</Button>
                </Grid.Col>
                <Grid.Col xs={6} sm={6} md={6} lg={3} xl={3}>
                    <Button rightIcon={<IconPackages />} onClick={() => { navigate(`${path}`) }}>Add Packages</Button>
                </Grid.Col>
            </Grid>
        </Modal >
    )
}

export default ProceedToAddPackagesModal