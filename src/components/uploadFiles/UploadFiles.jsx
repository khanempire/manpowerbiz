/* eslint-disable */
import { Button, Image, SimpleGrid, Text } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE, MIME_TYPES } from "@mantine/dropzone";
import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const UploadFiles = ({ fileUpload, multiple, loading, setFileUpload, mimeType, onFileRemove }) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (Array.isArray(fileUpload)) {
      const filteredArray = fileUpload.filter((file) => {
        if (file === "") {
          return;
        } else return file;
      });
      setFiles(filteredArray);
    }
  }, [fileUpload]);

  const handleRemove = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
    onFileRemove(updatedFiles); // Notify the parent component about the updated files
  };

  const previews =
    files?.length > 0 &&
    files?.map((file, index) => {
      let previewComponent;
      if ((file?.type?.includes("image") || mimeType == "image") && typeof file === "string") {
        previewComponent = (
          <div key={index}>
            <Image styles={{ imageWrapper: { border: "1px solid #eaeaea" } }} withPlaceholder p={0} m={0} height={200} fit="contain" src={file} />
            <Button compact fullWidth onClick={() => handleRemove(index)}>
              Remove
            </Button>
          </div>
        );
      } else if ((file?.type?.includes("video") || mimeType == "video") && typeof file === "string") {
        previewComponent = (
          <div key={index} style={{ width: 200 }}>
            <video src={file} controls height={200} width={200} />
            <Button compact fullWidth onClick={() => handleRemove(index)}>
              Remove
            </Button>
          </div>
        );
      } else if ((file?.type?.includes("pdf") || mimeType == "pdf") && typeof file === "string") {
        previewComponent = (
          <div key={index} style={{ border: "1px solid #eaeaea" }}>
            <div style={{ overflow: "hidden", height: 200 }}>
              <Document file={file} style={{ overflow: "hidden", position: "relative" }}>
                <Page pageNumber={1} width={200} style={{ position: "static", overflow: "hidden" }} />
              </Document>
            </div>
            <Button compact fullWidth onClick={() => handleRemove(index)}>
              Remove
            </Button>
          </div>
        );
      } else {
        if (file?.type?.includes("video") || mimeType == "video") {
          previewComponent = (
            <div key={index} style={{ width: 200 }}>
              <video src={URL.createObjectURL(file)} controls height={200} width={200} />
              <Button compact fullWidth onClick={() => handleRemove(index)}>
                Remove
              </Button>
            </div>
          );
        } else if (file?.type?.includes("image")) {
          previewComponent = (
            <div key={index}>
              <Image styles={{ imageWrapper: { border: "1px solid #eaeaea" } }} withPlaceholder p={0} m={0} height={200} fit="contain" src={URL.createObjectURL(file)} />
              <Button compact fullWidth onClick={() => handleRemove(index)}>
                Remove
              </Button>
            </div>
          );
        } else if (file?.type?.includes("pdf")) {
          previewComponent = (
            <div key={index} style={{ border: "1px solid #eaeaea" }}>
              <div style={{ overflow: "hidden", height: 200 }}>
                <Document file={URL.createObjectURL(file)} style={{ overflow: "hidden", position: "relative" }}>
                  <Page pageNumber={1} width={200} style={{ position: "static", overflow: "hidden" }} />
                </Document>
              </div>
              <Button compact fullWidth onClick={() => handleRemove(index)}>
                Remove
              </Button>
            </div>
          );
        }
      }

      return previewComponent;
    });

  return (
    <div>
      <Dropzone
        multiple={multiple}
        onDrop={(files) => {
          setFileUpload([...files]);
        }}
      >
        <Text align="center">Drop files here</Text>
      </Dropzone>

      <SimpleGrid
        cols={4}
        breakpoints={[
          { maxWidth: "sm", cols: 1 },
          { maxWidth: "md", cols: 2 },
          { maxWidth: "lg", cols: 3 },
        ]}
        mt={previews.length > 0 ? "xl" : 0}
      >
        {previews.length > 0 && previews}
      </SimpleGrid>
    </div>
  );
};

export default UploadFiles;
