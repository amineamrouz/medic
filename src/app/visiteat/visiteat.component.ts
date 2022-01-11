import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ExamenService } from '../services/examen.service';

@Component({
  selector: 'app-visiteat',
  templateUrl: './visiteat.component.html',
  styleUrls: ['./visiteat.component.scss']
})
export class VisiteatComponent implements OnInit {

  isAdd : boolean = false;

  medSubscription:Subscription;
  // meds: Medicament[]=[];
  // meddetails : MedicamentDetail[]=[];

  fg_examen_AT: FormGroup;
  id_med_detail:number;
  id_med:number;
  id:number ;

  constructor(
    private exmservice: ExamenService,
    private formBuilder : FormBuilder,
    private route: ActivatedRoute) { }

  ngOnInit(): void {


    //  this.id = this.route.snapshot.paramMap.get('id');
    // console.log("id is", this.id);

    this.route.params
      .subscribe(
        (params: any) => {
          this.id = +params['id'];
        }
      );

    this.innitForm();

  }


  innitForm() {

    this.fg_examen_AT = this.formBuilder.group({
      currentdate: [(new Date()).toISOString().substring(0,10)],
      poids: ['', Validators.required],
      taille: ['', Validators.required],
      correction: ['', Validators.required],
      og: ['', Validators.required],
      od: ['', Validators.required],
      couleur: ['', Validators.required],

      prothese: ['', Validators.required],
      ag: ['', Validators.required],
      ad: ['', Validators.required],
      TA: ['', Validators.required],
      pouls: ['', Validators.required],
      varices: ['', Validators.required],
      cap: ['', Validators.required],

      vems: ['', Validators.required],
      vemscv: ['', Validators.required],
      parois: ['', Validators.required],
      regime: ['', Validators.required],
      desc1: ['', Validators.required],
      regles: ['', Validators.required],
      desc2: ['', Validators.required],

      albumine: ['', Validators.required],
      sucre: ['', Validators.required],
      ganglions: ['', Validators.required],
      rate: ['', Validators.required],
      tremblement: ['', Validators.required],
      equilibre: ['', Validators.required],
      nervotime: ['', Validators.required],
      S_remberg: ['', Validators.required],
      reflexes_oc: ['', Validators.required],
      reflexes_tend: ['', Validators.required]
    });
  }


  onAddEmp() {

      console.log(this.fg_examen_AT.value);

  }
}
