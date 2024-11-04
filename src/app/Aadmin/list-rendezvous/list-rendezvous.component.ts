// list-rendezvous.component.ts
import { Component, OnInit } from '@angular/core';
import {RendezVous, Status} from "../../models/RendezVous";
import {RendezvousService} from "../../services/rendezvous.service";


@Component({
  selector: 'app-list-rendezvous',
  templateUrl: './list-rendezvous.component.html',
  styleUrls: ['./list-rendezvous.component.css']
})
export class ListRendezvousComponent implements OnInit {


  rendezVousList: RendezVous[] = [];
  filteredRendezVousList: RendezVous[] = [];
  adminId: number = 1; // Id de l'admin par défaut, à changer selon votre logique
  selectedStatus: Status | null = null;
  statuses = Status;
  searchQuery: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(private rendezVousService: RendezvousService) { }

  ngOnInit(): void {
    this.getAllRendezVous();
  }

  getAllRendezVous(): void {
    this.rendezVousService.getAllRendezVous().subscribe(
      (data: RendezVous[]) => {
        this.rendezVousList = data;
        this.filteredRendezVousList = this.rendezVousList;
      },
      (error) => {
        console.error('Error fetching rendezvous', error);
      }
    );
  }

  filterRendezVousByStatus(status: Status): void {
    this.selectedStatus = status;
    this.rendezVousService.getRendezVousByAdminIdAndStatus(this.adminId, status).subscribe(
      (data: RendezVous[]) => {
        this.rendezVousList = data;
        this.filterRendezVous();
      },
      (error) => {
        console.error('Error fetching rendezvous by status', error);
      }
    );
  }

  resetFilter(): void {
    this.selectedStatus = null;
    this.getAllRendezVous();
  }

  filterRendezVous(): void {
    let filteredList = this.rendezVousList;
    if (this.searchQuery) {
      filteredList = filteredList.filter(rdv =>
        rdv.nomDeClient.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        rdv.prenomDeClient.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
    this.filteredRendezVousList = filteredList.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
  }

  onSearchChange(): void {
    this.currentPage = 1; // Reset to first page on search
    this.filterRendezVous();
  }

  setPage(page: number): void {
    this.currentPage = page;
    this.filterRendezVous();
  }

  get totalPages(): number {
    return Math.ceil(this.filteredRendezVousList.length / this.itemsPerPage);
  }


  approveRendezVous(rendezVous: RendezVous): void {
    this.rendezVousService.approveRendezVous(rendezVous.id).subscribe(
      updatedRendezVous => {
        rendezVous.status = updatedRendezVous.status;
        this.filterRendezVous();
      },
      error => console.error('Error approving rendezvous', error)
    );
  }

  rejectRendezVous(rendezVous: RendezVous): void {
    this.rendezVousService.rejectRendezVous(rendezVous.id).subscribe(
      updatedRendezVous => {
        rendezVous.status = updatedRendezVous.status;
        this.filterRendezVous();
      },
      error => console.error('Error rejecting rendezvous', error)
    );
  }
}
