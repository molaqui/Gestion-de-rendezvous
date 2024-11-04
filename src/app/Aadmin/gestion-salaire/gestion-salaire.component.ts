import { Component, OnInit } from '@angular/core';
import {EmployeeSalaryDTO} from "../../DTO/EmployeeSalaryDTO";
import {EmployeeService} from "../../services/employee.service";
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver'
import * as saveAs from 'file-saver';


@Component({
  selector: 'app-gestion-salaire',
  templateUrl: './gestion-salaire.component.html',
  styleUrls: ['./gestion-salaire.component.css']
})
export class GestionSalaireComponent implements OnInit {
  isLoadingS = true;
  error: string | null = null;
  statistics: any;
  employees: EmployeeSalaryDTO[] = [];
  filteredEmployees: EmployeeSalaryDTO[] = [];
  searchQuery: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  isLoading: { [key: number]: boolean } = {}; // Suivi de l'état de chargement pour chaque employé
  notification: { message: string, type: string } | null = null; // Notification
  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employeeService.getEmployeeStatistics().subscribe(
      (data) => {
        this.statistics = data;
        this.isLoadingS = false;
      },
      (error) => {
        console.error('Error fetching statistics', error);
        this.error = 'Une erreur est survenue lors de la récupération des statistiques.';
        this.isLoadingS = false;
      }
    );
    this.employeeService.getAllEmployeesWithSalary().subscribe(
      (data) => {
        this.employees = data;
        this.filterAndPaginateEmployees();
      },
      (error) => {
        console.error('Error fetching employee data', error);
      }
    );
  }

  onSearchQueryChange(query: string): void {
    this.searchQuery = query;
    this.currentPage = 1;
    this.filterAndPaginateEmployees();
  }

  filterAndPaginateEmployees(): void {
    const lowerCaseQuery = this.searchQuery.toLowerCase();
    const filtered = this.employees.filter(employee =>
      employee.nom.toLowerCase().includes(lowerCaseQuery) ||
      employee.prenom.toLowerCase().includes(lowerCaseQuery)
    );
    this.filteredEmployees = this.paginateEmployees(filtered);
  }

  paginateEmployees(employees: EmployeeSalaryDTO[]): EmployeeSalaryDTO[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = this.currentPage * this.itemsPerPage;
    return employees.slice(start, end);
  }

  onPageChange(page: number): void {
    if (page > 0 && page <= this.totalPages()) {
      this.currentPage = page;
      this.filterAndPaginateEmployees();
    }
  }

  totalPages(): number {
    const lowerCaseQuery = this.searchQuery.toLowerCase();
    const filteredCount = this.employees.filter(employee =>
      employee.nom.toLowerCase().includes(lowerCaseQuery) ||
      employee.prenom.toLowerCase().includes(lowerCaseQuery)
    ).length;
    return Math.ceil(filteredCount / this.itemsPerPage);
  }

  get totalItems(): number {
    return this.employees.filter(employee =>
      employee.nom.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      employee.prenom.toLowerCase().includes(this.searchQuery.toLowerCase())
    ).length;
  }



  confirmPayment(employeeId: number): void {
    this.isLoading[employeeId] = true; // Début du chargement
    this.employeeService.confirmPayment(employeeId).subscribe(
      (updatedEmployee) => {
        const index = this.employees.findIndex(employee => employee.id === updatedEmployee.id);
        if (index !== -1) {
          this.employees[index] = updatedEmployee;
          this.filterAndPaginateEmployees();
        }
        this.isLoading[employeeId] = false; // Fin du chargement

        this.showNotification('Le paiement a été confirmé avec succès!', 'success'); // Notification de succès
      },

      (error) => {
        console.error('Error confirming payment', error);
        this.isLoading[employeeId] = false; // Fin du chargement en cas d'erreur
        this.showNotification('Une erreur est survenue lors de la confirmation du paiement.', 'danger'); // Notification d'erreur
      }
    );
  }

  showNotification(message: string, type: string): void {
    this.notification = { message, type };
    setTimeout(() => this.notification = null, 3000); // Masquer la notification après 3 secondes
  }


  exportToExcel(): void {
    const data: any[] = this.filteredEmployees.map(employee => ({
      'Agent': `${employee.nom} ${employee.prenom}`,
      'Salaire Net': employee.salaireNet,
      'Salaire par Jour': employee.salaireParJour,
      'Nombre de Jours Présents': employee.nmbreDeJour,
      'Prime': employee.prime,
      'Statut de Paiement': employee.paymentStatus
    }));

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);

    // Add statistics to a new worksheet
    const stats = [
      { 'Statistique': 'Nombre Total d\'Employés', 'Valeur': this.statistics.totalEmployees },
      { 'Statistique': 'Total des Salaires Payés', 'Valeur': this.statistics.totalPaidSalaries },
      { 'Statistique': 'Total des Salaires Non Payés', 'Valeur': this.statistics.totalUnpaidSalaries },
      { 'Statistique': 'Total des Jours Travaillés', 'Valeur': this.statistics.totalDaysWorked }
    ];
    const statsSheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(stats);

    const workbook: XLSX.WorkBook = {
      Sheets: { 'Employés': worksheet, 'Statistiques': statsSheet },
      SheetNames: ['Employés', 'Statistiques']
    };

    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    this.saveAsExcelFile(excelBuffer, 'EmployeeData');
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    saveAs(data, fileName + EXCEL_EXTENSION);
  }
}

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
