import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './Aadmin/dashboard/dashboard.component';
import { AddEmployeeComponent } from './Aadmin/add-employee/add-employee.component';
import { EditEmployeeComponent } from './Aadmin/edit-employee/edit-employee.component';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CreateLeaveTypeComponent } from './Aadmin/create-leave-type/create-leave-type.component';

import { EditAdminComponent } from './Aadmin/edit-admin/edit-admin.component';
import { ListCongesComponent } from './Aadmin/list-conges/list-conges.component';


import { ConfirmDialogComponent } from './Aadmin/confirm-dialog/confirm-dialog.component';
import { ListRendezvousComponent } from './Aadmin/list-rendezvous/list-rendezvous.component';
import { GestionSalaireComponent } from './Aadmin/gestion-salaire/gestion-salaire.component';
import {AdminService} from "./services/admin.service";
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './Aadmin/admin/admin.component';
import {HttpClientModule} from "@angular/common/http";
import { EmployeeTemplateComponent } from './Agent/employee-template/employee-template.component';
import { EmpDashboardComponent } from './Agent/emp-dashboard/emp-dashboard.component';

import {RendezvousService} from "./services/rendezvous.service";
import { ChangeEmpPasswordComponent } from './Agent/change-emp-password/change-emp-password.component';
import { DemendeCongeComponent } from './Agent/demende-conge/demende-conge.component';
import { AddRendezvousComponent } from './Agent/add-rendezvous/add-rendezvous.component';
import { UpdateRendezvousComponent } from './Agent/update-rendezvous/update-rendezvous.component';
import { EmpCallComponent } from './Agent/emp-call/emp-call.component';
import { RendezvousManqueComponent } from './Agent/rendezvous-manque/rendezvous-manque.component';
import { ChatbotComponent } from './Agent/chatbot/chatbot.component';
import { ViewEmployeeComponent } from './Aadmin/view-employee/view-employee.component';




@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AddEmployeeComponent,
    EditEmployeeComponent,
    CreateLeaveTypeComponent,
    EditAdminComponent,
    ListCongesComponent,
    ConfirmDialogComponent,
    ListRendezvousComponent,
    GestionSalaireComponent,
    LoginComponent,
    AdminComponent,
    EmployeeTemplateComponent,
    EmpDashboardComponent,
    ChangeEmpPasswordComponent,
    DemendeCongeComponent,
    AddRendezvousComponent,
    UpdateRendezvousComponent,
    EmpCallComponent,
    RendezvousManqueComponent,
    ChatbotComponent,
    ViewEmployeeComponent,

  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,

    ],
  providers: [AdminService,RendezvousService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }






