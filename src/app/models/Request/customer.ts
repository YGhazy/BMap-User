import { ServiceRequest } from "./service-request";

export interface Customer {
  id: number,
  gender: string,
  nationalId: string,
  dateOfBirth: Date,
  jobTitle: string,
  type: string,
  accountStatus: string,
  city: string,
  province: string,
  country: string,
  street: string,
  nationalIdFront: string,
  nationalIdBack: string,
  profilePicture: string,
  first: string,
  firstMiddle: string,l
  secondMiddle: string,
  last: string,
  isDeleted: boolean,
  userId: string,
  serviceRequests: ServiceRequest[];
}
