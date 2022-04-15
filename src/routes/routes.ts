import { UserRoles } from "src/model";
import {
  Login,
  DashBoard,
  ContactUs,
  About,
  Billing,
  Inventory,
  FinanceScreen,
  IPD_OPD,
  OnlineAppointments,
  OperationTheatre,
  Hms,
  PatientBookingHistory,
} from "src/pages";
export interface IRoute {
  path: string;
  element: any;
  exact?: boolean;
  authorizers: Array<UserRoles>;
  redirect?: string;
  isProtectiveRoute: boolean;
  key: string;
}

const routes: Array<IRoute> = [
  {
    path: "/login",
    element: Login,
    authorizers: [UserRoles.ADMIN],
    isProtectiveRoute: false,
    key: "login",
  },
  {
    path: "/",
    element: DashBoard,
    authorizers: [UserRoles.ADMIN],
    isProtectiveRoute: true,
    key: "dashboard",
  },
  {
    path: "/contact-us",
    element: ContactUs,
    authorizers: [],
    isProtectiveRoute: false,
    key: "contact-us",
  },
  {
    path: "/about",
    element: About,
    authorizers: [],
    isProtectiveRoute: false,
    key: "about",
  },
  {
    path: "/billing",
    element: Billing,
    authorizers: [UserRoles.ADMIN],
    isProtectiveRoute: true,
    key: "billing",
  },
  {
    path: "/inventory",
    element: Inventory,
    authorizers: [UserRoles.ADMIN],
    isProtectiveRoute: true,
    key: "inventory",
  },
  {
    path: "/rfpApproval",
    element: FinanceScreen,
    authorizers: [UserRoles.FINANCE],
    isProtectiveRoute: true,
    key: "finance",
  },
  {
    path: "/ipd-opd",
    element: IPD_OPD,
    authorizers: [UserRoles.ADMIN],
    isProtectiveRoute: true,
    key: "ipd-opd",
  },
  {
    path: "/online-appointment",
    element: OnlineAppointments,
    authorizers: [UserRoles.ADMIN],
    isProtectiveRoute: true,
    key: "online appointment",
  },
  {
    path: "/operation-theatre",
    element: OperationTheatre,
    authorizers: [UserRoles.ADMIN],
    isProtectiveRoute: true,
    key: "operation theatre",
  },
  {
    path: "/reports",
    element: Hms,
    authorizers: [UserRoles.ADMIN],
    isProtectiveRoute: true,
    key: "reports",
  },
  {
    path: "/patient-booking-history",
    element: PatientBookingHistory,
    isProtectiveRoute: false,
    authorizers: [],
    key: "patient booking history",
  },
];

export default routes;
