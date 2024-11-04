import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpCallComponent } from './emp-call.component';

describe('EmpCallComponent', () => {
  let component: EmpCallComponent;
  let fixture: ComponentFixture<EmpCallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpCallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
