import { Route, Routes } from "react-router-dom";
import "./App.css";
import Appshell from "./components/dashboard/Appshell";
import { Dashboard } from "./components/dashboard/Dashboard";
import ViewUser from "./components/users/ViewUser";
import AddUser from "./components/users/AddUser";
import ChatScreen from "./components/chats/ChatScreen";
import AddServiceCategory from "./components/serviceCategories/AddServiceCategory";
import ViewServiceCategory from "./components/serviceCategories/ViewServiceCategory";
import AddPackages from "./components/packages/AddPackages";
import ViewPackages from "./components/packages/ViewPackages";
import AddBooking from "./components/bookings/AddBooking";
import ViewBooking from "./components/bookings/ViewBooking";
import CustomerPayments from "./components/customer-components/CustomerPayments";
import ViewPayment from "./components/payment/ViewPayment";
import AddComplaint from "./components/complaint/AddComplaint";
import ViewComplaint from "./components/complaint/ViewComplaint";
import Policy from "./components/policies/Policy";
import Settings from "./components/settings/Settings";
import ReviewsAndFeebacks from "./components/review_feedback/ReviewsAndFeebacks";
import { BadRequest } from "./components/errorpages/BadRequest";
import FrequentlyAskedQuestions from "./components/frequentlyAskedQuestions/FrequentlyAskedQuestions";
import { useState } from "react";
import { MantineProvider, ColorSchemeProvider } from "@mantine/core";
import AddServices from "./components/services/AddServices";
import ViewServices from "./components/services/ViewServices";
import LoginSignUp from "./components/login_signup/LoginSignUp";
import PrivateRoutes from "./helpers/PrivateRoute";
import LandingPage from "./components/landingPage/LandingPage";
import UploadFiles from "./components/uploadFiles/UploadFiles";
import { customerRoutes, routes } from "./helpers/routesHelper";
import CustomerOutlet from "./components/customer-components/CustomerOutlet";
import SpecificServiceCategory from "./components/customer-components/SpecificServiceCategory";
import ViewCart from "./components/customer-components/ViewCart";
import CustomerHome from "./components/customer-components/CustomerHome";
import CustomerBookingsView from "./components/customer-components/CustomerBookingsView";
import { CustomerDashboard } from "./components/customer-components/CustomerDashboard";
import AllCategories from "./components/categories/AllCategories";
import Test from "./components/payment/Test";
import Messenger from "./components/chat";

function App() {
  const [colorScheme, setColorScheme] = useState("light");
  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{
          colorScheme,
          primaryColor: "dark",
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Routes>
          <Route path="/uploadFile" element={<UploadFiles />} />
          <Route path={routes.auth} element={<LoginSignUp />} />
          <Route element={<PrivateRoutes />}>
            <Route path={routes.adminDashboard} element={<Appshell />}>
              <Route path={routes.adminDashboard} element={<Dashboard />} />
              <Route path={routes.addUser} element={<AddUser />} />
              <Route path={`${routes.editUser}/:id`} element={<AddUser />} />
              <Route path={routes.viewUser} element={<ViewUser />} />
              <Route
                path={routes.addservicecategory}
                element={<AddServiceCategory />}
              />
              <Route
                path={`${routes.editservicecategory}/:id`}
                element={<AddServiceCategory />}
              />
              <Route
                path={`${routes.editService}/:id`}
                element={<AddServices />}
              />
              <Route
                path={routes.viewServiceCategories}
                element={<ViewServiceCategory />}
              />
              <Route path={routes.addService} element={<AddServices />} />
              <Route path={routes.viewServices} element={<ViewServices />} />
              <Route path={routes.addPackage} element={<AddPackages />} />
              <Route
                path={`${routes.editPackage}/:id`}
                element={<AddPackages />}
              />
              <Route path={routes.addPackageWithId} element={<AddPackages />} />
              <Route path={routes.viewPackages} element={<ViewPackages />} />
              <Route path={routes.addBooking} element={<AddBooking />} />
              <Route path={routes.updateBooking} element={<AddBooking />} />
              <Route path={routes.viewBookings} element={<ViewBooking />} />
              <Route path={routes.addPayment} element={<Test />} />
              <Route path={routes.viewPayments} element={<ViewPayment />} />
              <Route path={routes.chats} element={<ChatScreen />} />
              <Route path={routes.addComplaint} element={<AddComplaint />} />
              <Route path={routes.viewComplaints} element={<ViewComplaint />} />
              <Route path={routes.policies} element={<Policy />} />
              <Route path={routes.settings} element={<Settings />} />
              <Route
                path={routes.reviewsAndFeedbacks}
                element={<ReviewsAndFeebacks />}
              />
              <Route path={routes.faq} element={<FrequentlyAskedQuestions />} />
              <Route path="*" element={<BadRequest />} />
            </Route>
          </Route>
          {/* Customer side */}

          <Route path="/" element={<CustomerOutlet />}>
            <Route path="/" element={<LandingPage />} />
            <Route path={customerRoutes.chat} element={<Messenger />} />
            <Route
              path={`${customerRoutes.specificService}/:id`}
              element={<SpecificServiceCategory />}
            />
            <Route path={customerRoutes.viewCart} element={<ViewCart />} />
            <Route
              path={customerRoutes.categories}
              element={<AllCategories />}
            />
            <Route
              path={customerRoutes.customerHome}
              element={<CustomerHome />}
            >
              <Route
                path={customerRoutes.customerHome}
                element={<CustomerDashboard />}
              />
              <Route
                path={customerRoutes.customerBookings}
                element={<CustomerBookingsView />}
              />
              <Route
                path={customerRoutes.customerPayments}
                element={<CustomerPayments />}
              />
              <Route
                path={customerRoutes.customerSettings}
                element={<Settings />}
              />
            </Route>
          </Route>

          <Route path="*" element={<BadRequest />} />
        </Routes>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
