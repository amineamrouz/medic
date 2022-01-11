import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject, Subscription } from 'rxjs';
import { Medicament } from '../models/Medicament.model';
import { MedicamentDetail } from '../models/medicamentdetail.model';
import { MedicamentService } from '../services/medicament.service';

@Component({
  selector: 'app-medicamentdetail',
  templateUrl: './medicamentdetail.component.html',
  styleUrls: ['./medicamentdetail.component.scss']
})
export class MedicamentdetailComponent implements OnInit, AfterViewInit, OnDestroy  {

  isAdd : boolean = false;

  medSubscription:Subscription;
  meds: Medicament[]=[];
  meddetails : MedicamentDetail[]=[];
  dtOptions: DataTables.Settings = {
    destroy: true,
    searching: true,
    columnDefs: [
      {className: "dt-head-center dt-center", targets: "_all"},
      { orderable: false, targets: 0 },
      { orderable: false, targets: 2 },
      { orderable: false, targets: 3 }
    ],
    orderFixed: [[ 1, "desc" ]]
  };
  dtTrigger: Subject<any> = new Subject<any>();

  fg_addmeddetail: FormGroup;
  id_med_detail:number;
  id_med:number;

  constructor(private medservice: MedicamentService,
    private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.medSubscription = this.medservice.meddetail$.subscribe(
      (med: MedicamentDetail[])=>{
        this.meddetails=med;
        this.dtTrigger.next();
      }
    );
    this.medservice.emitMedicamentdetail();
    this.innitForm();
  }
  onDelete(id_med:number, id_med_detail:number){
    if(confirm("Are you sure to delete this ")){
    this.medservice.deleteMedDetail(id_med,id_med_detail);
    this.dtTrigger.next();
    this.rerender();}
  }

///////////add med detail

onAdd(){
  if (this.isAdd == false){
    return this.isAdd=true;
  }
  else  if (this.isAdd == true){
    return this.isAdd=false;
  }
  else return;
}
onAddMedDetail(){
  const formValue = this.fg_addmeddetail.value;
  const newMedDetail = new MedicamentDetail (
    this.id_med_detail=this.getRandomInt(100,10000),
    formValue['nlot'],
    formValue['date_peremption'],
    formValue['date_entree'],
    this.id_med = this.medservice.id_med
  );
  this.medservice.addMedDetail(newMedDetail);
  this.onSave();
  this.rerender();
  this.onAdd();

}
onSave(){
  this.medservice.saveMedDetailsToServer();
}

getRandomInt(min : number, max :number) : number{
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
innitForm(){
  this.fg_addmeddetail= this.formBuilder.group({
    nlot: ['', Validators.required],
    date_peremption: ['', Validators.required],
    date_entree: ['', Validators.required]
  });
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
      this.medservice.getMedicamentDetail(this.medservice.id_med);

    });
  }

  /////
  ngOnDestroy() {
    if(this.medSubscription){
    this.medSubscription.unsubscribe();
  }
}
/// couleur date prémption
getcolor(date_premption: Date){

  if (this.getDifferenceInDays(date_premption) > 0) {
    return ('#FF7F7F');
  } else if (this.getDifferenceInDays(date_premption) < 0 && this.getDifferenceInDays(date_premption) > -90) {
    return('#FFFF66');
  } else return('none');


}
getDifferenceInDays(dateSent: Date) {
  let currentDate = new Date();
  dateSent = new Date(dateSent);
  return Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate()) ) /(1000 * 60 * 60 * 24));
}


}
