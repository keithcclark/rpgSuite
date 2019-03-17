import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonstercardComponent } from './monstercard.component';

describe('MonstercardComponent', () => {
  let component: MonstercardComponent;
  let fixture: ComponentFixture<MonstercardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonstercardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonstercardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
