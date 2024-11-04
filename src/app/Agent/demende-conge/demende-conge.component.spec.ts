import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemendeCongeComponent } from './demende-conge.component';

describe('DemendeCongeComponent', () => {
  let component: DemendeCongeComponent;
  let fixture: ComponentFixture<DemendeCongeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemendeCongeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemendeCongeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
