import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Thing } from '../models/Thing.model';
import { HttpClient } from '@angular/common/http';
import { Medicament } from '../models/Medicament.model';
import { MedicamentDetail } from '../models/medicamentdetail.model';

@Injectable({
  providedIn: 'root'
})

export class MedicamentService{

constructor(private http: HttpClient){}

private med: any[]=[];
private meddetail: any[]=[];
private newmed: any[]=[];
private newmedDetail: any[]=[];
id_med : number =0;

public med$ = new Subject<Medicament[]>();
public meddetail$= new Subject<MedicamentDetail[]>();
public newmed$= new Subject<MedicamentDetail[]>();
public newmedDetail$= new Subject<MedicamentDetail[]>();

//get medicamends
getMedicament() {
  this.http.get<any[]>('http://localhost:3000/api/medicament').subscribe(
    (res: any[]) => {
      if (res) {
        this.med = res;
        this.emitMedicament();
      }
    },
    (error) => {
      console.log(error);
    }
  );
}

emitMedicament(){
this.med$.next(this.med);
}

//get medicament details by ID

getMedicamentDetail(id:number) {
  this.http.get<any[]>('http://localhost:3000/api/medicament/'+id).subscribe(
    (res: any[]) => {
      if (res) {
        this.meddetail = res;
        this.emitMedicamentdetail();
        this.id_med=0;
        this.id_med=id;
        console.log("getmeddetail::", this.meddetail);
      }
    },
    (error) => {
      console.log(error);
    }
  );
}

emitMedicamentdetail(){
this.meddetail$.next(this.meddetail);
}
/// add medicament

addMedicament(med: Medicament){
  this.newmed.splice(0);
  this.newmed.push(med);
  this.emitNewMedicament();
  console.log("test splice",this.newmed)
}

emitNewMedicament(){
  this.newmed$.next(this.newmed);
  }

  saveMedsToServer() {

      this.http

        .post<Medicament>('http://localhost:3000/api/addmed', this.newmed[0])
       .subscribe(
        () => {
           console.log("stuff dash service", this.newmed[0]);
           console.log('Enregistrement terminé !');
           this.emitNewMedicament();
         },
         (error) => {
           console.log('Erreur ! : ' + error);
         }
       );

  }
/// add medicament detail

addMedDetail(med: MedicamentDetail){
  this.newmedDetail.splice(0);
  this.newmedDetail.push(med);
  this.emitNewMedDetail();
}

emitNewMedDetail(){
  this.newmedDetail$.next(this.newmedDetail);
  }

  saveMedDetailsToServer() {
    this.http
      .post<MedicamentDetail>('http://localhost:3000/api/addmeddetail', this.newmedDetail[0])
      .subscribe(
        () => {
          console.log("stuff dash service", this.newmedDetail[0]);
          console.log('Enregistrement terminé !');
          this.emitNewMedDetail();
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );

  }

////Delete med
deleteMed(id:number) {
  this.http.delete('http://localhost:3000/api/deleteMedById/'+id).subscribe(
    () => {
      console.log('this Medicament has been deleted succesfully');
    },
    (error) => {
      console.log(error);
    }
  );
}

////Delete medDetail
deleteMedDetail(id_med:number, id_med_detail: number) {
  this.http.delete('http://localhost:3000/api/deleteMedDetailById/'+id_med+'/'+id_med_detail).subscribe(
    () => {
      console.log('this Medicament Detail has been deleted succesfully');
    },
    (error) => {
      console.log(error);
    }
  );
}


}
