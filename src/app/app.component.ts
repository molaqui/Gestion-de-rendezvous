import { Component, OnInit } from '@angular/core';
import {AdminService} from "./services/admin.service";
import {CongeService} from "./services/conge.service";
import {Conge} from "./models/Conge";
import {Router, RouterLink} from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Ensure the correct path to your CSS file
})
export class AppComponent implements OnInit {
  title = 'Admin';
  image: string | null= null;
  nom!: string;
  prenom!: string;
  email!: string;
  notificationCount!:number; // Example notification count
  showNotificationPopup: boolean = false;
  pendingLeaves: Conge[] = []; // Store pending leaves
  showNotificationDropdown: boolean = false; // Dropdown visibility
  constructor(private adminService: AdminService,private congeservice:CongeService, private router: Router) { } // Inject the service

  ngOnInit() {
    this.image = ''; // Initialize the image property
    this.nom = ''; // Initialize the nom property
    this.prenom = ''; // Initialize the prenom property
    this.email = ''; // Initialize the email property
    this.initSidebar();
    this.getAdminDetails(); // Fetch the admin details
    this.getNotificationCount(); // Fetch notification count
    this.loadPendingLeaves();
  }

  getAdminDetails() {
    const adminId = 1; // Use dynamic ID if necessary
    this.adminService.getAdminById(adminId).subscribe(
      data => {
        if (data) {
          this.nom = data.nom;
          this.prenom = data.prenom;
          this.email = data.email;
          this.image = data.image ? `data:image/jpeg;base64,${data.image}` : null;
        } else {
          console.log("No admin found with this ID.");
        }
      },
      error => {
        console.error("Error fetching admin details:", error);
      }
    );
  }

  initSidebar() {
    document.addEventListener('DOMContentLoaded', () => {
      let arrows = document.querySelectorAll('.arrow');
      arrows.forEach(arrow => {
        arrow.addEventListener('click', (e) => {
          let arrowParent = (e.target as HTMLElement).parentElement?.parentElement; // selecting main parent of arrow
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
// get notification of pending conge
  getNotificationCount() {
    const status = 'PENDING'; // Example status, adjust as necessary
    this.congeservice.countLeavesByStatus(status).subscribe(
      count => this.notificationCount = count,
      error => console.error('Error fetching notification count:', error)
    );
  }

  loadPendingLeaves(): void {
    const status = 'PENDING'; // Example status, adjust as necessary
    this.congeservice.getCongeByStatus(status).subscribe(
      leaves => this.pendingLeaves = leaves,
      error => console.error('Error fetching pending leaves:', error)
    );
  }
  // pour affiche la dropdown que le clique sur l'icon de notification
  toggleNotificationDropdown(): void {
    this.showNotificationDropdown = !this.showNotificationDropdown;
  }

  viewMoreDetails(): void {
    this.router.navigate(['/list-conge']); // Navigate to list-conge
  }


}
