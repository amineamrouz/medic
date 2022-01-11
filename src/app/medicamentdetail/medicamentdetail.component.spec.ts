import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicamentdetailComponent } from './medicamentdetail.component';

describe('MedicamentdetailComponent', () => {
  let component: MedicamentdetailComponent;
  let fixture: ComponentFixture<MedicamentdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicamentdetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicamentdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
