import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRendezvousComponent } from './update-rendezvous.component';

describe('UpdateRendezvousComponent', () => {
  let component: UpdateRendezvousComponent;
  let fixture: ComponentFixture<UpdateRendezvousComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateRendezvousComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRendezvousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
