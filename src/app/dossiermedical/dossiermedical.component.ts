import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { DossierMedical } from '../models/dm.model';
import { DMService } from '../services/dossiermedical.service';

@Component({
  selector: 'app-dossiermedical',
  templateUrl: './dossiermedical.component.html',
  styleUrls: ['./dossiermedical.component.scss']
})
export class DossiermedicalComponent implements OnInit {

  isAdd: boolean=false;
  currentDate = new Date();
  dtOptions: DataTables.Settings = {
    destroy: true,
    searching: true
  };
  dtTrigger: Subject<any> = new Subject<any>();
  id :number;

  dms : DossierMedical[]=[];

  dmSubscription: Subscription[]=[];

  fg_add_dm: FormGroup;

  constructor(private dmservice : DMService,
    private formBuilder: FormBuilder,
    private router: Router) { }


  ngOnInit(): void {
    this.dmSubscription.push(this.dmservice.dmbyid$.subscribe(
      (dm: DossierMedical[])=>{
        this.dms=dm;
        this.dtTrigger.next();
      }
    ));
    this.dmservice.emitDM();
    this.innitForm();

    this.getDMD(this.dms[0].id_dm);


  }
  innitForm(){
    this.fg_add_dm= this.formBuilder.group({
      num_dm: ['', Validators.required],
      entreprise: ['', Validators.required]
    });
  }
  onSubmitFormadddm(){
    const formValue = this.fg_add_dm.value;
    const newdm = new DossierMedical (
      formValue['num_dm'],
      formValue['num_dm'],
      this.currentDate,
      "Admin",
      formValue['entreprise'],
      this.dmservice.id_emp
    );
    this.dmservice.addDM(newdm);
    this.onSave();
    this.router.navigate(['/dm'])
  }
  onSave(){
    this.dmservice.saveDMToServer();
  }
   getDMD(id:number){
    this.dmservice.getAHFById(id);
    this.dmservice.getVacById(id);
    this.dmservice.getFSPById(id);
    this.dmservice.getvisitebyid(id);
  }


}
