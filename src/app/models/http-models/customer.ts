import { ServiceRequest } from "./service-request";

export class Customer {
  id: number;
  gender: string;
  nationalID: string;
  dateOfBirth: Date;
  jobTitle: string;
  type: string;
  accountStatus: string;
  city: string;
  province: string;
  country: string;
  street: string;
  nationalIdFront: string;
  nationalIdBack: string;
  profilePicture: string;
  first: string;
  firstMiddle: string;
  secondMiddle: string;
  last: string;
  isDeleted: boolean;
  userId: string;
  serviceRequests: ServiceRequest[];
}
