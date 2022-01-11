import { HttpErrorResponse } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { Auditif } from '../models/auditif.model';
import { Cardio } from '../models/cardiovasculaire.model';
import { Digestid } from '../models/digestif.model';
import { Genial } from '../models/genial.model';
import { Hemato } from '../models/hemato_reticul.model';
import { Moteur } from '../models/moteur.model';
import { Neuro } from '../models/neuro.model';
import { Oculaire } from '../models/oculaire.model';
import { respiratoire } from '../models/respiratoire.model';
import { Urinaire } from '../models/urinaire.model';
import { DMService } from '../services/dossiermedical.service';
import { ExamenService } from '../services/examen.service';

@Component({
  selector: 'app-examen',
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.scss']
})
export class ExamenComponent implements OnInit {

  isAdd : boolean = false;

  medSubscription:Subscription;
  // meds: Medicament[]=[];
  // meddetails : MedicamentDetail[]=[];

  fg_examen: FormGroup;
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
    this.fg_examen = this.formBuilder.group({
      desc3: ['', Validators.required],
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
    const formValue = this.fg_examen.value;
    const newmoteur = new Moteur(
      0,
      formValue['desc3'],
      formValue['poids'],
      formValue['taille'],
      this.id
    );

    //this.empService.addEmp(newemp);
    const newoculaire = new Oculaire(
      0,
      formValue['og'],
      formValue['od'],
      formValue['correction'],
      formValue['couleur'],
      this.id
    );
    //
    const newoaud = new Auditif(
      0,
      formValue['ag'],
      formValue['ad'],
      formValue['prothese'],

      this.id
    );
    //
    const newcardio = new Cardio(
      0,
      formValue['pouls'],
      formValue['TA'],
      formValue['varices'],
      this.id
    );
    //
    const newres = new respiratoire(
      0,
      formValue['cap'],
      formValue['vems'],
      formValue['vemscv'],
      this.id
    );
    //
    const newdig = new Digestid(
      0,
      formValue['parois'],
      formValue['regime'],
      this.id
    );
    //
    const newgenial = new Genial(
      0,
      formValue['desc1'],
      formValue['regles'],
      this.id
    );
    //
    const newurinaire = new Urinaire(
      0,
      formValue['desc2'],
      formValue['sucre'],

      formValue['albumine'],
      this.id
    );


    //
    const newhemato = new Hemato(
      0,
      formValue['ganglions'],
      formValue['rate'],
      this.id
    );
    //
    const newneuro = new Neuro(
      0,
      formValue['tremblement'],
      formValue['equilibre'],
      formValue['nervotime'],
      formValue['S_remberg'],
      formValue['reflexes_oc'],
      formValue['reflexes_tend'],
      this.id
    );
    //

    this.postMoteur(newmoteur,newoculaire,newoaud,newcardio,newres,newdig,newgenial,
      newurinaire, newhemato,newneuro);

  }
   // creat moteur
    //// observable method
    observableCountries: Observable<Moteur[]>;
    moteurs: Moteur[] = [];
    oculaires: Moteur[] = [];
    auditifs: Moteur[] = [];
    cardios: Cardio[] = [];
    ress: respiratoire[] = [];
    digs: respiratoire[] = [];
    gens: Genial[] = [];
    uris: Urinaire[] = [];
    hems: Hemato[] = [];
    neus: Neuro[] = [];
    errorMessage = '';
    cols: any[];
   postMoteur(moteur:Moteur, occ: Oculaire, aud: Auditif, car: Cardio,
    res:respiratoire, dig: Digestid, gen: Genial, uri: Urinaire,
    hem: Hemato, neu: Neuro){
    this.exmservice.addMoteur(moteur).subscribe(
      moteur => {
        console.log(moteur);
        this.moteurs = [...this.moteurs];
      }
  );
    this.exmservice.addOculaire(occ).subscribe(
      occ => {
        console.log(occ);
        this.oculaires = [...this.oculaires];
      }
    );
    this.exmservice.addAuditif(aud).subscribe(
      aud => {
        console.log(aud);
        this.auditifs = [...this.auditifs];
      }
    );
    this.exmservice.addCardio(car).subscribe(
      car => {
        console.log(aud);
        this.cardios = [...this.cardios];
      }
    );
    this.exmservice.addRes(res).subscribe(
      res => {
        console.log(res);
        this.ress = [...this.ress];
      }
    );
    this.exmservice.addDigestif(dig).subscribe(
      dig => {
        console.log(dig);
        this.digs = [...this.digs];
      }
    );
    this.exmservice.addGenital(gen).subscribe(
      gen => {
        console.log(gen);
        this.gens = [...this.gens];
      }
    );
    this.exmservice.addUrinaire(uri).subscribe(
      uri => {
        console.log(uri);
        this.uris = [...this.uris];
      }
    );
    this.exmservice.addHemato(hem).subscribe(
      hem => {
        console.log(hem);
        this.hems = [...this.hems];
      }
    );
    this.exmservice.addNeuro(neu).subscribe(
      neu => {
        console.log(neu);
        this.neus = [...this.neus];
      }
    );
  }

  onDelete(id_med:number, id_med_detail:number){
    if(confirm("Are you sure to delete this ")){
    //this.medservice.deleteMedDetail(id_med,id_med_detail);
    //this.rerender();}
  }
}
onSubmitFormadddmdetail(){

}
///////////add med detail


// onAddMedDetail(){
//   const formValue = this.fg_addmeddetail.value;
//   const newMedDetail = new MedicamentDetail (
//     this.id_med_detail="",
//     formValue['nlot'],
//     formValue['date_peremption'],
//     formValue['date_entree'],
//     this.id_med = this.medservice.id_med
//   );
//   this.medservice.addMedDetail(newMedDetail);
//   this.onSave();
//   //this.rerender();
//   //this.onAdd();

// }
onSave(){
 // this.medservice.saveMedDetailsToServer();
}
onAddMedDetail(){

}




  /////
  ngOnDestroy() {
    if(this.medSubscription){
    this.medSubscription.unsubscribe();
  }
}



}
