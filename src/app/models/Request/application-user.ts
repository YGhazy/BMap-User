import { Customer } from "./customer";
import { ServiceRequest } from "./service-request";

export interface ApplicationUser {
      id: string,
      email: string,
      phoneNumber: string,
      userName: string,
      image: string,
      customer: Customer;
}
