/* eslint-disable react/prop-types */
import { Modal } from "@mantine/core";
import { Document, Page } from "react-pdf";

const PreviewPDFComponent = ({ pdfLink, opened, setOpened, setPdfLink }) => {
  return (
    <Modal
      opened={opened}
      onClose={() => {
        setPdfLink("");
        setOpened(false);
      }}
      closeOnClickOutside
    >
      <Document file={pdfLink}>
        <Page pageNumber={1} />
      </Document>
    </Modal>
  );
};

export default PreviewPDFComponent;
