import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Thing } from '../models/Thing.model';
import { StuffService } from '../services/dash.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {

  @Input() username: string;
  @Input() password : string;
  @Input() indexOfUser: number;
  @Input() id:number;
  userSubscription: any;
  users: any[];
  userbyid : Thing[]=[];

  constructor(private stuffservice:StuffService) { }



  ngOnInit(): void {


    this.userSubscription = this.stuffservice.stuffbyid$.subscribe(
      (user: Thing[])=>{
        this.userbyid[0]=user[0];
        console.log("user-view1",user);
      }
    );
    this.stuffservice.emitStuffbyid();
    console.log("user-view2",this.userbyid);
  }



  onDelete(){
    console.log("id to delete is ", this.id);
    this.stuffservice.deleteStuff(this.id);
  }

}
