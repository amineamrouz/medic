import { ThrowStmt } from '@angular/compiler';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject, Subscription } from 'rxjs';
import { Medicament } from '../models/Medicament.model';
import { MedicamentDetail } from '../models/medicamentdetail.model';
import { MedicamentService } from '../services/medicament.service';

@Component({
  selector: 'app-medicament',
  templateUrl: './medicament.component.html',
  styleUrls: ['./medicament.component.scss']
})
export class MedicamentComponent implements OnInit, AfterViewInit, OnDestroy {

  isAdd: boolean=false;

  medSubscription:Subscription[]=[] ;
  medSubscription2:Subscription;
  meds: Medicament[]=[];
  meddetails : MedicamentDetail[]=[];
  dtOptions: DataTables.Settings = {
    destroy: true,
    searching: true,
    columnDefs: [
      {className: "dt-head-center dt-center", targets: "_all"},
      { orderable: false, targets: 5 }
    ],
    order: [[ 1, "asc" ]]
  };
  dtTrigger: Subject<any> = new Subject<any>();
  id :number;

  fg_addmedicament: FormGroup;
  id_med:number;

  constructor(private medservice : MedicamentService,
    private formBuilder : FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    //getmed
    this.onFetch();
    this.medSubscription.push(this.medservice.med$.subscribe(
      (med: Medicament[])=>{
        this.meds=med;
        this.dtTrigger.next();
      }
    ))

    this.medservice.emitMedicament();
    //getmeddetail
    //add med
    this.innitForm();
  }


  onFetch(){
    this.medservice.getMedicament();
  }

  onFetchDetail(id:number){
    this.medservice.getMedicamentDetail(id);
  }

  // getQte(id : number){
  //   this.onFetchDetail(id);
  //   console.log(this.meddetails[id])
  //   return this.meddetails.length;
  // }

  onDetail(id:number){
    this.medSubscription.push(this.medservice.meddetail$.subscribe(
      (med: MedicamentDetail[])=>{
        this.meddetails=med;
        this.dtTrigger.next();
      }
    ))
    this.medservice.emitMedicamentdetail();
      console.log("id selected ", id);
      this.medservice.getMedicamentDetail(id);
      this.router.navigate(['/medicamentdetail']);
  }

  ///////////// ajouter medicament
  innitForm(){
    this.fg_addmedicament= this.formBuilder.group({
      medicament: ['', Validators.required],
      nom_commercial: ['', Validators.required],
      presentation: ['', Validators.required]
    });
  }


  onAdd(){
    if (this.isAdd == false){
      return this.isAdd=true;
    }
    else  if (this.isAdd == true){
      return this.isAdd=false;
    }
    else return;
  }
  onAddMed(){
    const formValue = this.fg_addmedicament.value;
    const newMed = new Medicament (
      this.id_med=this.getRandomInt(100,10000),
      formValue['medicament'],
      formValue['nom_commercial'],
      formValue['presentation'],
      formValue['Qte'] = 0
    );
    this.medservice.addMedicament(newMed);
    this.onSave();
    this.rerender();
    this.onAdd();
  }
  /// Delete
  onDelete(id: number){
    if(confirm("Are you sure to delete this ")){
    this.medservice.deleteMed(id);
    this.dtTrigger.next();
    this.rerender();}
  }


  //// refresh
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  ngAfterViewInit(): void {

  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.onFetch()
    });
  }

  /////
  onSave(){
    this.medservice.saveMedsToServer();
  }

  getRandomInt(min : number, max :number) : number{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  onDes(){}
  ngOnDestroy() {
    this.medSubscription.forEach( subscription => {
      subscription.unsubscribe();
  })
}



}
