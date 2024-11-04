import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RendezvousService} from "../../services/rendezvous.service";
import {EmployeeService} from "../../services/employee.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-add-rendezvous',
  templateUrl: './add-rendezvous.component.html',
  styleUrls: ['./add-rendezvous.component.css']
})
export class AddRendezvousComponent implements OnInit {
  rdvForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private rendezVousService: RendezvousService,
    private employeeService: EmployeeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.rdvForm = this.fb.group({
      nomDeClient: ['', Validators.required],
      prenomDeClient: ['', Validators.required],
      tel: ['', Validators.required],
      nomDEntreprise: [''],
      adresse: [''],
      ville: [''],
      zip: [''],
      numeroFiscale: [''],
      commentaire: [''],
      dateDeRendezVous: ['', Validators.required],
      type: ['ISO_9000', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.rdvForm.valid) {
      const employeeId = Number(sessionStorage.getItem('employeeId'));

      const rendezVous = {
        ...this.rdvForm.value,
        employee: { id: employeeId },
        status: 'EN_COURS'
      };

      this.rendezVousService.addRendezVous(rendezVous).subscribe(
        response => {

          alert('Rendez-vous ajouté avec succès');
          this.resetForm();
          this.router.navigateByUrl("employee/dashboard");
        },
        error => {
          console.error('Erreur lors de l\'ajout du rendez-vous', error);
        }
      );
    }
  }
  resetForm(): void {
    this.rdvForm.reset({
      nomDeClient: '',
      prenomDeClient: '',
      tel: '',
      nomDEntreprise: '',
      adresse: '',
      ville: '',
      zip: '',
      numeroFiscale: '',
      commentaire: '',
      dateDeRendezVous: '',
      type: 'ISO_9000'
    });
  }
}
