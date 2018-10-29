import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentMapComponent } from './equipment-map.component';

describe('EquipmentMapComponent', () => {
  let component: EquipmentMapComponent;
  let fixture: ComponentFixture<EquipmentMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
