import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  authstatus: Boolean | undefined;

  constructor(private authService: AuthService, private router : Router) { }

  ngOnInit(): void {
    this.authstatus=this.authService.isAuth;
  }

  onSignIn(){
    this.authService.signIn().then(
      ()=>{
        this.authstatus=this.authService.isAuth;
        this.router.navigate(['/dash']);
      }
    );
  }

  onSignOut(){
    this.authService.signOut();
    this.authstatus = this.authService.isAuth;
  }

}
