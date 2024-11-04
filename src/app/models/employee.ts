export class PaymentStatus {
  static UNPAID = 'UNPAID';
  static PAID = 'PAID';
}


export interface Employee {
  id: number; // Assurez-vous que 'id' n'est pas facultatif
  nom: string;
  prenom: string;
  email: string;
  motDePass: string;
  matricule: number;
  adress: string;
  image?: Blob;
  adminId: number;
  salaireNet: number;
  salaireParJour: number;
  nmbreDeJour: number;
  prime: number;
  paymentStatus: PaymentStatus;
}
