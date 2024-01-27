/*eslint-disable*/
import { ArrowLeft, ArrowRight, BrandFacebook, BrandInstagram, BrandWhatsapp, Check, ChevronDown, Globe, Mail, Phone } from "tabler-icons-react";
import { useForm } from "@mantine/form";
import { TextInput, Group, Title, Text, Button, Textarea, Grid, Stepper, Paper, Center, Select, Card, LoadingOverlay, Input, Image, MultiSelect } from "@mantine/core";
import { useEffect, useState } from "react";
import { X } from "tabler-icons-react";
import { Carousel } from "@mantine/carousel";
import CancelScreenModal from "../modals/CancelScreenModal";
import { editCallWithHeaders, getCallSpecificWithHeaders, getCallWithHeaders, postCallWithHeaders } from "../../helpers/apiCallHelpers";
import UploadFiles from "../uploadFiles/UploadFiles";
import { failureNotification, successNotification } from "../../helpers/notificationHelper";
import { uploadFile } from "../../helpers/uploadFileHelper";
import ViewUploadedFileModal from "../modals/ViewUploadedFileModal";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Document, Page } from "react-pdf";
import ProceedToAddPackagesModal from "../modals/ProceedToAddPackagesModal";
import { routes } from "../../helpers/routesHelper";

const AppendFn = (allZipCode) => {
  return allZipCode.map((zipCode) => {
    const zipCodeStr = `700${String(zipCode).padStart(3, "0")}`;
    return zipCodeStr.slice(0, 6); // Ensure the result is of length 6
  });
};

const redOnes = [2, 3, 4, 5, 9, 10, 11, 28, 36, 37, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 64, 66, 67, 74, 76, 77, 78, 79, 80, 81, 82, 89, 90, 109, 110, 111, 112, 113, 114, 115, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 156, 157, 161, 162];

export const appendRedOnes = AppendFn(redOnes);

const allZipCode = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 155, 156, 157, 161, 162];

export const allCodesAppended = AppendFn(allZipCode);

export function SelectItem({ image, label, name, elementRef, ...others }) {
  if (appendRedOnes.includes(label)) {
    return (
      <div
        ref={elementRef}
        {...others}
        style={{
          padding: 0,
          paddingLeft: "1rem",
        }}
      >
        <p
          style={{
            color: "",
          }}
        >
          {label}
        </p>
      </div>
    );
  } else {
    return (
      <div
        ref={elementRef}
        {...others}
        style={{
          padding: 0,
          paddingLeft: "1rem",
        }}
      >
        <p> {label}</p>
      </div>
    );
  }
}

