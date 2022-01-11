import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { AHF } from '../models/ahf.model';
import { DossierMedical } from '../models/dm.model';
import { FSP } from '../models/fsp.model';
import { Vaccin } from '../models/vaccin.model';
import { DMService } from '../services/dossiermedical.service';

@Component({
  selector: 'app-dossiermedicaldetail',
  templateUrl: './dossiermedicaldetail.component.html',
  styleUrls: ['./dossiermedicaldetail.component.scss']
})
export class DossiermedicaldetailComponent implements OnInit {


  isAdd: boolean=false;
  currentDate = new Date();
  dtOptions: DataTables.Settings = {
    destroy: true,
    searching: true
  };
  dtTrigger: Subject<any> = new Subject<any>();
  id :number;

  dms : DossierMedical[]=[];
  dm : DossierMedical[]=[];

  dmSubscription: Subscription[]=[];

  ahfs : AHF[]=[];
  vacs : Vaccin[]=[];
  fsps : FSP[]=[];
  ahfSubscription: Subscription[]=[];
  vacSubscription: Subscription[]=[];
  fspSubscription: Subscription[]=[];

  id_dmd:number;

  fg_add_dm_detail: FormGroup;

  constructor(private dmservice : DMService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {

    //this.getDMD(this.dmservice.id_dm);

    this.dmSubscription.push(this.dmservice.dmbyid$.subscribe(
      (dm: DossierMedical[])=>{
        this.dms=dm;
        this.dtTrigger.next();
      }
    ));


    this.dmservice.emitDMbyid();

    console.log("id hna",this.dmservice.id_dm_byid)
    this.getDMD(this.dms[0].id_dm);
    //this.dmservice.getvisitebyid(this.dms[0].id_dm);

    this.ahfSubscription.push(this.dmservice.ahfbyid$.subscribe(
      (ahf: AHF[])=>{
        this.ahfs=ahf;
        this.dtTrigger.next();
      }
    ));

    this.dmservice.emitahfbyid();
    this.vacSubscription.push(this.dmservice.vacbyid$.subscribe(
      (vac: Vaccin[])=>{
        this.vacs=vac;
        this.dtTrigger.next();
      }
    ));
    this.dmservice.emitvacbyid();
    this.fspSubscription.push(this.dmservice.fspbyid$.subscribe(
      (fsp: FSP[])=>{
        this.fsps=fsp;
        this.dtTrigger.next();
      }
    ));
    this.dmservice.emitfspbyid();
    this.dmservice.emitDM();
    this.innitForm();


  }


  innitForm(){
    this.fg_add_dm_detail= this.formBuilder.group({
      conjoint: ['', Validators.required],
      nom_pere: ['', Validators.required],
      nom_mere: ['', Validators.required],
      nb_enfants: ['', Validators.required],
      nb_freres: ['', Validators.required],
      nb_soeurs: ['', Validators.required],
      BCG: ['', Validators.required],
      diphterie_tetanos: ['', Validators.required],
      TAB: ['', Validators.required],
      polimoyelite: ['', Validators.required],
      autres: ['', Validators.required],
      Formation: ['', Validators.required],
      activite_professionnelle: ['', Validators.required],

    });
  }


  onSave(){
    this.dmservice.saveAHFToServer();
    this.dmservice.saveVacToServer();
    this.dmservice.saveFSPToServer();
  }

  onSubmitFormadddmdetail(){
    const formValue = this.fg_add_dm_detail.value;
    const newahf = new AHF (
      0,
      formValue['conjoint'],
      formValue['nom_pere'],
      formValue['nom_mere'],
      formValue['nb_enfants'],
      formValue['nb_freres'],
      formValue['nb_soeurs'],
      this.dmservice.id_dm
    );
    const newvaccin = new Vaccin (
      0,
      formValue['BCG'],
      formValue['diphterie_tetanos'],
      formValue['TAB'],
      formValue['polimoyelite'],
      formValue['autres'],
      this.dmservice.id_dm
    );
    const newfsp = new FSP (
      0,
      formValue['Formation'],
      formValue['activite_professionnelle'],
      this.dmservice.id_dm
    );
    this.dmservice.addDMDetail(newahf, newvaccin,newfsp);
    this.onSave();
    //this.router.navigate(['/dm'])
  }

  getDMD(id:number){
    this.dmservice.getAHFById(id);
    this.dmservice.getVacById(id);
    this.dmservice.getFSPById(id);
    this.dmservice.getvisitebyid(id);
  }

  singleSelect: any = [];
  options = [
    {id:'1',display:'RAS'},
    {id:'2',display:'HTA'},
    {id:'3',display:'DID'},
    {id:'4',display:'DNED'},
    {id:'5',display:'IDM'},
    {id:'6',display:'Cancer'},
    {id:'7',display:'Hepatopathie'},
    {id:'8',display:'Nephropathie'},
    {id:'9',display:'Allergie aux possions'},
    {id:'10',display:'allergie aux pollens'},
    {id:'11',display:'eczema de contact'},
    {id:'12',display:'A.V.C'},
    {id:'13',display:'TBK'},
    {id:'14',display:'Angines à répetitions'},
    {id:'15',display:'Glaucome'},
    {id:'16',display:'HBP'},
    {id:'17',display:'Covid-19'},
    {id:'18',display:'Cardiopathie'},
    {id:'19',display:'Pneumopathie'},
    {id:'20',display:'dyslipidémie'}
  ];

  config = {
    displayKey:"display", //if objects array passed which key to be displayed defaults to description
    search:true, //true/false for the search functionlity defaults to false,
    height: '150px',
    }
    searchChange($event: any) {
      console.log($event);
    }
    singleSelect2: any = [];
    options2 = [
      {id:'1',display:'RAS'},
      {id:'2',display:'appendicectomie'},
      {id:'3',display:'Cholecystectomie'},
      {id:'4',display:'PPU'},
      {id:'5',display:'Cancers'},
      {id:'6',display:'peritonite'},
      {id:'7',display:'Lipome'},
      {id:'8',display:'amygdalectomie'},
      {id:'9',display:'glaucome'},
      {id:'10',display:'végétation adénoïde'},
      {id:'11',display:'Hémorroïdectomie'},
      {id:'12',display:'thyroïdectomie'},
      {id:'13',display:'Varices opérées'},
      {id:'14',display:'cataracte'},
      {id:'15',display:'Hernie Opérée'},
      {id:'16',display:'HBP'},
      {id:'17',display:'calculs rénaux'},
      {id:'18',display:'Fracture'},
      {id:'19',display:'varicocèle'}
    ];
    singleSelect3: any = [];
    options3 = [
      {id:'1',display:'Tabagisme chronique'},
      {id:'2',display:'Alcolisme chronique'},
      {id:'3',display:'Canabisme chronique'}
    ];

    singleSelect4: any = [];
    options4 = [
      {id:'1',display:'RAS'},
      {id:'2',display:'Stresse'},
      {id:'3',display:'AT'},
      {id:'4',display:'Affection psychiatrique'},
      {id:'5',display:'MP'},
      {id:'6',display:'Charge Mentale'},
      {id:'7',display:'TMS'},
      {id:'8',display:'R. Chimique'},
      {id:'9',display:'LATR'},
      {id:'10',display:'Bruits'}
    ];

}
