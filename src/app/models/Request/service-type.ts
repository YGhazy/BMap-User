import { ServiceRequest } from "./service-request";

export interface ServiceType{
  id: number,
  name: string,
  imgIcon: string,
  isDeleted: boolean,
  servicesId: number,
  serviceRequests: ServiceRequest[];
  
}
