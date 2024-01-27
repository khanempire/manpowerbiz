/* eslint-disable react/prop-types */
import { Button, Grid, Group, Paper, Table, Text, Title } from "@mantine/core";
import { IconMail } from "@tabler/icons-react";
import { IconBrandWhatsapp, IconMapPin, IconPhone, IconPrinter } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useRef } from "react";
import ReactToPrint from "react-to-print";

const InvoiceViewCard = ({ data }) => {
  const componentRef = useRef();

  const totalBookingPrice = (data.customService?.reduce((total, pkg) => total + pkg?.amount * 1, 0) || 0 + data.bookingPackage?.reduce((total, pkg) => total + pkg?.package?.packagePrice * pkg?.quantity, 0))?.toLocaleString();

  const totalCustomServicePrice = data.customService?.reduce((total, pkg) => total + pkg?.amount * 1, 0);

  const remainingPrice = data?.bookingPaymentStatus !== "FULL" ? (+data.bookingRemainingAmount + +totalCustomServicePrice)?.toLocaleString() : data.bookingRemainingAmount?.toLocaleString();

  return (
    <Paper>
      <ReactToPrint
        trigger={() => (
          <Button my={"xs"} rightIcon={<IconPrinter />}>
            Print
          </Button>
        )}
        content={() => componentRef.current}
        documentTitle={data.bookingId}
        pageStyle={"margin:auto"}
        copyStyles={true}
        suppressErrors={true}
      />
      <Paper ref={componentRef} withBorder p={"xs"}>
        <Title order={2} p={5} bg={"dark"} color="white" align="center">
          ManpowerBiz
        </Title>
        <Title align="center">{data.serviceTitle}</Title>
        <Group position="center" spacing={3} bg={"dark"} color="white">
          <IconMapPin color="white" />
          <Text align="center" size={"lg"} transform="capitalize" color="white">
            {data.bookingCity}
          </Text>
        </Group>
        <Group position="center" spacing={3} bg={"dark"} color="white">
          <IconMail color="white" />
          <Text align="center" size={"md"} transform="none" color="white">
            mpb.kol@manpowerbiz.in
            {/* {data.bookingServices
              ? data.bookingServices?.map((booking) => {
                  return booking?.serviceInfoEmail;
                })
              : data.bookingService?.map((booking) => {
                  return booking?.serviceInfoEmail;
                })} */}
          </Text>
        </Group>
        <Group position="center" spacing={6} bg={"dark"} pb={5}>
          <Group spacing={3}>
            <IconPhone color="white" />
            <Text align="center" size={"md"} transform="none" color="white">
              7980998944
              {/* {data.bookingServices
                ? data.bookingServices?.map((booking) => {
                    return booking?.serviceContactPhone;
                  })
                : data.bookingService?.map((booking) => {
                    return booking?.serviceContactPhone;
                  })} */}
            </Text>
          </Group>
          <Group spacing={3}>
            <IconBrandWhatsapp color="white" bg={"dark"} />
            <Text align="center" size={"md"} transform="none" color="white">
              8420161635
              {/* {data.bookingServices
                ? data.bookingServices?.map((booking) => {
                    return booking?.serviceWhatsAppPhone;
                  })
                : data.bookingService?.map((booking) => {
                    return booking?.serviceWhatsAppPhone;
                  })} */}
            </Text>
          </Group>
        </Group>
        <Title my={"sm"} bg={"teal"} color="white" p={5} order={3} align="center">
          {"Invoice "}Details
        </Title>
        <Grid>
          <Grid.Col>
            <Text>
              <b>Invoice Date: </b>
              {data.createdAt?.split("T")[0] || dayjs().format("YYYY-MM-DD")}
            </Text>
            <Text>
              <b>Tracking ID: </b>
              {data.bookingId}
            </Text>
            <Text>
              <b>Booking Status: </b>
              {data.bookingStatus}
            </Text>
            <Text>
              <b>Payment Status: </b>
              {data.bookingPaymentStatus} ({data.bookingPaidAmount?.toLocaleString()})
            </Text>
            <Text>
              <b>Customer Name: </b>
              {data.bookingCustomer.fullName}
            </Text>
            <Text>
              <b>Customer Email: </b>
              {data.bookingEmailAddress}
            </Text>
          </Grid.Col>
        </Grid>
        <Title my={"sm"} bg={"teal"} color="white" p={5} order={3} align="center">
          Booking Details
        </Title>
        <Table withColumnBorders withBorder striped>
          <thead>
            <tr>
              <th> Package title</th>
              <th> Package Booking Date</th>
              <th>
                <Group position="right">
                  <Text>Package Quantity</Text>
                </Group>{" "}
              </th>
              <th>
                <Group position="right">
                  <Text>Package Price</Text>
                </Group>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.bookingPackage?.map((pkg, index) => {
              return (
                <tr key={index}>
                  <td>{pkg?.package?.packageTitle}</td> {/* Access packageTitle */}
                  <td>
                    <Text>{dayjs(pkg?.bookingDate).format("YYYY-MM-DD")}</Text>
                  </td>
                  <td align="right">{pkg.quantity?.toLocaleString()}</td>
                  <td align="right">{pkg?.package?.packagePrice?.toLocaleString()}</td> {/* Access packagePrice */}
                </tr>
              );
            })}
          </tbody>
        </Table>
        {data?.customService && data?.customService?.length > 0 && (
          <>
            <Title my={"sm"} bg={"teal"} color="white" p={5} order={3} align="center">
              Additonal Services
            </Title>
            <Table withColumnBorders withBorder striped>
              <thead>
                <tr>
                  <th> Package title</th>
                  <th> Date</th>
                  <th>
                    <Group position="right">
                      <Text>Package Quantity</Text>
                    </Group>{" "}
                  </th>
                  <th>
                    <Group position="right">
                      <Text>Package Price</Text>
                    </Group>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.customService?.map((pkg, index) => {
                  return (
                    <tr key={index}>
                      <td>{pkg?.name}</td> {/* Access packageTitle */}
                      <td>
                        <Text>{dayjs(pkg?.createdAt).format("YYYY-MM-DD")}</Text>
                      </td>
                      <td align="right">1</td>
                      <td align="right">{pkg?.amount?.toLocaleString()}</td> {/* Access packagePrice */}
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </>
        )}
        <Group position="right">
          <Text color={"dimmed"}>Total: {totalBookingPrice}</Text>
        </Group>
        <Text align="justify">
          <b>Customer Request: </b>
          <br />
          {data.bookingDescription}
        </Text>

        <Title my={"sm"} bg={"teal"} color="white" p={5} order={3} align="center">
          Billing Details
        </Title>

        <Table withColumnBorders withBorder striped>
          <thead>
            <tr>
              <th>Item</th>
              <th>
                <Text align="right">Item Cost</Text>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Total Price</td>
              <td align="right">{(+data.bookingPrice + +totalCustomServicePrice).toFixed(2)}</td>
            </tr>
            <tr>
              <td>Total Paid</td>
              <td align="right">{data.bookingPaidAmount?.toLocaleString()}</td>
            </tr>
            <tr>
              <td>Remaining</td>
              <td align="right">{data.bookingRemainingAmount ? remainingPrice : (+data.bookingPrice + +totalCustomServicePrice - data.bookingPaidAmount)?.toLocaleString()}</td>
              {/* <td align="right">{(+totalBookingPrice - (+data.bookingPaidAmount || 0))?.toLocaleString()}</td> */}
            </tr>
          </tbody>
        </Table>

        {location.pathname.includes("viewBookings") && (
          <>
            <Title my={"sm"} bg={"teal"} color="white" p={5} order={3} align="center">
              Service Details
            </Title>

            <Table withColumnBorders withBorder striped>
              <tbody>
                <tr>
                  <td>Service</td>
                  {data.bookingService?.map((srvc, index) => {
                    return (
                      <td key={index} align="right">
                        {srvc.serviceTitle}
                      </td>
                    );
                  })}
                </tr>
                <tr>
                  <td>Service Email Address</td>
                  {data.bookingService?.map((srvc, index) => {
                    return (
                      <td key={index} align="right">
                        {srvc.serviceInfoEmail}
                      </td>
                    );
                  })}
                </tr>
                <tr>
                  <td>Service Contact Number</td>
                  {data.bookingService?.map((srvc, index) => {
                    return (
                      <td key={index} align="right">
                        {srvc.serviceContactPhone}
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </Table>
          </>
        )}

        {location.pathname.includes("viewBookings") && (
          <>
            <Title my={"sm"} bg={"teal"} color="white" p={5} order={3} align="center">
              Package Details
            </Title>

            <Table withColumnBorders withBorder striped>
              <tbody>
                <tr>
                  <td>Package</td>
                  {data.bookingPackage?.map((pkg, index) => {
                    return (
                      <td key={index} align="right">
                        {pkg?.package?.packageTitle}
                      </td>
                    );
                  })}
                </tr>
                <tr>
                  <td>Price</td>
                  {data.bookingPackage?.map((pkg, index) => {
                    return (
                      <td key={index} align="right">
                        {pkg?.package?.packagePrice}
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </Table>
          </>
        )}

        {location.pathname.includes("viewBookings") && (
          <>
            <Title my={"sm"} bg={"teal"} color="white" p={5} order={3} align="center">
              Customer Details
            </Title>

            <Table withColumnBorders withBorder striped>
              <tbody>
                <tr>
                  <td>Name</td>
                  <td align="right">{data?.bookingCustomer?.fullName}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td align="right">{data?.bookingCustomer?.email}</td>
                </tr>
                <tr>
                  <td>Contact</td>
                  <td align="right">{data?.bookingCustomer?.contactNumber}</td>
                </tr>
              </tbody>
            </Table>
          </>
        )}
      </Paper>
    </Paper>
  );
};

export default InvoiceViewCard;
