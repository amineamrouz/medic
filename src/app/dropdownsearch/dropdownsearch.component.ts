import { Component, ElementRef, forwardRef, HostListener, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, Observable, fromEvent } from 'rxjs';


const KEY_CODE = {
  enter: 13,
  arrowUp: 38,
  arrowDown: 40,
  esc: 27,
}

const CSS_CLASS_NAMES = {
  highLight: 'dd-highlight-item',
}

@Component({
  selector: 'app-dropdownsearch',
  templateUrl: './dropdownsearch.component.html',
  styleUrls: ['./dropdownsearch.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownsearchComponent),
      multi: true
    }
  ]
})



export class DropdownsearchComponent implements OnInit {



  ngOnInit() {}



}
