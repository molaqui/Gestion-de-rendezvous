// src/app/models/conge.model.ts


import {Employee} from "./employee";

// conge.model.ts
export enum LeaveType {
  ANNUAL = 'ANNUAL',
  SICK = 'SICK',
  MATERNITY = 'MATERNITY',
  PATERNITY = 'PATERNITY',
  UNPAID = 'UNPAID',
  PERSONAL = 'PERSONAL'
}

export enum LeaveStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}


export interface Conge {
  id?: number;
  employee:Employee;
  employeeName?: string;  // Assurez-vous que cette propriété correspond à ce que votre backend envoie
  dateDebut: Date;
  dateFin: Date;
  status: string;
  reason?: string;
  approvedBy?: number;
  type: string;

}
export interface AddConge {
  id?: number;
  employee_id:number;
  dateDebut: Date;
  dateFin: Date;
  status: string;
  reason?: string;
  admin_id: number;
  type: string;
}

