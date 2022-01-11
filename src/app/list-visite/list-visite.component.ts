import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject, Subscription } from 'rxjs';
import { DossierMedical } from '../models/dm.model';
import { Visite } from '../models/visite.model';
import { DMService } from '../services/dossiermedical.service';

@Component({
  selector: 'app-list-visite',
  templateUrl: './list-visite.component.html',
  styleUrls: ['./list-visite.component.scss']
})
export class ListVisiteComponent implements OnInit {

  isAdd: boolean=false;
  dtOptions: DataTables.Settings = {
    destroy: true,
    searching: true,
    columnDefs: [
      {className: "dt-head-center dt-center", targets: "_all"}
    ],
  };
  dtTrigger: Subject<any> = new Subject<any>();
  id :number;
  visites : Visite[]=[];

  VisiteSubscription: Subscription[]=[];

  fg_list_visite: FormGroup;
  dmSubscription:Subscription[]=[];
  dms : DossierMedical[]=[];

  constructor(private dmservice: DMService,
    private formBuilder : FormBuilder,
    private router: Router, ) { }

  ngOnInit(): void {
    //this.onFetch();

    this.VisiteSubscription.push(this.dmservice.visitebyid$.subscribe(
      (visite: Visite[])=>{
        this.visites=visite;
        this.dtTrigger.next();
      }
    ));
    //this.onFetch();


    this.dmservice.emitvisitebyid();
    console.log("look her",this.visites);
    //this.onFetch(this.dms[0].id_dm);

    this.innitForm();
    this.rerender();

  }
   // get emp
   onFetch(){
    this.dmservice.getvisite();
  }

  innitForm(){
    this.fg_list_visite= this.formBuilder.group({

      date_visite: ['', Validators.required],
      docteur: ['', Validators.required],
      type_visite: ['', Validators.required],
      diagnostic: ['', Validators.required]
    });
  }

  //  button de ajouter
  onAdd(){
    if (this.isAdd == false){
      return this.isAdd=true;
    }
    else  if (this.isAdd == true){
      return this.isAdd=false;
    }
    else return;
  }
  onExamen(typevisit: string){

    // this.medSubscription.push(this.medservice.meddetail$.subscribe(
    //   (med: MedicamentDetail[])=>{
    //     this.meddetails=med;
    //   }
    // ))
    // this.medservice.emitMedicamentdetail();
    //   console.log("id selected ", id);
    //   this.medservice.getMedicamentDetail(id);
      if(typevisit === "embauche"){
        console.log('voila1',typevisit);
    this.router.navigate(['/visite',{id:this.dmservice.id_dm_visite}]);
  }
  else if(typevisit=== "Systimatique"){
    console.log('voila2',typevisit);
    this.router.navigate(['/sys',{id:this.dmservice.id_dm_visite}]);
  }else if (typevisit==="AT"){
    this.router.navigate(['/AT',{id:this.dmservice.id_dm_visite}]);
  }
  else if(typevisit==="Spontannée"){
    this.router.navigate(['/visitee',{id:this.dmservice.id_dm_visite}]);
  }
  else if(typevisit=== "Reprise"){
    this.router.navigate(['/visite',{id:this.dmservice.id_dm_visite}]);
  }
  else {
    console.log('voila3',typevisit);
  }


  }

  // Delete EMP
  onDelete(id: number){
    if(confirm("Are you sure to delete this ")){
    this.dmservice.deletevisite(id);
    this.rerender();
  }
  }

    // add Visite
    onAddVisite(){
      const formValue = this.fg_list_visite.value;
      const newvisite = new Visite (
        0,
        formValue['date_visite'],
        formValue['docteur'],
        formValue['type_visite'],
        formValue['diagnostic'],
        this.dmservice.id_dm_visite
      );

      this.dmservice.addVisite(newvisite);
      this.onSave();
      this.rerender();
      this.onAdd();
    }
    onSave(){
      this.dmservice.saveVisiteToServer();
    }

    // render
    //refresh data table
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  ngAfterViewInit(): void {

  }


  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      //this.onFetch()
      this.dmservice.getvisitebyid(this.dmservice.id_dm_visite);
    });
  }


}
