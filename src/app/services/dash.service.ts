import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Thing } from '../models/Thing.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class StuffService{

constructor(private http: HttpClient){}

private stuff: any[]=[];
private newstuff: any[]=[null];
private stuffbyid: Thing[]=[];

public stuff$ = new Subject<Thing[]>();
public stuffbyid$ = new Subject<Thing[]>();

saveAppareilsToServer() {
  this.http
    .post<Thing>('http://localhost:3000/api/adduser', this.newstuff[0])
    .subscribe(
      () => {
        console.log("amzwaro stuff dash service", this.newstuff[0]);
        console.log('Enregistrement terminé !');
        this.emitStuff();
      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    );

}

getStuff() {
  this.http.get<any[]>('http://localhost:3000/api/user').subscribe(
    (stuffd: any[]) => {
      if (stuffd) {
        this.stuff = stuffd;
        this.emitStuff();
      }
    },
    (error) => {
      console.log(error);
    }
  );
}
addUser(user: Thing){
  this.newstuff.push(user);
  this.emitStuff();
}

oneStuff(id:number) {
  this.http.get<any[]>('http://localhost:3000/api/user/'+id).subscribe(
    (stuffd: any[]) => {
      if (stuffd) {
        this.stuffbyid = stuffd;
        this.emitStuffbyid();
      }
    },
    (error) => {
      console.log(error);
    }
  );
}


deleteStuff(id:number) {
  this.http.delete('http://localhost:3000/api/deleteUserById/'+id).subscribe(
    () => {
      console.log('this users has been deleted succesfully');
    },
    (error) => {
      console.log(error);
    }
  );
}



emitStuff() {
  this.stuff$.next(this.stuff);
}
emitNewStuff() {
  this.stuff$.next(this.newstuff);
}
emitStuffbyid() {
  this.stuffbyid$.next(this.stuffbyid);
}



}
