/* eslint-disable react/prop-types */
import { Image, Modal, Title } from "@mantine/core";
import { Document, Page } from "react-pdf";
import { useState, useEffect } from "react";

const ViewUploadedFileModal = ({ opened, setOpened, dataType, data }) => {
    const [objectUrl, setObjectUrl] = useState(null);

    useEffect(() => {
        if (data) {
            try {
                const url = URL.createObjectURL(data);
                setObjectUrl(url);
            } catch (error) {
                console.error("Failed to create object URL:", error);
            }
        }
    }, [data]);

    const handleClose = () => {
        if (objectUrl) {
            URL.revokeObjectURL(objectUrl);
        }
        setOpened(false);
    };

    return (
        <Modal
            styles={{
                title: {
                    width: "100%",
                    textAlign: "center",
                },
            }}
            title={<Title order={2}>{"Media Modal"}</Title>}
            size="xl"
            opened={opened}
            onClose={handleClose}
            closeOnEscape
            withCloseButton
            closeOnClickOutside
        >
            <Modal.Body>
                {data?.type?.includes("image") && objectUrl && (
                    <Image fit="cover" src={objectUrl} />
                )}
                {data?.type?.includes("video") && objectUrl && (
                    <video style={{ objectFit: "cover" }} controls preload="metadata">
                        <source src={objectUrl} />
                    </video>
                )}
                {data?.type?.includes("pdf") && objectUrl && (
                    <Document
                        file={objectUrl}
                        style={{ overflow: "hidden", position: "relative" }}
                    >
                        <Page
                            pageNumber={1}
                            style={{ position: "static", overflow: "hidden" }}
                        />
                    </Document>
                )}
            </Modal.Body>
        </Modal>
    );
};

export default ViewUploadedFileModal;
