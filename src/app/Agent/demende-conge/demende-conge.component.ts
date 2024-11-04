import { Component, OnInit } from '@angular/core';
import {Conge, LeaveStatus, LeaveType} from "../../models/Conge";
import {CongeService} from "../../services/conge.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";


@Component({
  selector: 'app-demande-conge',
  templateUrl: './demende-conge.component.html',
  styleUrls: ['./demende-conge.component.css']
})
export class DemendeCongeComponent implements OnInit {
  congeForm!: FormGroup;
  showPopup: boolean = false;

  constructor(
    private fb: FormBuilder,
    private congeService: CongeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.congeForm = this.fb.group({
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      type: ['ANNUAL', Validators.required],
      reason: ['']
    });
  }

  onSubmit(): void {
    if (this.congeForm.valid) {
      const formValues = this.congeForm.value;
      const conge: any = {
        employee: { id: Number(sessionStorage.getItem('employeeId')) }, // Associer l'employé à la demande
        approvedBy: { id: 1 }, // Admin par défaut, à remplacer par l'ID réel si nécessaire
        dateDebut: new Date(formValues.dateDebut),
        dateFin: new Date(formValues.dateFin),
        type: formValues.type,
        reason: formValues.reason,
        status: 'PENDING'
      };

      this.congeService.requestLeave(conge).subscribe(
        () => {
          console.log('Demande de congé envoyée avec succès');
          this.showPopup = true; // Afficher le popup
          setTimeout(() => this.closePopup(), 3000); // Fermer automatiquement le popup après 3 secondes
        },
        (error) => {
          console.error('Erreur lors de l\'envoi de la demande de congé', error);
        }
      );
    }
  }

  closePopup(): void {
    this.showPopup = false;
    this.router.navigate(['employee/dashboard']); // Rediriger après la fermeture du popup
  }
}
