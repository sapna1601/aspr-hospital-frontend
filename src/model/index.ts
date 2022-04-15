export enum UserRoles {
  ADMIN = "Admin",
  FINANCE = "Finance",
  PATIENT = "Patient",
}

export enum ApiMethods {
  GET,
  POST,
  PUT,
  DELETE,
}

export type Doctor = {
  id: string;
  fullName: string;
  honorific: string;
  expertise: Array<string>;
  profilePic: string;
};

export type Inventory = {
  id: string;
  name: string;
  price: number;
  qty: number;
  description: string;
};

export type LoggedInUser = {
  role: UserRoles;
  orgKey: string;
  approvals?: Array<string>;
};

export interface DropDownOption {
  label: string;
  value: string;
  icon?: any;
}

export type Patient = {
  id?: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  age: number;
};

export type WardType = "IPD" | "OPD";
export type Booking = {
  id?: string;
  patientId: string;
  doctorId: string;
  treatmentType: string;
  dateAndTime: string;
  createdAt?: string;
  updatedAt?: string;
  paid: boolean;
  amount: number;
  wardType: WardType;
  isCancelled?: boolean;
  patientName: string;
  isOnlineBooking?: boolean;
  phoneNumber?: string;
};
