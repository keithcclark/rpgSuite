import { TestBed } from '@angular/core/testing';

import { CombatantService } from './combatant.service';

describe('CombatantService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CombatantService = TestBed.get(CombatantService);
    expect(service).toBeTruthy();
  });
});
