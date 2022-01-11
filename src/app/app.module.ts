import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from "angular-datatables";
import { SelectDropDownModule } from 'ngx-select-dropdown'

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { SignupComponent } from './signup/signup.component';
import { DashComponent } from './dash/dash.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/authguard.service';
import { AuthService } from './services/auth.service';
import { StuffService } from './services/dash.service';
import { UsersComponent } from './users/users.component';
import { UserViewComponent } from './user-view/user-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MedicamentComponent } from './medicament/medicament.component';
import { MedicamentService } from './services/medicament.service';
import { MedicamentdetailComponent } from './medicamentdetail/medicamentdetail.component';
import { EmployeComponent } from './employe/employe.component';
import { EmpService } from './services/employe.service';
import { DossiermedicalComponent } from './dossiermedical/dossiermedical.component';
import { DMService } from './services/dossiermedical.service';
import { DossiermedicaldetailComponent } from './dossiermedicaldetail/dossiermedicaldetail.component';
import { ListVisiteComponent } from './list-visite/list-visite.component';
import { ExamenComponent } from './examen/examen.component';
import { ExamenService } from './services/examen.service';
import { DropdownsearchComponent } from './dropdownsearch/dropdownsearch.component';
import { VisitesysComponent } from './visitesys/visitesys.component';
import { VisiteatComponent } from './visiteat/visiteat.component';

const appRoutes : Routes =[

  {path:'auth'  ,component: AuthComponent},
  {path:'signup',  component: SignupComponent},
  {path:'dash', canActivate: [AuthGuard], component: DashComponent},
  {path:'medicament', component: MedicamentComponent},
  {path:'medicamentdetail', component: MedicamentdetailComponent},
  {path:'emp', component: EmployeComponent},
  {path:'dm', component: DossiermedicalComponent},
  {path:'visite', component: ExamenComponent},
  {path:'AT', component: VisitesysComponent},
  {path:'sys', component: VisiteatComponent},


  {path:'detail', canActivate: [AuthGuard], component: UserViewComponent},
  {path:'', component: DashComponent},
  {path:'**', redirectTo:'/not-found'}
];

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    SignupComponent,
    DashComponent,
    UsersComponent,
    UserViewComponent,
    MedicamentComponent,
    MedicamentdetailComponent,
    EmployeComponent,
    DossiermedicalComponent,
    DossiermedicaldetailComponent,
    ListVisiteComponent,
    ExamenComponent,
    DropdownsearchComponent,
    VisitesysComponent,
    VisiteatComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    DataTablesModule,
    FormsModule,
    SelectDropDownModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],

  providers: [
    AuthService,
    AuthGuard,
    StuffService,
    MedicamentService,
    EmpService,
    DMService,
    ExamenService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
