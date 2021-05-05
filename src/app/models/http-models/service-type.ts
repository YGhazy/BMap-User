import { ServiceRequest } from "./service-request";

export class ServiceType{
  id: number;
  nameAR: string;
  nameEN: string;
  imgIcon: string;
  isDeleted: boolean;
  servicesId: number;
  serviceRequests: ServiceRequest[];
  
}
