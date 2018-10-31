import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentStatisticsComponent } from './equipment-statistics.component';

describe('EquipmentStatisticsComponent', () => {
  let component: EquipmentStatisticsComponent;
  let fixture: ComponentFixture<EquipmentStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
