import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.css']
})
export class EditAdminComponent implements OnInit {
  id!: number;
  nom!: string;
  prenom!: string;
  email!: string;
  image: string | null = null; // Changer en string pour contenir la chaîne base64
  motDePass!: string;
  adresse!: string;
  matricule!: number;
  imageInsererAuDB!:string | null;
 //visiblite de password
  isPasswordVisible = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private personneService: AdminService
  ) {}
  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']; // Remplacer ceci par un ID dynamique si nécessaire
    this.personneService.getAdminById(this.id).subscribe(
      data => {
        if (data) {
          this.nom = data.nom;
          this.prenom = data.prenom;
          this.email = data.email;
          this.motDePass = data.motDePass;
          this.adresse = data.adresse;
          this.matricule = data.matricule;
          if (data.image) {
            this.image = data.image;
            this.imageInsererAuDB=this.image;
          }

        } else {
          console.log("Aucun admin trouvé avec cet ID.");
        }
      },
      error => {
        console.error("Erreur lors de la récupération des données de l'admin:", error);
        console.log("Aucun admin trouvé avec cet ID.");
      }
    );
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

  modifierAdmin() {

    this.personneService.modifieradmin(
      this.id, this.nom, this.prenom, this.email, this.imageInsererAuDB, this.motDePass, this.adresse, this.matricule
    ).subscribe(response => {
      alert("Votre informations est modifiée avec succès");
    });
  }
}
