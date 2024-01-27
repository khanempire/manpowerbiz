/* eslint-disable react/prop-types */
import { Modal, Title } from "@mantine/core";
import ServiceCategoryViewCard from "../cards/ServiceCategoryViewCard";
import ServicesViewCard from "../cards/ServicesViewCard";
import { useLocation } from "react-router-dom";
import PackageViewCard from "../cards/PackageViewCard";
import InvoiceViewCard from "../cards/InvoiceViewCard";
import { useAnimationOffsetEffect } from "@mantine/carousel";
import { useState } from "react";

const SpecificViewModal = ({ opened, close, title, data }) => {
  const location = useLocation();
  const pathname = location.pathname.toLowerCase();
  const TRANSITION_DURATION = 200;
  /*eslint-disable*/
  const [embla, setEmbla] = useState(null);

  useAnimationOffsetEffect(embla, TRANSITION_DURATION);

  return (
    <Modal
      closeOnEscape
      closeOnClickOutside
      styles={{
        title: {
          width: "100%",
          textAlign: "center",
        },
      }}
      title={<Title>{title}</Title>}
      transitionProps={{ duration: TRANSITION_DURATION }}
      opened={opened}
      onClose={close}
      withCloseButton
      size={"xl"}
    >
      {pathname.includes("viewservicecategories") ? (
        <ServiceCategoryViewCard data={data} />
      ) : pathname.includes("viewservices") ? (
        <ServicesViewCard data={data} setEmbla={setEmbla} />
      ) : pathname.includes("viewpackages") ? (
        <PackageViewCard data={data} />
      ) : pathname.includes("viewbookings") ||
        pathname.includes("viewpayments") ||
        pathname.includes("viewcustomerbookings") ? (
        <InvoiceViewCard data={data} />
      ) : null}
      {/* <UserProfileCard data={data} /> */}
      {/* <ServiceCategoryViewCard data={data} /> */}
    </Modal>
  );
};

export default SpecificViewModal;
