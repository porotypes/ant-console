import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetStatisticsComponent } from './asset-statistics.component';

describe('AssetStatisticsComponent', () => {
  let component: AssetStatisticsComponent;
  let fixture: ComponentFixture<AssetStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
