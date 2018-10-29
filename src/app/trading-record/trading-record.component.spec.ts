import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradingRecordComponent } from './trading-record.component';

describe('TradingRecordComponent', () => {
  let component: TradingRecordComponent;
  let fixture: ComponentFixture<TradingRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradingRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradingRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
