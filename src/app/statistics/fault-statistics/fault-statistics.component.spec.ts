import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaultStatisticsComponent } from './fault-statistics.component';

describe('FaultStatisticsComponent', () => {
  let component: FaultStatisticsComponent;
  let fixture: ComponentFixture<FaultStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaultStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaultStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
