// emp-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { RendezVous } from "../../models/RendezVous";
import { RendezvousService } from "../../services/rendezvous.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-emp-dashboard',
  templateUrl: './emp-dashboard.component.html',
  styleUrls: ['./emp-dashboard.component.css']
})
export class EmpDashboardComponent implements OnInit {
  rendezvousList: RendezVous[] = [];
  filteredRendezvousList: RendezVous[] = [];
  paginatedRendezvousList: RendezVous[] = [];
  totalRendezvous: number = 0;
  enCoursRendezvous: number = 0;
  confirmesRendezvous: number = 0;
  annulesRendezvous: number = 0;
  manquesRendezvous: number = 0;
  pastraiterRendezvous: number = 0;
  rappels: number = 0;
  itemsPerPage: number = 5;
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(private rendezvousService: RendezvousService,private route:Router) { }

  ngOnInit(): void {
    this.getRendezVous();
    this.getRendezVousCount();
  }

  getRendezVous(): void {
    const employeeId = Number(sessionStorage.getItem('employeeId'));
    if (employeeId) {
      this.rendezvousService.getRendezVousByEmployeeId(employeeId).subscribe(
        (data: RendezVous[]) => {
          this.rendezvousList = data;
          this.filteredRendezvousList = data;
          this.updatePagination();
        },
        (error) => {
          console.error('Error fetching rendezvous:', error);
        }
      );
    }
  }

  getRendezVousCount(): void {
    const adminId = 1; // Remplacez par l'ID de l'admin approprié
    const employeeId = Number(sessionStorage.getItem('employeeId'));
    if (employeeId) {
      this.rendezvousService.countRendezVousByEmployeeIdAndStatus(adminId, employeeId, 'EN_COURS').subscribe(
        count => {
          this.enCoursRendezvous = count;
          this.updateTotalRendezvous();
        }
      );
      this.rendezvousService.countRendezVousByEmployeeIdAndStatus(adminId, employeeId, 'CONFIRME').subscribe(
        count => {
          this.confirmesRendezvous = count;
          this.updateTotalRendezvous();
        }
      );
      this.rendezvousService.countRendezVousByEmployeeIdAndStatus(adminId, employeeId, 'ANNULE').subscribe(
        count => {
          this.annulesRendezvous = count;
          this.updateTotalRendezvous();
        }
      );
      this.rendezvousService.countRendezVousByEmployeeIdAndStatus(adminId, employeeId, 'MANQUE').subscribe(
        count => {
          this.manquesRendezvous = count;
          this.updateTotalRendezvous();
        }
      );
      this.rendezvousService.countRendezVousByEmployeeIdAndStatus(adminId, employeeId, 'PAS_TRAITER').subscribe(
        count => {
          this.pastraiterRendezvous = count;
          this.updateTotalRendezvous();
        }
      );
      // Ajoutez une méthode similaire pour les rappels si nécessaire
    }
  }

  updateTotalRendezvous(): void {
    this.totalRendezvous = this.enCoursRendezvous + this.confirmesRendezvous + this.annulesRendezvous + this.manquesRendezvous+this.pastraiterRendezvous;
  }

  filterRendezVous(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredRendezvousList = this.rendezvousList.filter(rdv =>
      rdv.nomDeClient.toLowerCase().includes(searchTerm) ||
      rdv.prenomDeClient.toLowerCase().includes(searchTerm) ||
      rdv.tel.toString().includes(searchTerm) ||
      rdv.nomDEntreprise.toLowerCase().includes(searchTerm) ||
      rdv.adresse.toLowerCase().includes(searchTerm) ||
      rdv.ville.toLowerCase().includes(searchTerm) ||
      rdv.zip.toString().includes(searchTerm) ||
      rdv.numeroFiscale.toString().includes(searchTerm) ||
      rdv.type.toLowerCase().includes(searchTerm) ||
      rdv.commentaire.toLowerCase().includes(searchTerm) ||
      rdv.status.toLowerCase().includes(searchTerm)
    );
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredRendezvousList.length / this.itemsPerPage);
    this.paginateRendezVousList();
  }

  paginateRendezVousList(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedRendezvousList = this.filteredRendezvousList.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateRendezVousList();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateRendezVousList();
    }
  }

  deleteRendezVous(id: number): void {
    if (!confirm("Are you sure?")) {
      return;
    }
    this.rendezvousService.deleteRendezVous(id).subscribe(
      () => {
        this.rendezvousService.getRendezVousByEmployeeId(Number(sessionStorage.getItem('employeeId'))).subscribe(
          (data: RendezVous[]) => {
            this.rendezvousList = data;
            this.filteredRendezvousList = data;
            this.updatePagination();
          });
        console.log('Rendez-vous supprimé avec succès');
        // Actualiser la liste des rendez-vous ou effectuer d'autres actions nécessaires
      },
      error => {
        console.error('Erreur lors de la suppression du rendez-vous', error);
      }
    );
  }

  editRendezVous(id: number): void {
    this.route.navigateByUrl("employee/update-rendezvous/"+id);
  }
}
