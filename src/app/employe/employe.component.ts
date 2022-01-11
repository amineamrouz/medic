import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject, Subscription } from 'rxjs';
import { Employe } from '../models/employe.model';
import { DMService } from '../services/dossiermedical.service';
import { EmpService } from '../services/employe.service';

@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrls: ['./employe.component.scss']
})
export class EmployeComponent implements OnInit, AfterViewInit, OnDestroy {

  isAdd: boolean = false;
  dtOptions: any = {};

  dtTrigger: Subject<any> = new Subject<any>();
  id: number;
  emps: Employe[] = [];

  empSubscription: Subscription[] = [];

  fg_emp: FormGroup;


  constructor(private empService: EmpService,
    private formBuilder: FormBuilder,
    private router: Router,
    private dmservice: DMService) { }

  ngOnInit(): void {
    this.dtOptions = {

      destroy: true,
      searching: true,
      columnDefs: [
        { className: "dt-head-center dt-center", targets: "_all" },
      ],
      buttons: [
        {
          extend: 'excel',
          text: 'Export Execl Form',

          className: 'btn btn btn-outline-secondary '
        }
      ],
      initComplete: function () {
        var activeTable = this.api();
        activeTable.buttons().container().prependTo("#buttons");
      }
    };
    this.onFetch();
    this.empSubscription.push(this.empService.emp$.subscribe(
      (emp: Employe[]) => {
        this.emps = emp;
        this.dtTrigger.next();
      }
    ))

    this.empService.emitEmp();

    this.innitForm();
  }
  /// get using observables



  innitForm() {
    this.fg_emp = this.formBuilder.group({
      num_emp: ['', Validators.required],
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      cin: ['', Validators.required],
      departement: ['', Validators.required],
      telephone: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  // get emp
  onFetch() {
    this.empService.getEmp();
  }

  // add EMP
  onAddEmp() {
    const formValue = this.fg_emp.value;
    const newemp = new Employe(
      formValue['num_emp'],
      formValue['num_emp'],
      formValue['prenom'],
      formValue['nom'],
      formValue['cin'],
      formValue['departement'],
      formValue['telephone'],
      formValue['email']
    );
    this.empService.addEmp(newemp);
    this.onSave();
    this.rerender();
    this.onAdd();
  }
  onSave() {
    this.empService.saveEmpToServer();
  }

  // Delete EMP
  onDelete(id: number) {
    if (confirm("Are you sure to delete this ")) {
      this.empService.deleteEmp(id);
      this.rerender();
    }
  }

  //refresh data table
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  ngAfterViewInit(): void {

  }


  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.onFetch()
    });
  }

  //  button de ajouter
  onAdd() {
    if (this.isAdd == false) {
      return this.isAdd = true;
    }
    else if (this.isAdd == true) {
      return this.isAdd = false;
    }
    else return;
  }
  onDM(id: number) {
    this.dmservice.getDMById(id);
    this.router.navigate(['/dm']);
    //this.getDMD(id_2);
  }
  getDMD(id: number) {

    this.dmservice.getAHFById(id);
    this.dmservice.getVacById(id);
    this.dmservice.getFSPById(id);
    this.dmservice.getvisitebyid(id);

  }

  onDes() {

  }

  /// destroy
  ngOnDestroy() {
    this.empSubscription.forEach(subscription => {
      subscription.unsubscribe();
    })
  }




}
