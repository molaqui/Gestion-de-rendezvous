import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./Aadmin/dashboard/dashboard.component";
import {AddEmployeeComponent} from "./Aadmin/add-employee/add-employee.component";
import {CreateLeaveTypeComponent} from "./Aadmin/create-leave-type/create-leave-type.component";
import {EditAdminComponent} from "./Aadmin/edit-admin/edit-admin.component";
import {ListCongesComponent} from "./Aadmin/list-conges/list-conges.component";
import {ListRendezvousComponent} from "./Aadmin/list-rendezvous/list-rendezvous.component";
import {GestionSalaireComponent} from "./Aadmin/gestion-salaire/gestion-salaire.component";
import {LoginComponent} from "./login/login.component";
import {AdminComponent} from "./Aadmin/admin/admin.component";
import {EmployeeTemplateComponent} from "./Agent/employee-template/employee-template.component";
import {EmpDashboardComponent} from "./Agent/emp-dashboard/emp-dashboard.component";
import {ChangeEmpPasswordComponent} from "./Agent/change-emp-password/change-emp-password.component";

import {AddRendezvousComponent} from "./Agent/add-rendezvous/add-rendezvous.component";
import {UpdateRendezvousComponent} from "./Agent/update-rendezvous/update-rendezvous.component";
import {DemendeCongeComponent} from "./Agent/demende-conge/demende-conge.component";
import {EmpCallComponent} from "./Agent/emp-call/emp-call.component";
import {RendezvousManqueComponent} from "./Agent/rendezvous-manque/rendezvous-manque.component";
import {ChatbotComponent} from "./Agent/chatbot/chatbot.component";
import {ViewEmployeeComponent} from "./Aadmin/view-employee/view-employee.component";

const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path:"",redirectTo:"/login",pathMatch:"full"},

  {path:"admin",component:AdminComponent , children :[
      {path:"dashboard" ,component:DashboardComponent},
      {path:"add-agent",component:AddEmployeeComponent},
      {path:"create-leave",component:CreateLeaveTypeComponent},
      {path:"edit-admin/:id",component:EditAdminComponent},
      {path:"list-conge",component:ListCongesComponent},
      {path:"rendez-vous",component:ListRendezvousComponent},
      {path:"salaire",component:GestionSalaireComponent},
      {path:"view/:id",component:ViewEmployeeComponent}
    ]},
  {path:"employee",component:EmployeeTemplateComponent , children :[
      {path:"dashboard",component:EmpDashboardComponent},
      {path:"update-password",component:ChangeEmpPasswordComponent},
      {path:"demende-conge",component:DemendeCongeComponent},
      {path:"ajouter-rendezvous",component:AddRendezvousComponent},
      {path:"update-rendezvous/:id",component:UpdateRendezvousComponent},
      {path:"emp-call",component:EmpCallComponent},
      {path:"manque",component:RendezvousManqueComponent},
      {path:"chatbot",component:ChatbotComponent},
      {path:"",redirectTo:"http://localhost:4200/employee/dashboard",pathMatch:"full"},

    ]},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