const AddService = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [apiResponseObj, setApiResponseObj] = useState("");

  const [opened, setOpened] = useState(false);
  // const [loading, setLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(location.pathname?.includes("edit") ? true : false);
  const [imageUpload, setImageUpload] = useState([]);
  const [videoLoading, setVideoLoading] = useState(location.pathname?.includes("edit") ? true : false);
  const [videoUpload, setVideoUpload] = useState([]);
  const [pdfUpload, setPdfUpload] = useState([]);
  const [pdfLoading, setPdfLoading] = useState([]);

  const [proceedToPkgModal, setProceedToPkgModal] = useState(false);
  // Images & Videos Modal states
  const [mediaModal, setMediaModal] = useState(false);
  const [dataType, setDataType] = useState("");
  const [modalData, setModalData] = useState({});

  const [generalDetails, setGeneralDetails] = useState({});
  const [contactInformation, setContactInformation] = useState({});

  const [serviceCategories, setServiceCategories] = useState([]);
  const getAllCategories = async () => {
    const apiResponse = await getCallWithHeaders(`admin/getAllServicesCategories`);
    apiResponse.forEach((element) => {
      element.value = element._id;
      element.label = element.categoryTitle;
    });
    setLoading(false);
    return apiResponse;
  };
  useEffect(() => {
    try {
      getAllCategories().then(setServiceCategories);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const [active, setActive] = useState(0);
  const nextStep = () => setActive((current) => (current < 4 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  const addServiceStep1Form = useForm({
    validateInputOnChange: true,
    initialValues: {
      serviceTitle: "",
      serviceCategory: "",
      serviceCity: "",
      serviceZipCode: [],
      serviceDescription: "",
      serviceStatus: true,
      // serviceAddress: ""
    },
    validate: {
      serviceTitle: (value) => (/^[\w\s.,!?'-]{1,100}$/.test(value?.trim()) ? null : "Invalid title"),
      serviceCategory: (value) => (/^\S+$/.test(value?.trim()) ? null : "Select a category"),
      serviceCity: (value) => (/^[A-Za-z\s.-]{2,100}$/.test(value?.trim()) ? null : "Select a city"),
      serviceZipCode: (value) => null,
      serviceDescription: (value) => (/^[\s\S]{1,500}$/.test(value?.trim()) ? null : "Description can't exceed 500 characters"),
      serviceStatus: (value) => null,
      // serviceAddress: (value) => (/^[\w\s.,#-]{1,100}$/.test(value?.trim()) ? null : "Address can only contain alphabets and #"),
    },
  });

  const addServiceStep3Form = useForm({
    validateInputOnChange: true,
    initialValues: {
      serviceContactPhone: "",
      serviceWhatsAppPhone: "",
      serviceInfoEmail: "",
      // serviceFeedbackEmail: "",
      serviceWebsiteLink: "",
      serviceFacebookLink: "",
      serviceInstagramLink: "",
    },
    validate: {
      serviceInfoEmail: (value) =>
        /^(?!.*\.\.)[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/.test(value?.trim())
          ? // /^\S+@[a-zA-Z]+\.[a-zA-Z]+$/.test(value?.trim())
            null
          : "Invalid Email",
      // serviceFeedbackEmail: (value) =>
      //   /^(?!.*\.\.)[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/.test(
      //     value?.trim()
      //   )
      //     ? // /^\S+@[a-zA-Z]+\.[a-zA-Z]+$/.test(value?.trim())
      //       null
      //     : "Invalid Email",
      serviceContactPhone: (value) => (/^[1-9]\d{9}$/.test(value) ? null : "10 digit Phone Number"),
      serviceWhatsAppPhone: (value) => (/^[1-9]\d{9}$/.test(value) ? null : "10 digit WhatsApp Number"),
      serviceWebsiteLink: (value) => (value?.length == 0 ? null : /^(https?:\/\/)?(www\.)?[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)*\.[A-Za-z]{2,}(?::\d{2,5})?(?:\/[^\s]*)?$/.test(value?.trim()) ? null : "Invalid Website link"),
      serviceFacebookLink: (value) => (value?.length == 0 ? null : /^(https?:\/\/)?(www\.)?[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)*\.[A-Za-z]{2,}(?::\d{2,5})?(?:\/[^\s]*)?$/.test(value?.trim()) ? null : "Invalid Facebook link"),
      serviceInstagramLink: (value) => (value?.length == 0 ? null : /^(https?:\/\/)?(www\.)?[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)*\.[A-Za-z]{2,}(?::\d{2,5})?(?:\/[^\s]*)?$/.test(value?.trim()) ? null : "Invalid Instagram link"),
    },
  });

  const addServiceStep1Function = (values) => {
    setGeneralDetails(values);
    nextStep();
  };

  const addServiceStep3Function = (values) => {
    setContactInformation(values);
    nextStep();
  };

  const editForm = async (values) => {
    setGeneralDetails(values);
    nextStep();
  };

  const addServiceFunction = async () => {
    setLoading(true);
    let values = { ...generalDetails, ...contactInformation };
    try {
      let imageUploadResult = [];
      if (imageUpload.length > 0) {
        imageUploadResult = await uploadFile(imageUpload, setImageLoading);
        if (imageUploadResult.length === 0) {
          failureNotification("Failed to upload images");
          setLoading(false);
          return;
        } else {
          successNotification("Images uploaded successfully");
        }
      }

      let videoUploadResult = [];
      if (videoUpload.length > 0) {
        videoUploadResult = await uploadFile(videoUpload, setVideoLoading);
        if (videoUploadResult.length === 0) {
          failureNotification("Failed to upload videos");
          setLoading(false);
          return;
        } else {
          successNotification("Videos uploaded successfully");
        }
      }

      let pdfUploadResult = [];
      if (pdfUpload.length > 0) {
        pdfUploadResult = await uploadFile(pdfUpload, setPdfLoading);
        if (pdfUploadResult.length === 0) {
          failureNotification("Failed to upload PDFs");
          setLoading(false);
          return;
        } else {
          successNotification("PDFs uploaded successfully");
        }
      }
      // Check if any of the upload types have files selected (image, video, or pdf)
      if (imageUploadResult.length > 0 || videoUploadResult.length > 0 || pdfUploadResult.length > 0) {
        values.serviceImages = imageUploadResult;
        values.serviceVideos = videoUploadResult;
        values.servicePDF = pdfUploadResult;
        // const res = await postCallWithHeaders("admin/addService", values);
        if (location.pathname.includes("edit")) {
          const res = await editCallWithHeaders(`admin/updateService`, params.id, values);
          if (!res.error) {
            setLoading(false);
            successNotification(res.msg);
            setApiResponseObj(res.data._id);
            setProceedToPkgModal(true);
            navigate(`${routes.viewServices}`);
          } else {
            failureNotification(res.msg);
            setLoading(false);
          }
        }
        if (location.pathname.includes("add")) {
          const res = await postCallWithHeaders("admin/addService", values);
          if (!res.error) {
            setLoading(false);
            successNotification(res.msg);
            setApiResponseObj(res.data.id);
            setProceedToPkgModal(true);
            navigate("/adminDashboard/viewServices");
          } else {
            failureNotification(res.msg);
            setLoading(false);
          }
        }
      } else {
        console.log("No files selected (images, videos, or PDFs)");
      }
    } catch (error) {
      failureNotification(`${error}`);
    } finally {
      setLoading(false);
    }
  };

  ///updating service code below, idk waht is above////

  useEffect(() => {
    try {
      if (location.pathname.includes("edit")) {
        getServiceDetails();
      }
    } catch (error) {
      failureNotification(error);
    }
  }, [location.pathname]);

  const getServiceDetails = async () => {
    setLoading(true);
    const apiResponse = await getCallSpecificWithHeaders("admin/getAServices", params.id);

    console.log("API RESPONSE HEHE", apiResponse);

    const zipCode = apiResponse?.data.serviceZipCode[0] || "";
    let form1Values = {
      serviceTitle: apiResponse.data.serviceTitle,
      serviceCategory: apiResponse.data.serviceCategory,
      serviceCity: apiResponse.data.serviceCity,
      serviceZipCode: apiResponse.data.serviceZipCode,
      serviceDescription: apiResponse.data.serviceDescription,
      serviceStatus: apiResponse.data.serviceStatus,
    };

    addServiceStep1Form.setValues(form1Values);

    const form3Values = {
      serviceContactPhone: apiResponse.data.serviceContactPhone,
      serviceWhatsAppPhone: apiResponse.data.serviceWhatsAppPhone,
      serviceInfoEmail: apiResponse.data.serviceInfoEmail,
      // serviceFeedbackEmail: apiResponse.data.serviceFeedbackEmail,
      serviceWebsiteLink: apiResponse.data.serviceWebsiteLink,
      serviceFacebookLink: apiResponse.data.serviceFacebookLink,
      serviceInstagramLink: apiResponse.data.serviceInstagramLink,
    };
    addServiceStep3Form.setValues(form3Values);

    setImageUpload(apiResponse?.data?.serviceImages);
    setVideoUpload(apiResponse?.data?.serviceVideos);
    setPdfUpload(apiResponse?.data?.servicePDF);

    setLoading(false);
    return apiResponse?.data;
  };

  const editService = async () => {
    let values = { ...generalDetails, ...contactInformation };
  };

  const checkImages = () => {
    if (imageUpload.length === 0) {
      failureNotification("Select at least one image");
    }
    // else if (videoUpload.length === 0) {
    //   failureNotification("Select at least one video");
    // }
    // else if (pdfUpload.length === 0) {
    //   failureNotification("Select at least one PDF");
    // }
    else {
      nextStep();
    }
  };

  return (
    <Paper
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
      <LoadingOverlay visible={loading} loaderProps={{ size: "xl", color: "pink", variant: "bars" }} overlayOpacity={0.5} overlayColor="#c5c5c5" />
      <Center>
        <Paper
          py="xl"
          style={{
            width: "70%",
            height: "100%",
          }}
        >
          <Title order={2} align="center" py="xl">
            Add Service
          </Title>
          <ProceedToAddPackagesModal opened={proceedToPkgModal} setOpened={setProceedToPkgModal} data={"Do you want to proceed and add packages now for the service you just created?"} title={"Proceed to adding packages?"} path={`${routes.addPackageWithId}${apiResponseObj}`} cancelPath={routes.viewServices} />
          <CancelScreenModal opened={opened} setOpened={setOpened} path={"/adminDashboard/viewServices"} />
          <ViewUploadedFileModal opened={mediaModal} data={modalData} setOpened={setMediaModal} dataType={dataType} />
          <Stepper color="grape" active={active} onStepClick={setActive} breakpoint="sm" pt="xl">
            <Stepper.Step label="Service Details" description="General Details" allowStepSelect={active > 0}>
              <Text weight="bold" size="xl" py="md">
                General Details
              </Text>

              <form
                onSubmit={addServiceStep1Form.onSubmit((values) => {
                  location.pathname.includes("edit") ? editForm(values) : addServiceStep1Function(values);
                })}
                style={{ padding: "0px", margin: "auto" }}
              >
                <Grid grow>
                  <Grid.Col lg={6}>
                    <Select
                      searchable
                      required
                      size="md"
                      label="Category"
                      placeholder="Select Service Category"
                      // limit={Infinity}
                      nothingFound="No One Found"
                      data={serviceCategories}
                      {...addServiceStep1Form.getInputProps("serviceCategory")}
                    />
                  </Grid.Col>
                  <Grid.Col lg={6}>
                    <TextInput
                      required
                      label="Title"
                      placeholder="Enter Service Title"
                      maxLength={100}
                      // mt="sm"
                      size="md"
                      {...addServiceStep1Form.getInputProps("serviceTitle")}
                    />
                  </Grid.Col>

                  <Grid.Col lg={6}>
                    <Select
                      searchable
                      required
                      size="md"
                      label="City"
                      placeholder="Select Service City"
                      data={[
                        {
                          value: "kolkata",
                          label: "Kolkata",
                        },
                      ]}
                      rightSection={<ChevronDown size={14} />}
                      rightSectionWidth={40}
                      {...addServiceStep1Form.getInputProps("serviceCity")}
                    />
                  </Grid.Col>

                  <Grid.Col lg={6}>
                    <MultiSelect
                      // searchable
                      itemComponent={SelectItem}
                      required
                      size="md"
                      label="ZIP"
                      placeholder="Select ZIP"
                      // value={venueCity}
                      // onChange={(e) => setVenueCity(e)}
                      data={allCodesAppended?.map((d) => ({ value: d, label: d }))}
                      rightSection={<ChevronDown size={14} />}
                      rightSectionWidth={40}
                      {...addServiceStep1Form.getInputProps("serviceZipCode")}
                    />
                  </Grid.Col>
                  <Grid.Col lg={6}>
                    <Select
                      searchable
                      required
                      size="md"
                      label="Status"
                      placeholder="Select Service Status"
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
                      {...addServiceStep1Form.getInputProps("serviceStatus")}
                    />
                  </Grid.Col>
                  <Grid.Col lg={6}></Grid.Col>

                  <Grid.Col lg={12}>
                    <Textarea required label="Description" maxLength={1500} size="md" placeholder="Enter Service Description" minRows={3} {...addServiceStep1Form.getInputProps("serviceDescription")} />
                  </Grid.Col>
                </Grid>
                <Grid justify="flex-end" pt="xl">
                  <Grid.Col xs={6} sm={6} md={6} lg={3} xl={3}>
                    <Button
                      fullWidth
                      leftIcon={<X />}
                      color="red"
                      size="md"
                      onClick={() => {
                        setOpened(true);
                      }}
                      uppercase
                    >
                      cancel
                    </Button>
                  </Grid.Col>
                  <Grid.Col xs={6} sm={6} md={6} lg={3} xl={3}>
                    <Button fullWidth rightIcon={<ArrowRight />} type="submit" size="md" color="dark" uppercase>
                      next step
                    </Button>
                  </Grid.Col>
                </Grid>
              </form>
            </Stepper.Step>

            <Stepper.Step label="Service Media" description="Images" allowStepSelect={active > 1}>
              <Text weight="bold" size="xl" py="md">
                Describe Service With Images
              </Text>

              <Input.Wrapper label={"Upload Images"} error={imageUpload.length === 0 ? "Select at least one image" : null}>
                <UploadFiles multiple={true} loading={imageLoading} fileUpload={imageUpload} setFileUpload={setImageUpload} mimeType={"image"} onFileRemove={setImageUpload} />
              </Input.Wrapper>

              {/* <Input.Wrapper label={"Upload Videos"} error={videoUpload.length === 0 ? "Select at least one video" : null}>
                <UploadFiles multiple={true} loading={videoLoading} fileUpload={videoUpload} setFileUpload={setVideoUpload} mimeType={"video"} onFileRemove={setVideoUpload} />
              </Input.Wrapper> */}

              <Input.Wrapper label={"Upload PDF"} error={pdfUpload.length === 0 ? "Select at least one PDF" : null}>
                <UploadFiles multiple={false} loading={pdfLoading} fileUpload={pdfUpload} setFileUpload={setPdfUpload} mimeType={"pdf"} onFileRemove={setPdfUpload} />
              </Input.Wrapper>

              <Grid justify="flex-end" py="md">
                <Grid.Col xs={6} sm={6} md={6} lg={3} xl={3}>
                  <Button
                    fullWidth
                    leftIcon={<ArrowLeft />}
                    color="red"
                    size="md"
                    onClick={prevStep}

                    // disabled={disabled}
                  >
                    BACK
                  </Button>
                </Grid.Col>

                <Grid.Col xs={6} sm={6} md={6} lg={3} xl={3}>
                  <Button
                    fullWidth
                    rightIcon={<ArrowRight />}
                    size="md"
                    color="dark"
                    onClick={() => {
                      checkImages();
                      // nextStep();
                    }}
                  >
                    NEXT
                  </Button>
                </Grid.Col>
              </Grid>
            </Stepper.Step>

            {/* <Stepper.Step label="Contact Information" description="Service Contact Information" allowStepSelect={active > 2}>
              <Text weight="bold" size="xl" py="md">
                Service Contact Information
              </Text>
              <form
                style={{ padding: "0px", margin: "auto" }}
                onSubmit={addServiceStep3Form.onSubmit((values) => {
                  addServiceStep3Function(values);
                })}
              >
                <Grid grow>
                  <Grid.Col lg={6}>
                    <TextInput
                      required
                      label="Information Email"
                      placeholder="Enter Information Email"
                      style={{
                        wordBreak: "break-word",
                        whiteSpace: "normal",
                      }}
                      // mt="sm"
                      size="md"
                      {...addServiceStep3Form.getInputProps("serviceInfoEmail")}
                    />
                  </Grid.Col>

                  <Grid.Col lg={6}>
                    <TextInput
                      type="number"
                      required
                      label="Contact Number"
                      placeholder="Enter Contact Number"
                      // mt="sm"
                      size="md"
                      {...addServiceStep3Form.getInputProps("serviceContactPhone")}
                    />
                  </Grid.Col>
                  <Grid.Col lg={6}>
                    <TextInput
                      type="number"
                      required
                      label="WhatsApp Number"
                      placeholder="Enter WhatsApp Number"
                      // mt="sm"
                      size="md"
                      {...addServiceStep3Form.getInputProps("serviceWhatsAppPhone")}
                    />
                  </Grid.Col>
                  <Grid.Col lg={6}>
                    <TextInput
                      label="Service Website Link"
                      placeholder="Enter Website Link"
                      maxLength={60}
                      style={{
                        wordBreak: "break-word",
                        whiteSpace: "normal",
                      }}
                      // mt="sm"
                      size="md"
                      {...addServiceStep3Form.getInputProps("serviceWebsiteLink")}
                      required
                    />
                  </Grid.Col>
                  <Grid.Col lg={6}>
                    <TextInput
                      label="Service Facebook Link"
                      placeholder="Service Facebook Link"
                      maxLength={60}
                      // mt="sm"
                      size="md"
                      style={{
                        wordBreak: "break-word",
                        whiteSpace: "normal",
                      }}
                      {...addServiceStep3Form.getInputProps("serviceFacebookLink")}
                      required
                    />
                  </Grid.Col>
                  <Grid.Col lg={6}>
                    <TextInput
                      label="Service Instagram Link"
                      placeholder="Service Instagram Link"
                      maxLength={60}
                      style={{
                        wordBreak: "break-word",
                        whiteSpace: "normal",
                      }}
                      // mt="sm"
                      size="md"
                      {...addServiceStep3Form.getInputProps("serviceInstagramLink")}
                      required
                    />
                  </Grid.Col>
                </Grid>
                <Grid justify="flex-end" py="md">
                  <Grid.Col xs={6} sm={6} md={6} lg={3} xl={3}>
                    <Button fullWidth leftIcon={<ArrowLeft />} color="red" size="md" onClick={prevStep} uppercase>
                      Back
                    </Button>
                  </Grid.Col>
                  <Grid.Col xs={6} sm={6} md={6} lg={3} xl={3}>
                    <Button fullWidth rightIcon={<ArrowRight />} size="md" color="dark" type="submit" uppercase>
                      NEXT
                    </Button>
                  </Grid.Col>
                </Grid>
              </form>
            </Stepper.Step> */}

            <Stepper.Completed label="Review & Confirm" description="Review & confirm entered details" allowStepSelect={active > 3}>
              <Paper
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <Text weight="bold" size="xl" py="md">
                  Review And Confirm Your Details
                </Text>

                <Card shadow="sm" radius="md">
                  <Card.Section>
                    <Carousel
                      withIndicators
                      height={300}
                      slideSize="50%"
                      slideGap="md"
                      loop
                      breakpoints={[
                        { maxWidth: "md", slideSize: "50%" },
                        { maxWidth: "sm", slideSize: "100%", slideGap: 0 },
                      ]}
                      align="start"
                    >
                      {imageUpload
                        .concat(videoUpload)
                        .concat(pdfUpload)
                        ?.map((file, index) => {
                          console.log("NIGS", file);
                          return (
                            <Carousel.Slide
                              key={index}
                              onClick={() => {
                                setMediaModal(true);
                                setModalData(file);
                                setDataType("image");
                              }}
                            >
                              {file.type?.includes("image") ? (
                                <Image height={300} fit="cover" src={URL.createObjectURL(file)} />
                              ) : file.type?.includes("video") || (typeof file == "string" && file.includes(".mp4")) ? (
                                <video controls preload={"metadata"} height={300} src={file} />
                              ) : file.type?.includes("pdf") || (typeof file == "string" && file.includes("pdf")) ? (
                                <div style={{ overflow: "hidden", height: 300 }}>
                                  <Document
                                    file={file?.type ? URL.createObjectURL(file) : file}
                                    style={{
                                      overflow: "hidden",
                                      position: "relative",
                                    }}
                                  >
                                    <Page
                                      pageNumber={1}
                                      width={300}
                                      style={{
                                        position: "static",
                                        overflow: "hidden",
                                      }}
                                    />
                                  </Document>
                                </div>
                              ) : (
                                <Image height={300} fit="cover" src={file} />
                              )}
                            </Carousel.Slide>
                          );
                        })}
                    </Carousel>
                  </Card.Section>
                  <Grid>
                    <Grid.Col lg={6}>
                      <Group>
                        <Text size="xl" weight="bold">
                          Service Details
                        </Text>
                      </Group>
                      <Text>
                        <b>Title:</b> {generalDetails.serviceTitle}
                      </Text>
                      <Text>
                        <b>Category:</b> {generalDetails.serviceCategory}
                      </Text>
                      <Text>
                        <b>City:</b> {generalDetails.serviceCity}
                      </Text>
                      <Text>
                        <b>Zip Code:</b> {generalDetails.serviceZipCode}
                      </Text>
                      <Text>
                        <b>Description:</b> {generalDetails.serviceDescription}
                      </Text>
                      <Text
                        align="justify"
                        style={{
                          wordBreak: "break-word",
                          whiteSpace: "normal",
                        }}
                      ></Text>
                    </Grid.Col>

                    {/* <Grid.Col lg={6}>
                      <Group>
                        <Text size="xl" weight="bold">
                          Get in touch
                        </Text>
                      </Group>
                      {contactInformation.serviceContactPhone !== "" && (
                        <Group align="center">
                          <Phone size={20} />
                          {contactInformation.serviceContactPhone}
                        </Group>
                      )}

                      {contactInformation.serviceInfoEmail !== "" && (
                        <Group align="center">
                          <Mail size={20} />
                          {contactInformation.serviceInfoEmail}
                        </Group>
                      )}
                      {contactInformation.serviceWhatsAppPhone !== "" && (
                        <Group align="center">
                          <BrandWhatsapp size={20} />
                          {contactInformation.serviceWhatsAppPhone}
                        </Group>
                      )}

                      
                      {contactInformation.serviceWebsiteLink !== "" && (
                        <Group>
                          <Globe size={20} />
                          {contactInformation.serviceWebsiteLink}
                        </Group>
                      )}
                      {contactInformation.serviceFacebookLink !== "" && (
                        <Group>
                          <BrandFacebook size={20} />
                          {contactInformation.serviceFacebookLink}
                        </Group>
                      )}
                      {contactInformation.serviceInstagramLink !== "" && (
                        <Group>
                          <BrandInstagram size={20} />
                          {contactInformation.serviceInstagramLink}
                        </Group>
                      )}
                    </Grid.Col> */}
                  </Grid>
                </Card>
              </Paper>
              <Grid justify="flex-end" py="md">
                <Grid.Col xs={12} sm={6} md={6} lg={3} xl={3}>
                  <Button fullWidth leftIcon={<ArrowLeft />} color="red" size="md" onClick={prevStep} uppercase>
                    Back
                  </Button>
                </Grid.Col>

                <Grid.Col xs={12} sm={6} md={6} lg={3} xl={3}>
                  <Button
                    fullWidth
                    rightIcon={<Check />}
                    size="md"
                    color="green"
                    uppercase
                    onClick={() => {
                      addServiceFunction();
                    }}
                  >
                    Confirm
                  </Button>
                </Grid.Col>
              </Grid>
            </Stepper.Completed>
          </Stepper>
        </Paper>
      </Center>
    </Paper>
  );
};

export default AddService;
