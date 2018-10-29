import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentCashComponent } from './equipment-cash.component';

describe('EquipmentCashComponent', () => {
  let component: EquipmentCashComponent;
  let fixture: ComponentFixture<EquipmentCashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentCashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
