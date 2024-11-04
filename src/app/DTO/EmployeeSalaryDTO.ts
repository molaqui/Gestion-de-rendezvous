import {PaymentStatus} from "../models/employee";

export interface EmployeeSalaryDTO {
  id: number;
  nom: string;
  prenom: string;
  image: string; // On utilisera 'string' pour faciliter l'affichage
  salaireNet: number;
  salaireParJour: number;
  nmbreDeJour: number;
  prime: number;
  paymentStatus: PaymentStatus;
}
