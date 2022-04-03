import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationDetailsComponent } from './station-details.component';

describe('StationDetailsComponent', () => {
  let component: StationDetailsComponent;
  let fixture: ComponentFixture<StationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StationDetailsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
