import {Employee} from "./employee";


export enum Type {
  ISO_9000 ='ISO_9000',
  ISO_26030 ='ISO_26030',
  OHSAS_18001 ='OHSAS_18001',
  ISO_14001 ='ISO_14001'

}
export enum Status {
  EN_COURS = 'EN_COURS',
  PAS_TRAITER = 'PAS_TRAITER',
  ANNULE = 'ANNULE',
  MANQUE = 'MANQUE',
  CONFIRME = 'CONFIRME'
}
export interface RendezVous {
  id: number;
  nomDeClient: string;
  prenomDeClient: string;
  tel: number;
  nomDEntreprise: string;
  adresse: string;
  ville: string;
  zip: number;
  numeroFiscale: number;
  commentaire: string;
  dateDeRendezVous: Date;
  employee: Employee;
  type: Type;
  status: Status;
}
