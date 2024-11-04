import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import {EmployeeService} from "../../services/employee.service";

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  id!: number;
  nom!: string;
  prenom!: string;
  email!: string;
  image: string | null = null; // Changer en string pour contenir la chaîne base64
  motDePass!: string;
  adresse!: string;
  matricule!: number;
  imageInsererAuDB!:string | null;
   adminId!: number;
  salaireParJour!:number;

  constructor(

    private personneService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.adminId=1;
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    this.imageInsererAuDB = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.image = e.target.result.split(',')[1];

      };
      reader.readAsDataURL(file);
    }
  }

  addemployee() {
    this.personneService.addemployee(
       this.salaireParJour,this.adminId ,this.nom, this.prenom, this.email, this.imageInsererAuDB, this.motDePass, this.adresse, this.matricule
    ).subscribe(response => {
      alert("Personne ajouter");
    });
this.resetForm();
  }

  resetForm() {
    this.id = 0; // Ou une autre valeur par défaut appropriée
    this.nom = '';
    this.prenom = '';
    this.email = '';
    this.image = null;
    this.motDePass = '';
    this.adresse = '';
    this.matricule = 0; // Ou une autre valeur par défaut appropriée
    this.imageInsererAuDB = null;
    this.salaireParJour=0;
  }
}
