// list-conges.component.ts
import { Component, OnInit } from '@angular/core';
import { CongeService } from 'src/app/services/conge.service';
import { Conge } from '../../models/Conge';
import {AppComponent} from "../../app.component";
import {AdminComponent} from "../admin/admin.component";

@Component({
  selector: 'app-list-conges',
  templateUrl: './list-conges.component.html',
  styleUrls: ['./list-conges.component.css']
})
export class ListCongesComponent implements OnInit {
  conges: Conge[] = [];
  filteredConges: Conge[] = [];
  paginatedConges: Conge[] = [];
  searchQuery: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 0;
  //parametre de notifaication
  notificationMessage: string | null = null;
  notificationType: string | null = null;

  loading:boolean=false;

  constructor(private congeService: CongeService, private appcomponent: AdminComponent) { }

  ngOnInit(): void {
    this.loadAllConges();
  }

  loadAllConges(): void {
    this.congeService.getAllConges().subscribe(data => {
      this.conges = data;
      this.filteredConges = data;
      this.updatePagination();
    });
  }

  loadCongesByStatus(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const status = selectElement.value;
    if (status) {
      this.congeService.getCongeByStatus(status).subscribe(data => {
        this.filteredConges = data;
        this.updatePagination();
      });
    } else {
      this.loadAllConges();
    }
  }

  approveLeave(id: number | undefined): void {
    if (id === undefined) {
      console.error('Erreur: ID du congé est undefined');
      return;
    }
    this.loading = true;
    this.congeService.approveLeave(id).subscribe(() => {
      this.showNotification('Congé approuvé', 'success');
      this.loadAllConges();
      this.appcomponent.notificationCount=this.appcomponent.notificationCount-1;
      this.loading = false; // Stop loading
    });
  }

  rejectLeave(id: number | undefined): void {
    if (id === undefined) {
      console.error('Erreur: ID du congé est undefined');
      return;
    }
    this.loading = true; // Start loading
    this.congeService.rejectLeave(id).subscribe(() => {
      this.showNotification('Congé rejeté', 'danger');
      this.loadAllConges();
      this.appcomponent.notificationCount=this.appcomponent.notificationCount-1;
      this.loading = false; // Stop loading
    });
  }
// la notification si un conge approve ou rejete
  showNotification(message: string, type: string): void {
    this.notificationMessage = message;
    this.notificationType = type;
    setTimeout(() => {
      this.notificationMessage = null;
      this.notificationType = null;
    }, 3000); // Hide the notification after 3 seconds
  }
  onSearchChange(): void {
    this.filteredConges = this.conges.filter(conge =>
      conge.employee.nom.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      conge.employee.id!.toString().includes(this.searchQuery) ||
      conge.dateDebut.toString().includes(this.searchQuery) ||
      conge.dateFin.toString().includes(this.searchQuery) ||
      conge.type.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      conge.status.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.updatePagination();
  }

  setPage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredConges.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedConges = this.filteredConges.slice(startIndex, endIndex);
  }




}
