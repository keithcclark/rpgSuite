import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CombatantStatusComponent } from './combatant-status.component';

describe('CombatantStatusComponent', () => {
  let component: CombatantStatusComponent;
  let fixture: ComponentFixture<CombatantStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CombatantStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CombatantStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
