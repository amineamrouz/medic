import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, throwError } from "rxjs";
import { map, catchError, tap } from 'rxjs/operators';
import { Auditif } from "../models/auditif.model";
import { Cardio } from "../models/cardiovasculaire.model";
import { Digestid } from "../models/digestif.model";
import { Employe } from "../models/employe.model";
import { Genial } from "../models/genial.model";
import { Hemato } from "../models/hemato_reticul.model";
import { Moteur } from "../models/moteur.model";
import { Neuro } from "../models/neuro.model";
import { Oculaire } from "../models/oculaire.model";
import { respiratoire } from "../models/respiratoire.model";
import { Urinaire } from "../models/urinaire.model";


@Injectable({
  providedIn: 'root'
})

export class ExamenService {



  private exm: any[]=[];
  private exmdetail: any[]=[];
  private newexm: any[]=[];
  //private newempDetail: any[]=[];
  id_exm : number =0;

  public exm$ = new Subject<Employe[]>();
  public exmdetail$= new Subject<Employe[]>();
  public newexm$= new Subject<Employe[]>();
constructor(private http: HttpClient){

}
//add moteur
public motueur$ = new Subject<Moteur[]>();
public moteur$= new Subject<Moteur[]>();
addMoteur(moteur: Moteur): Observable<HttpResponse<Moteur>>{
  let httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  return this.http
    .post<Moteur>('http://localhost:3000/api/addmoteur', moteur,
    {
      headers: httpHeaders,
      observe: 'response'
    }
  ).pipe(tap(()=>this.moteur$.next() ));

}
public oculaire$= new Subject<Oculaire[]>();
addOculaire(oculaire: Oculaire): Observable<HttpResponse<Moteur>>{
  let httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  return this.http
    .post<Moteur>('http://localhost:3000/api/addocculaire', oculaire,
    {
      headers: httpHeaders,
      observe: 'response'
    }
  ).pipe(tap(()=>this.oculaire$.next() ));

}

public auditif$= new Subject<Auditif[]>();
addAuditif(aud: Auditif): Observable<HttpResponse<Auditif>>{
  let httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  return this.http
    .post<Auditif>('http://localhost:3000/api/addauditif', aud,
    {
      headers: httpHeaders,
      observe: 'response'
    }
  ).pipe(tap(()=>this.auditif$.next() ));

}
public cardio$= new Subject<Cardio[]>();
addCardio(cardio: Cardio): Observable<HttpResponse<Cardio>>{
  let httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  return this.http
    .post<Cardio>('http://localhost:3000/api/addCardio', cardio,
    {
      headers: httpHeaders,
      observe: 'response'
    }
  ).pipe(tap(()=>this.cardio$.next() ));

}

public res$= new Subject<respiratoire[]>();
addRes(res: respiratoire): Observable<HttpResponse<respiratoire>>{
  let httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  return this.http
    .post<respiratoire>('http://localhost:3000/api/addres', res,
    {
      headers: httpHeaders,
      observe: 'response'
    }
  ).pipe(tap(()=>this.res$.next() ));

}
public dig$= new Subject<Digestid[]>();
addDigestif(dig: Digestid): Observable<HttpResponse<Digestid>>{
  let httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  return this.http
    .post<Digestid>('http://localhost:3000/api/addDigestif', dig,
    {
      headers: httpHeaders,
      observe: 'response'
    }
  ).pipe(tap(()=>this.dig$.next() ));

}
public gen$= new Subject<Genial[]>();
addGenital(gen: Genial): Observable<HttpResponse<Genial>>{
  let httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  return this.http
    .post<Genial>('http://localhost:3000/api/addGenital', gen,
    {
      headers: httpHeaders,
      observe: 'response'
    }
  ).pipe(tap(()=>this.gen$.next() ));

}
public uri$= new Subject<Urinaire[]>();
addUrinaire(uri: Urinaire): Observable<HttpResponse<Urinaire>>{
  let httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  return this.http
    .post<Urinaire>('http://localhost:3000/api/addUrinaire', uri,
    {
      headers: httpHeaders,
      observe: 'response'
    }
  ).pipe(tap(()=>this.uri$.next() ));

}
public hema$= new Subject<Hemato[]>();
addHemato(hema: Hemato): Observable<HttpResponse<Hemato>>{
  let httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  return this.http
    .post<Hemato>('http://localhost:3000/api/addHemato', hema,
    {
      headers: httpHeaders,
      observe: 'response'
    }
  ).pipe(tap(()=>this.hema$.next() ));

}

public neuro$= new Subject<Neuro[]>();
addNeuro(neuro: Neuro): Observable<HttpResponse<Neuro>>{
  let httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  return this.http
    .post<Neuro>('http://localhost:3000/api/addNeuro', neuro,
    {
      headers: httpHeaders,
      observe: 'response'
    }
  ).pipe(tap(()=>this.neuro$.next() ));

}




//get Emp
getExm() {
  this.http.get<any[]>('http://localhost:3000/api/exm').subscribe(
    (res: any[]) => {
      if (res) {
        this.exm = res;
        this.emitExm();
      }
    },
    (error) => {
      console.log(error);
    }
  );
}

/// add emp
/// add emp

addExm(exm: Employe){
  this.newexm.splice(0);
  this.newexm.push(exm);
  this.emitNewExm();
}


  saveExmToServer() {
      this.http
        .post<Employe>('http://localhost:3000/api/addemp', this.newexm[0])
       .subscribe(
        () => {
           console.log("EXM", this.newexm[0]);
           console.log('Enregistrement terminé !');
           this.emitNewExm();
         },
         (error) => {
           console.log('Erreur ! : ' + error);
         }
       );
  }

////Delete EMP
deleteExm(id:number) {
  this.http.delete('http://localhost:3000/api/deleteEmpById/'+id).subscribe(
    () => {
      console.log('this Employee has been deleted succesfully');
    },
    (error) => {
      console.log(error);
    }
  );
}

emitExm(){
  this.exm$.next(this.exm);
}
emitNewExm(){
  this.newexm$.next(this.newexm);
}

}
