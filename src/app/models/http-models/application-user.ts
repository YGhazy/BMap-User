import { Customer } from "./customer";

export interface ApplicationUser {
      id: string,
      email: string,
      phoneNumber: string,
      userName: string,
      image: string,
      customer: Customer;
}
