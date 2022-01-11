import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Thing } from '../models/Thing.model';
import { StuffService } from '../services/dash.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  userSubscription:Subscription;
  users: any[];
  signupForm: FormGroup;
  iduser: number;

  constructor(private stuffservice:StuffService,
    private formBuilder: FormBuilder,
    private router:Router) { }

  ngOnInit(): void {
    this.innitForm();

    this.userSubscription = this.stuffservice.stuff$.subscribe(
      (user: any[])=>{
        this.users=user;
      }
    );
    this.stuffservice.emitStuff();
  }
  innitForm(){
    this.signupForm= this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      passwordconfirmation: ['', Validators.required],

    },
    {
      validator: this.checkIfMatchingPasswords('password', 'passwordconfirmation')
    });
  }

  checkIfMatchingPasswords(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors.checkIfMatchingPasswords) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ checkIfMatchingPasswords: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
  }

  getRandomInt(min : number, max :number) : number{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  onSubmitForm(){
    const formValue = this.signupForm.value;
    const newUser = new Thing (
      this.iduser=this.getRandomInt(100,10000),
      formValue['username'],
      formValue['password']
    );
    this.stuffservice.addUser(newUser);
    this.onSave();
  }

  onSave(){
    this.stuffservice.saveAppareilsToServer();
  }

}
