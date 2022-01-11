import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, throwError } from "rxjs";
import { map, catchError, tap } from 'rxjs/operators';
import { Employe } from "../models/employe.model";


@Injectable({
  providedIn: 'root'
})

export class EmpService {

  private emp: any[]=[];
  private empdetail: any[]=[];
  private newemp: any[]=[];
  //private newempDetail: any[]=[];
  id_med : number =0;

  public emp$ = new Subject<Employe[]>();
  public empdetail$= new Subject<Employe[]>();
  public newemp$= new Subject<Employe[]>();
  //public newempDetail$= new Subject<Employe[]>();
constructor(private http: HttpClient){

}


//get Emp
getEmp() {
  this.http.get<any[]>('http://localhost:3000/api/emp').subscribe(
    (res: any[]) => {
      if (res) {
        this.emp = res;
        this.emitEmp();
      }
    },
    (error) => {
      console.log(error);
    }
  );
}

/// add emp
/// add emp

addEmp(emp: Employe){
  this.newemp.splice(0);
  this.newemp.push(emp);
  this.emitNewEmp();
}


  saveEmpToServer() {
      this.http
        .post<Employe>('http://localhost:3000/api/addemp', this.newemp[0])
       .subscribe(
        () => {
           console.log("EMP", this.newemp[0]);
           console.log('Enregistrement terminé !');
           this.emitNewEmp();
         },
         (error) => {
           console.log('Erreur ! : ' + error);
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

emitEmp(){
  this.emp$.next(this.emp);
}
emitNewEmp(){
  this.newemp$.next(this.newemp);
}

}
