import { Component, OnInit } from '@angular/core';
import { Conge } from "../../models/Conge";
import { AdminService } from "../../services/admin.service";
import { CongeService } from "../../services/conge.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  title = 'Admin';
  image: string | null = null;
  nom!: string;
  prenom!: string;
  email!: string;
  notificationCount!: number; // Exemple de compteur de notifications
  showNotificationPopup: boolean = false;
  pendingLeaves: Conge[] = []; // Stocker les congés en attente
  showNotificationDropdown: boolean = false; // Visibilité du menu déroulant

  constructor(
    private adminService: AdminService,
    private congeservice: CongeService,
    private router: Router
  ) { }

  ngOnInit() {
    // Vérifier la session
    const username = sessionStorage.getItem('username');
    const password = sessionStorage.getItem('password');

    if (username !== 'admin' || password !== 'admin') {
      // Rediriger vers la page de login si les informations de session ne sont pas valides
      this.router.navigateByUrl('/login');
    } else {
      // Initialiser les propriétés et charger les données si la session est valide
      this.image = ''; // Initialiser la propriété image
      this.nom = ''; // Initialiser la propriété nom
      this.prenom = ''; // Initialiser la propriété prénom
      this.email = ''; // Initialiser la propriété email
      this.initSidebar();
      this.getAdminDetails(); // Récupérer les détails de l'admin
      this.getNotificationCount(); // Récupérer le compteur de notifications
      this.loadPendingLeaves(); // Charger les congés en attente
    }
  }

  getAdminDetails() {
    const adminId = 1; // Utiliser un ID dynamique si nécessaire
    this.adminService.getAdminById(adminId).subscribe(
      data => {
        if (data) {
          this.nom = data.nom;
          this.prenom = data.prenom;
          this.email = data.email;
          this.image = data.image ? `data:image/jpeg;base64,${data.image}` : null;
        } else {
          console.log("Aucun admin trouvé avec cet ID.");
        }
      },
      error => {
        console.error("Erreur lors de la récupération des détails de l'admin :", error);
      }
    );
  }

  initSidebar() {
    document.addEventListener('DOMContentLoaded', () => {
      let arrows = document.querySelectorAll('.arrow');
      arrows.forEach(arrow => {
        arrow.addEventListener('click', (e) => {
          let arrowParent = (e.target as HTMLElement).parentElement?.parentElement; // Sélection du parent principal de la flèche
          if (arrowParent) {
            arrowParent.classList.toggle('showMenu');
          }
        });
      });

      let sidebar = document.querySelector('.sidebar');
      let sidebarBtn = document.querySelector('#sidebarToggle');
      if (sidebarBtn) {
        sidebarBtn.addEventListener('click', () => {
          if (sidebar) {
            sidebar.classList.toggle('close');
          }
        });
      }
    });
  }

  // Récupérer le nombre de notifications de congés en attente
  getNotificationCount() {
    const status = 'PENDING'; // Exemple de statut, ajuster si nécessaire
    this.congeservice.countLeavesByStatus(status).subscribe(
      count => this.notificationCount = count,
      error => console.error('Erreur lors de la récupération du compteur de notifications :', error)
    );
  }

  loadPendingLeaves(): void {
    const status = 'PENDING'; // Exemple de statut, ajuster si nécessaire
    this.congeservice.getCongeByStatus(status).subscribe(
      leaves => this.pendingLeaves = leaves,
      error => console.error('Erreur lors de la récupération des congés en attente :', error)
    );
  }

  // Pour afficher le menu déroulant lorsqu'on clique sur l'icône de notification
  toggleNotificationDropdown(): void {
    this.showNotificationDropdown = !this.showNotificationDropdown;
  }

  viewMoreDetails(): void {
    this.router.navigate(['admin/list-conge']); // Naviguer vers list-conge
  }

  // Méthode de déconnexion
  logout(): void {

    sessionStorage.removeItem('username');
    sessionStorage.removeItem('password');

    this.router.navigateByUrl('/login');
  }
}
