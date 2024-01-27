import { useEffect, useState } from "react";
import { Button, Center, Grid, Input, LoadingOverlay, Paper, ScrollArea, Text, Textarea, TextInput, Title, Select } from "@mantine/core";
import { X, ChevronDown } from "tabler-icons-react";
import { useForm } from "@mantine/form";
// import axios from "axios";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import CancelScreenModal from "../modals/CancelScreenModal";
import { editCallWithHeaders, getCallSpecificWithHeaders, postCallWithHeaders } from "../../helpers/apiCallHelpers";
import { failureNotification, successNotification } from "../../helpers/notificationHelper";
import { IconEdit, IconPlus } from "@tabler/icons-react";
import UploadFiles from "../uploadFiles/UploadFiles";
import { uploadFile } from "../../helpers/uploadFileHelper";
import { IMAGE_MIME_TYPE } from "@mantine/dropzone";

const AddServiceCategory = () => {
  const [opened, setOpened] = useState(false);
  const location = useLocation();
  const params = useParams();
  const [loading, setLoading] = useState(location.pathname.includes("edit") ? true : false);
  const [fileLoading, setFileLoading] = useState(location.pathname.includes("edit") ? true : false);

  const [fileUpload, setFileUpload] = useState([]);
  const [fileUploadError, setFileUploadError] = useState("");
  let navigate = useNavigate();
  const addCategory = async (values) => {
    setLoading(true);
    try {
      let uploadFileResult;
      if (fileUpload.length > 0) {
        uploadFileResult = await uploadFile(fileUpload, setFileLoading);
        if (!uploadFileResult) {
          failureNotification("Failed to upload file");
          setLoading(false);
          return;
        }
      }

      let res;
      if (uploadFileResult) {
        values.image = uploadFileResult;
        res = await postCallWithHeaders("admin/addServicesCategory", values);
      }

      if (uploadFileResult && !res.error) {
        successNotification(res.msg);
        navigate("/adminDashboard/viewServiceCategories");
      } else if (uploadFileResult && res.error) {
        failureNotification(res.msg);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const editCategory = async (values) => {
    setLoading(true);

    try {
      let uploadFileResult;
      if (fileUpload.length > 0) {
        uploadFileResult = await uploadFile(fileUpload, setFileUpload);
        if (!uploadFileResult) {
          failureNotification("Failed to upload file");
          setLoading(false);
          return;
        }
      }

      let res;
      if (uploadFileResult) {
        values.image = uploadFileResult;
      }

      res = await editCallWithHeaders("admin/updateServiceCategory", params.id, values);

      if (!res.error) {
        successNotification(res.msg);
        navigate("/adminDashboard/viewServiceCategories");
      } else {
        failureNotification(res.msg);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getUserDetails = async () => {
    setLoading(true);

    const apiResponse = await getCallSpecificWithHeaders("admin/getAServicesCategory", params.id);
    form.setValues(apiResponse.data);
    setFileUpload(apiResponse.data.image);
    setLoading(false);
    return apiResponse.data;
  };
  useEffect(() => {
    try {
      if (location.pathname.includes("edit")) {
        getUserDetails();
      } else {
        form.reset();
      }
    } catch (error) {
      failureNotification(error);
    }
  }, [location.pathname]);
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      categoryTitle: "",
      image: "",
      categoryDescription: "",
      status: true,
    },

    validate: {
      categoryTitle: (value) => (value.trim().length > 1 ? null : "Name must be at least 2 characters long"),

      categoryDescription: (value) => (value.trim().length > 20 ? null : "Alphabetic Name with 20 or more characters"),
      // image: (value) => /^blob:.+$/.test(value.trim()) ? null : "Invalid image URL"
    },
  });
  const handleFileRemove = (updatedFiles) => {
    setFileUpload(updatedFiles); // Update the fileUpload state with the updated files
  };

  useEffect(() => {
    setFileUploadError("");
  }, [fileUpload]);
  return (
    <Paper
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
      }}
      component={ScrollArea}
    >
      <CancelScreenModal opened={opened} setOpened={setOpened} path={"/adminDashboard/viewServiceCategories"} />
      <LoadingOverlay visible={loading} loaderProps={{ size: "xl", color: "pink", variant: "bars" }} />
      <Center>
        <Paper
          py="xl"
          style={{
            width: "80%",
            height: "100%",
          }}
        >
          <Title order={2} align="center" py="xl">
            Add Service Category
          </Title>

          <Text weight="bold" size="xl" py="md">
            Category Details
          </Text>

          <form
            style={{ padding: "0px", margin: "auto" }}
            onSubmit={form.onSubmit((values) => {
              if (fileUpload == [] || fileUpload?.length < 0 || fileUpload == "") {
                setFileUploadError("Please upload an image");
              } else {
                setFileUploadError("");
                !location.pathname.includes("edit") ? addCategory(values) : editCategory(values);
              }
            })}
          >
            <Grid grow>
              <Grid.Col lg={6}>
                <TextInput
                  required
                  label="Category Title"
                  placeholder="Category Title"
                  // mt="sm"
                  size="md"
                  {...form.getInputProps("categoryTitle")}
                />
              </Grid.Col>
              <Grid.Col lg={6}>
                <Select
                  searchable
                  required
                  size="md"
                  label="Status"
                  placeholder="Select Category Status"
                  data={[
                    {
                      value: true,
                      label: "Active",
                    },
                    {
                      value: false,
                      label: "Inactive",
                    },
                  ]}
                  rightSection={<ChevronDown size={14} />}
                  rightSectionWidth={40}
                  {...form.getInputProps("status")}
                />
              </Grid.Col>

              <Grid.Col lg={12}>
                <Textarea required label="Category Description" maxLength={500} size="md" placeholder="Enter Category Description" minRows={5} {...form.getInputProps("categoryDescription")} />
              </Grid.Col>
              <Grid.Col lg={12}>
                <Input.Wrapper
                  label="Category image"
                  size="md"
                  required
                  withAsterisk
                  name="image" // Add the name attribute here
                  error={fileUploadError}
                >
                  <UploadFiles multiple={false} loading={fileLoading} fileUpload={fileUpload} setFileUpload={setFileUpload} mimeType={"image"} onFileRemove={handleFileRemove} form={form} />
                </Input.Wrapper>
              </Grid.Col>
            </Grid>
            <Grid justify="flex-end">
              <Grid.Col lg={3}>
                <Button fullWidth leftIcon={<X />} color="red" onClick={() => setOpened(true)} size="md" uppercase>
                  cancel
                </Button>
              </Grid.Col>
              <Grid.Col lg={3}>
                <Button fullWidth loading={loading} type="submit" size="md" color="dark" rightIcon={location.pathname.includes("edit") ? <IconEdit /> : <IconPlus />} uppercase>
                  {location.pathname.includes("edit") ? "Edit" : "Add"} Category
                </Button>
              </Grid.Col>
            </Grid>
          </form>
        </Paper>
      </Center>
    </Paper>
  );
};

export default AddServiceCategory;
