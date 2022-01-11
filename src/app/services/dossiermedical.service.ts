import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { AHF } from "../models/ahf.model";
import { DossierMedical } from "../models/dm.model";
import { Employe } from "../models/employe.model";
import { FSP } from "../models/fsp.model";
import { Vaccin } from "../models/vaccin.model";
import { Visite } from "../models/visite.model";


@Injectable({
  providedIn: 'root'
})

export class DMService {

  private dm: any[]=[];
  public dmbyid: any[]=[];
  private newdm: DossierMedical[]=[];
  //private newempDetail: any[]=[];
  id_emp : number =0;
  id_dm: number;
  id_dm_byid: number=0;


  public dm$ = new Subject<DossierMedical[]>();
  public dmbyid$= new Subject<DossierMedical[]>();
  public newdm$= new Subject<DossierMedical[]>();
  //public newempDetail$= new Subject<Employe[]>();
constructor(private http: HttpClient){

}


/// get DM
getDM() {
  this.http.get<any[]>('http://localhost:3000/api/getdm').subscribe(
    (res: any[]) => {
      if (res) {
        this.dm = res;
        this.emitDM();
      }
    },
    (error) => {
      console.log(error);
    }
  );
}

/// get DM by id
//get medicament details by ID

getDMById(id:number) {
  this.http.get<any[]>('http://localhost:3000/api/dm/'+id).subscribe(
    (res: any[]) => {
      if (res) {
        this.dmbyid = res;
        this.emitDMbyid();
        this.id_emp=0;
        this.id_emp=id;
       //console.log("get DM By Id::", this.dmbyid);
        this.id_dm_byid=res[0].id_dm;
        console.log("get id:::", this.id_dm_byid);
      }
    },
    (error) => {
      console.log(error);
    }
  );
}


emitDMbyid(){
  this.dmbyid$.next(this.dmbyid);
}
/// add DM



addDM(dm: DossierMedical){

  this.newdm.splice(0);
  this.newdm.push(dm);
  this.emitNewDM();
}



saveDMToServer() {

      this.http
        .post<any>('http://localhost:3000/api/adddm', this.newdm[0])
       .subscribe(
        () => {
           //console.log("EMP", this.newdm[0]);
           console.log('Enregistrement terminé !');
         },
         (error) => {
           console.log('Erreur ! : ' + error);
         }
       );

  }

/// add dm detail


private newahf: AHF[]=[];
private newvac: Vaccin[]=[];
private newfsp: FSP[]=[];

public newahf$ = new Subject<AHF[]>();
public newvac$ = new Subject<Vaccin[]>();
public newfsp$ = new Subject<FSP[]>();

addDMDetail(ahf: AHF, vac:Vaccin, fsp:FSP ){
  // add ahf
  this.newahf.splice(0);
  this.newahf.push(ahf);
  this.emitahf();

  // add vaccin
  this.newvac.splice(0);
  this.newvac.push(vac);
  this.emitvac();
  // add fsp
  this.newfsp.splice(0);
  this.newfsp.push(fsp);
  this.emitfsp();
}
emitahf(){
  this.newahf$.next(this.newahf);
}
emitvac(){
  this.newvac$.next(this.newvac);
}
emitfsp(){
  this.newfsp$.next(this.newfsp);
}



saveAHFToServer() {

      this.http
        .post<any>('http://localhost:3000/api/addahf', this.newahf[0])
       .subscribe(
        () => {
           console.log("EMP", this.newdm[0]);
           console.log('Enregistrement terminé !');
         },
         (error) => {
           console.log('Erreur ! : ' + error);
         }
       );

  }
  saveVacToServer() {

    this.http
      .post<any>('http://localhost:3000/api/addvaccin', this.newvac[0])
     .subscribe(
      () => {
         //console.log("EMP", this.newdm[0]);
         console.log('Enregistrement terminé !');
       },
       (error) => {
         console.log('Erreur ! : ' + error);
       }
     );

}
saveFSPToServer() {

  this.http
    .post<any>('http://localhost:3000/api/addfsp', this.newfsp[0])
   .subscribe(
    () => {
       //console.log("EMP", this.newdm[0]);
       console.log('Enregistrement terminé !');
     },
     (error) => {
       console.log('Erreur ! : ' + error);
     }
   );

}
// get dm details

private ahfbyid: any[]=[];
public ahfbyid$= new Subject<AHF[]>();
private vacbyid: any[]=[];
public vacbyid$= new Subject<Vaccin[]>();
private fspbyid: any[]=[];
public fspbyid$= new Subject<FSP[]>();

emitahfbyid(){
  this.ahfbyid$.next(this.ahfbyid);
}
emitvacbyid(){
  this.vacbyid$.next(this.vacbyid);
}
emitfspbyid(){
  this.fspbyid$.next(this.fspbyid);
}

getAHFById(id:number) {
  this.http.get<any[]>('http://localhost:3000/api/getahf/'+id).subscribe(
    (res: any[]) => {
      if (res) {
        this.ahfbyid = res;
        this.emitahfbyid();
        //console.log("getahfbyid",this.ahfbyid )
      }
    },
    (error) => {
      console.log(error);
    }
  );
}
getVacById(id:number) {
  this.http.get<any[]>('http://localhost:3000/api/getvac/'+id).subscribe(
    (res: any[]) => {
      if (res) {
        this.vacbyid = res;
        this.emitvacbyid();
        //console.log("getvacbyid",this.vacbyid )

      }
    },
    (error) => {
      console.log(error);
    }
  );
}
getFSPById(id:number) {
  this.http.get<any[]>('http://localhost:3000/api/getfsp/'+id).subscribe(
    (res: any[]) => {
      if (res) {
        this.fspbyid = res;
        this.emitfspbyid();
        //console.log("getfspbyid",this.fspbyid )
      }
    },
    (error) => {
      console.log(error);
    }
  );
}




////Delete EMP
deleteEmp(id:number) {
  this.http.delete('http://localhost:3000/api/deleteEmpById/'+id).subscribe(
    () => {
      console.log('this Employee has been deleted succesfully');
    },
    (error) => {
      console.log(error);
    }
  );
}

emitDM(){
  this.dm$.next(this.dm);
}
emitNewDM(){
  this.newdm$.next(this.newdm);
}

//////////////////////////Vsitie
private visitebyid: any[]=[];
public visitebyid$= new Subject<Visite[]>();

private visite: any[]=[];
public visite$= new Subject<Visite[]>();

private newvisite: any[]=[];
public newvisite$= new Subject<Visite[]>();


emitNewVisite(){
  this.newvisite$.next(this.newvisite);
}
emitvisite(){
  this.visite$.next(this.visite);
}
emitvisitebyid(){
  this.visitebyid$.next(this.visitebyid);
}


addVisite(visite: Visite){
  this.newvisite.splice(0);
  this.newvisite.push(visite);
  this.emitNewVisite();
}


