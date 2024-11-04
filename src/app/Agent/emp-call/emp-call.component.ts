import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CallService} from "../../services/call.service";

@Component({
  selector: 'app-emp-call',
  templateUrl: './emp-call.component.html',
  styleUrls: ['./emp-call.component.css']
})
export class EmpCallComponent implements OnInit {
  phoneNumber: string = '';
  callDuration: string = '00:00';
  callTimer: any;
  seconds: number = 0;
  minutes: number = 0;
  showPopup: boolean = false;
  toastMessage: string = '';
  toastNumber: string = '';

  constructor(private route: ActivatedRoute, private callService: CallService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.phoneNumber = params['tel'] || '';
    });
  }

  appendNumber(num: string): void {
    this.phoneNumber += num;
  }

  eraseLastDigit(): void {
    this.phoneNumber = this.phoneNumber.slice(0, -1);
  }

  startCallTimer(): void {
    this.callTimer = setInterval(() => {
      this.seconds++;
      if (this.seconds === 60) {
        this.seconds = 0;
        this.minutes++;
      }
      this.callDuration = `${this.pad(this.minutes)}:${this.pad(this.seconds)}`;
    }, 1000);
  }

  stopCallTimer(): void {
    clearInterval(this.callTimer);
  }

  resetCallTimer(): void {
    this.seconds = 0;
    this.minutes = 0;
    this.callDuration = '00:00';
  }

  pad(num: number): string {
    return num.toString().padStart(2, '0');
  }

  call(): void {
    if (this.phoneNumber) {
      this.toastNumber = `Numéro: ${this.phoneNumber}`;
      this.toastMessage = 'Appel en cours...';
      this.showPopup = true;
      this.startCallTimer();

      // Appel au service pour initier l'appel avec Twilio
      this.callService.makeCall().subscribe(
        (response: string) => {
          console.log(response);
        },
        error => {
          console.error('Erreur lors de l\'initiation de l\'appel', error);
        }
      );
    } else {
      alert('Veuillez composer un numéro.');
    }
  }

  hangup(): void {
    this.toastMessage = 'Appel terminé.';
    this.stopCallTimer();
    setTimeout(() => {
      this.showPopup = false;
      this.resetCallTimer();
    }, 2000);
  }

  logout(): void {
    // Logique de déconnexion
  }

  closePopup(): void {
    this.showPopup = false;
  }
}
