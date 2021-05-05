import { ServiceType } from "./service-type";

export class Service{
  id: number;
  nameAR: string;
  nameEN: string;
  descriptionAR: string;
  descriptionEN: string;
  header: string;
  icon: string;
  isDeleted: boolean;
  serviceTypes: ServiceType[];

}
