import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject} from 'rxjs';
import { map } from 'rxjs/operators';
import { ChallengeRating } from '../classes/challenge-rating';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChallengeRatingService {

  constructor(private http: HttpClient) { }

  public getCRs(): Observable<ChallengeRating[]> {
    return this.http.get(environment.crUrl,
      { withCredentials: true }).pipe(map(
      resp => {
        const cr: ChallengeRating[] = resp as ChallengeRating[];
        return cr;
      }
      ));
  }
}
