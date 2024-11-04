import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RendezvousService} from "../../services/rendezvous.service";
import {ActivatedRoute, Router} from "@angular/router";
import {RendezVous} from "../../models/RendezVous";

@Component({
  selector: 'app-update-rendezvous',
  templateUrl: './update-rendezvous.component.html',
  styleUrls: ['./update-rendezvous.component.css']
})
export class UpdateRendezvousComponent implements OnInit {
  rdvForm!: FormGroup;
  isUpdate: boolean = false;
  rendezVousId!: number;
 msg!:String;
 isOk:boolean=false;
  constructor(
    private fb: FormBuilder,
    private rendezvousService: RendezvousService,
    private route: ActivatedRoute,
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

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isUpdate = true;
        this.rendezVousId = params['id'];
        this.getRendezVousById(this.rendezVousId);
      }
    });
  }

  getRendezVousById(id: number): void {
    this.rendezvousService.getRendezVousById(id).subscribe(
      (data: RendezVous) => {

        this.rdvForm.patchValue(data);
      },
      (error) => {
        console.error('Erreur lors de la récupération du rendez-vous:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.rdvForm.valid) {
      const rendezVous: RendezVous = this.rdvForm.value;

      if (this.isUpdate) {
        this.rendezvousService.updateRendezVous(this.rendezVousId, rendezVous).subscribe(
          () => {
            this.isOk=true;

            this.msg="Rendez-vous mis à jour avec succès";
            this.router.navigate(['employee/dashboard']);
          },
          (error) => {
            console.error('Erreur lors de la mise à jour du rendez-vous:', error);
          }
        );
      } else {
        this.rendezvousService.addRendezVous(rendezVous).subscribe(
          () => {
            console.log('Rendez-vous ajouté avec succès');
            this.router.navigate(['employee/dashboard']);
          },
          (error) => {
            console.error('Erreur lors de l\'ajout du rendez-vous:', error);
          }
        );
      }
    }
  }

}
