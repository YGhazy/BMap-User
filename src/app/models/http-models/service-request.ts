import { Bank } from "./bank";
import { Customer } from "./customer";
import { Service } from "./service";
import { ServiceType } from "./service-type";

export interface ServiceRequest{
  id: number,
  date: Date,
  status: string,
  note: string,
  rejectionReason: string,
  customerId: number,
  customer: Customer,
  servicesId: number,
  services: Service,
  serviceTypesId: number,
  serviceTypes: ServiceType,
  banksId: number,
  banks: Bank
}
