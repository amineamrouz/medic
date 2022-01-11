import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownsearchComponent } from './dropdownsearch.component';

describe('DropdownsearchComponent', () => {
  let component: DropdownsearchComponent;
  let fixture: ComponentFixture<DropdownsearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropdownsearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
