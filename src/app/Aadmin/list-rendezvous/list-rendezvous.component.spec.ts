import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRendezvousComponent } from './list-rendezvous.component';

describe('ListRendezvousComponent', () => {
  let component: ListRendezvousComponent;
  let fixture: ComponentFixture<ListRendezvousComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRendezvousComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRendezvousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
