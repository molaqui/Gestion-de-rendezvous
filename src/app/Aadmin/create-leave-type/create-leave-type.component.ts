import { Component } from '@angular/core';
@Component({
  selector: 'app-create-leave-type',
  templateUrl: './create-leave-type.component.html',
  styleUrls: ['./create-leave-type.component.css']
})
export class CreateLeaveTypeComponent {
  leaveTypeName: string = '';
  status: string = 'active';
  message: string | null = null;

  onSubmit() {
    this.message = 'Type de congé créé avec succès !';
    // Logique supplémentaire pour la soumission du formulaire
  }
}
