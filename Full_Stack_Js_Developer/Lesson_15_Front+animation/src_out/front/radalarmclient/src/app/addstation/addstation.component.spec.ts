import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddstationComponent } from './addstation.component';

describe('AddstationComponent', () => {
  let component: AddstationComponent;
  let fixture: ComponentFixture<AddstationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddstationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddstationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
