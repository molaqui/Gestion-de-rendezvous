import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';
import {EmployeeService} from "../../services/employee.service";
import {Employee} from "../../models/employee";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalRendezVous!: number;
  RvEncours!: number;
  RvConfirme!: number;
  RvAnnuler!: number;
  RvManque!: number;
  employees: any[] = [];
  filteredEmployees: any[] = [];
  searchQuery: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;
  private adminId: number = 1;

  constructor(private adminService: AdminService, private router: Router,private employeeService: EmployeeService) {}




  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.adminService.countAllRendezVousByAdminId(this.adminId).subscribe(count => {
      this.totalRendezVous = count;
    });

    this.adminService.countRendezVousByStatus(this.adminId, 'EN_COURS').subscribe(count => {
      this.RvEncours = count;
    });
    this.adminService.countRendezVousByStatus(this.adminId, 'CONFIRME').subscribe(count => {
      this.RvConfirme = count;
    });
    this.adminService.countRendezVousByStatus(this.adminId, 'ANNULE').subscribe(count => {
      this.RvAnnuler = count;
    });
    this.adminService.countRendezVousByStatus(this.adminId, 'MANQUE').subscribe(count => {
      this.RvManque = count;
    });


    this.adminService.getEmployeesByAdminId(this.adminId).subscribe(employees => {
      this.employees = employees.map(employee => ({
        ...employee,
        totalRendezVous: 0,
        rendezVousConfirme: 0,
        rendezVousAnnule: 0,
        rendezVousEnCours: 0,
        rendezVousManque: 0,
        image:null
      }));
      this.totalItems = this.employees.length;
      this.updateFilteredEmployees();

      this.employees.forEach(employee => {
        this.adminService.countRendezVousByEmployeeAndStatus(this.adminId, employee.id, 'CONFIRME').subscribe(count => {
          employee.rendezVousConfirme = count;
        });
        this.adminService.countRendezVousByEmployeeAndStatus(this.adminId, employee.id, 'ANNULE').subscribe(count => {
          employee.rendezVousAnnule = count;
        });
        this.adminService.countRendezVousByEmployeeAndStatus(this.adminId, employee.id, 'EN_COURS').subscribe(count => {
          employee.rendezVousEnCours = count;
        });
        this.adminService.countRendezVousByEmployeeAndStatus(this.adminId, employee.id, 'MANQUE').subscribe(count => {
          employee.rendezVousManque = count;
        });
        this.employeeService.getEmployeeImageById(employee.id).subscribe( (base64Image) => {

          employee.image = base64Image.image ? `data:image/jpeg;base64,${base64Image.image}` : null;
        })
      });

    });
  }

  updateFilteredEmployees(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.filteredEmployees = this.employees
      .filter(employee => {
        const query = this.searchQuery.toLowerCase();
        return employee.nom.toLowerCase().includes(query) || employee.prenom.toLowerCase().includes(query);
      })
      .slice(startIndex, startIndex + this.itemsPerPage);
  }

  onSearchQueryChange(query: string): void {
    this.searchQuery = query;
    this.currentPage = 1;
    this.updateFilteredEmployees();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updateFilteredEmployees();
  }

  onAddAgent(): void {
    this.router.navigate(['admin/add-agent']);
  }

  totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  deleteEmployee(employee: any): void {
    if (confirm(`Êtes-vous sûr de vouloir supprimer l'employé ${employee.nom} ${employee.prenom} ?`)) {
      this.adminService.deleteEmployee(this.adminId, employee.id).subscribe({
        next: () => {
          this.employees = this.employees.filter(emp => emp.id !== employee.id);
          this.updateFilteredEmployees();
          alert('Employé supprimé avec succès.');
        },
        error: (error) => {
          console.log(error);  // Ajoutez cette ligne pour voir la structure de l'erreur dans la console
          let errorMessage = error.error;
          // Vérifiez si error.error est un objet et accédez à la propriété appropriée
          if (typeof error.error === 'object' && error.error !== null) {
            errorMessage = error.error.message; // ou la propriété que votre serveur utilise pour les messages d'erreur
          }
          // Utilisez une chaîne pour la vérification .includes()
          if (typeof errorMessage === 'string' && errorMessage.includes('Cannot delete or update a parent row')) {
            alert("Cet employé ne peut pas être supprimé car il est référencé par des enregistrements de congé.");
          } else {
            alert("Une erreur s'est produite lors de la tentative de suppression de l'employé.");
          }
        }
      });
    }
  }

  viewEmployee(employee: any) {
    this.router.navigateByUrl("admin/view/"+employee.id);

  }
}
