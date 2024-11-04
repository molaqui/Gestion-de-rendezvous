import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RendezvousManqueComponent } from './rendezvous-manque.component';

describe('RendezvousManqueComponent', () => {
  let component: RendezvousManqueComponent;
  let fixture: ComponentFixture<RendezvousManqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RendezvousManqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RendezvousManqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
