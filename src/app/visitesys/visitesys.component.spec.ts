import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitesysComponent } from './visitesys.component';

describe('VisitesysComponent', () => {
  let component: VisitesysComponent;
  let fixture: ComponentFixture<VisitesysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitesysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitesysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
