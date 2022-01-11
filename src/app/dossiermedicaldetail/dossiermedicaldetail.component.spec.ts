import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DossiermedicaldetailComponent } from './dossiermedicaldetail.component';

describe('DossiermedicaldetailComponent', () => {
  let component: DossiermedicaldetailComponent;
  let fixture: ComponentFixture<DossiermedicaldetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DossiermedicaldetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DossiermedicaldetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
