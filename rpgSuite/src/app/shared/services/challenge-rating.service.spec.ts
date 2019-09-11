import { TestBed } from '@angular/core/testing';

import { ChallengeRatingService } from './challenge-rating.service';

describe('ChallengeRatingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChallengeRatingService = TestBed.get(ChallengeRatingService);
    expect(service).toBeTruthy();
  });
});