  saveVisiteToServer() {

      this.http

        .post<Employe>('http://localhost:3000/api/addvisite', this.newvisite[0])
       .subscribe(
        () => {
           console.log("EMP", this.newvisite[0]);
           console.log('Enregistrement terminé !');
           this.emitNewVisite();
         },
         (error) => {
           console.log('Erreur ! : ' + error);
         }
       );

  }

  /// get getvisite

  getvisite(){

  this.http.get<any[]>('http://localhost:3000/api/visite').subscribe(
    (res: any[]) => {
      if (res) {
        this.visite = res;
        this.emitvisite();
      }
    },
    (error) => {
      console.log(error);
    }
  );
  }
  //get by id
  /// get getvisite
  id_dm_visite:number;

  getvisitebyid(id: number){

    this.http.get<any[]>('http://localhost:3000/api/visite/'+id).subscribe(
      (res: any[]) => {
        if (res) {
          this.visitebyid = res;
          this.emitvisitebyid();
          this.id_dm_visite=this.visitebyid[0].id_dm;
          console.log("here is",this.visitebyid)
        }
      },
      (error) => {
        console.log(error);
      }
    );
    }

// delete visite
deletevisite(id: number){
  this.http.delete('http://localhost:3000/api/deletevisiteById/'+id).subscribe(
    () => {
      console.log('this visit has been deleted succesfully');
    },
    (error) => {
      console.log(error);
    }
  );

}


}
