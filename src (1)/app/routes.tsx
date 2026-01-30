import { createBrowserRouter } from "react-router";
import { RoleLandingPage } from "@/app/components/RoleLandingPage";
import { CustomerApp } from "@/app/components/customer/CustomerApp";
import { StoreApp } from "@/app/components/store/StoreApp";
import { RiderApp } from "@/app/components/rider/RiderApp";
import { AdminApp } from "@/app/components/admin/AdminApp";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RoleLandingPage,
  },
  {
    path: "/customer/*",
    Component: CustomerApp,
  },
  {
    path: "/store/*",
    Component: StoreApp,
  },
  {
    path: "/rider/*",
    Component: RiderApp,
  },
  {
    path: "/admin/*",
    Component: AdminApp,
  },
]);
