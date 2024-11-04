import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRendezvousComponent } from './add-rendezvous.component';

describe('AddRendezvousComponent', () => {
  let component: AddRendezvousComponent;
  let fixture: ComponentFixture<AddRendezvousComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRendezvousComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRendezvousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
