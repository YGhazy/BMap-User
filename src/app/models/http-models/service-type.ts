import { ServiceRequest } from "./service-request";

export interface ServiceType{
  id: number,
  nameAR: string,
  nameEN: string,
  imgIcon: string,
  isDeleted: boolean,
  servicesId: number,
  serviceRequests: ServiceRequest[];
  
}
