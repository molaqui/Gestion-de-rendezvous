import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeEmpPasswordComponent } from './change-emp-password.component';

describe('ChangeEmpPasswordComponent', () => {
  let component: ChangeEmpPasswordComponent;
  let fixture: ComponentFixture<ChangeEmpPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeEmpPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeEmpPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
