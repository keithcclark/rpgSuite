import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegendaryCardComponent } from './legendary-card.component';

describe('LegendaryCardComponent', () => {
  let component: LegendaryCardComponent;
  let fixture: ComponentFixture<LegendaryCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LegendaryCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegendaryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
