import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { Thing } from '../models/Thing.model';
import { StuffService } from '../services/dash.service';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent implements OnInit, OnDestroy {

  @Input() id:number;

  userSubscription:Subscription;
  users: Thing[]=[];
  userbyid: Thing[]=[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(private stuffservice:StuffService,
    private router: Router) { }

  ngOnInit(): void {
    this.onFetch();
    this.userSubscription = this.stuffservice.stuff$.subscribe(
      (user: Thing[])=>{
        this.users=user;
        this.dtTrigger.next();
      }
    );
    this.stuffservice.emitStuff();
  }

  onFetch(){
    this.stuffservice.getStuff();
  }

  onDetail(id:number){
    this.userSubscription = this.stuffservice.stuffbyid$.subscribe(
      (user: Thing[])=>{
        this.userbyid=user;
      }
    );
      console.log("id selected ", id);
      this.stuffservice.oneStuff(id);
      this.router.navigate(['/detail']);
  }

  ngOnDestroy(): void {

    this.dtTrigger.unsubscribe();

  }

}
