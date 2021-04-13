import { ServiceType } from "./service-type";

export interface Service{
  id: number,
  name: string,
  description: string,
  header: string,
  icon: string,
  isDeleted: boolean,
  serviceTypes: ServiceType[];
  
}
