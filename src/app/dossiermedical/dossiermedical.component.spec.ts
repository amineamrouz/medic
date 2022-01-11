import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DossiermedicalComponent } from './dossiermedical.component';

describe('DossiermedicalComponent', () => {
  let component: DossiermedicalComponent;
  let fixture: ComponentFixture<DossiermedicalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DossiermedicalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DossiermedicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
