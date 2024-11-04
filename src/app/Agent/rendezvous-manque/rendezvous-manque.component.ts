import { Component, OnInit } from '@angular/core';
import {RendezVous} from "../../models/RendezVous";
import {RendezvousService} from "../../services/rendezvous.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-rendezvous-manque',
  templateUrl: './rendezvous-manque.component.html',
  styleUrls: ['./rendezvous-manque.component.css']
})
export class RendezvousManqueComponent implements OnInit {
  rendezvousList: RendezVous[] = [];
  paginatedRendezvousList: RendezVous[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 0;
  searchQuery: string = '';

  constructor(private rendezvousService: RendezvousService, private router: Router) { }

  ngOnInit(): void {
    this.getRendezVous();
  }

  getRendezVous(): void {
    const employeeId = Number(sessionStorage.getItem('employeeId'));
    if (employeeId) {
      this.rendezvousService.getRendezVousByEmployeeIdAndStatus(employeeId, 'MANQUE').subscribe(
        (data: RendezVous[]) => {
          this.rendezvousList = data;
          this.updatePagination();
        },
        (error) => {
          console.error('Error fetching rendezvous:', error);
        }
      );
    }
  }

  deleteRendezVous(id: number): void {
    if (!confirm('Êtes-vous sûr ?')) {
      return;
    }
    this.rendezvousService.deleteRendezVous(id).subscribe(
      () => {
        this.getRendezVous();
        console.log('Rendez-vous supprimé avec succès');
      },
      error => {
        console.error('Erreur lors de la suppression du rendez-vous', error);
      }
    );
  }

  callRendezVous(tel: number): void {
    // Redirection vers la page d'appel en passant le numéro de téléphone
    this.router.navigate(['employee/emp-call'], { queryParams: { tel } });
  }

  searchTable(): void {
    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination(): void {
    const filteredRendezvous = this.rendezvousList.filter(rdv =>
      rdv.nomDeClient.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      rdv.prenomDeClient.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      rdv.nomDEntreprise.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.totalPages = Math.ceil(filteredRendezvous.length / this.itemsPerPage);
    this.paginatedRendezvousList = filteredRendezvous.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }
}
