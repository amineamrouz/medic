import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisiteatComponent } from './visiteat.component';

describe('VisiteatComponent', () => {
  let component: VisiteatComponent;
  let fixture: ComponentFixture<VisiteatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisiteatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisiteatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
