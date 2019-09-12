import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject} from 'rxjs';
import { map } from 'rxjs/operators';
import { Speed} from '../classes/speed';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpeedService {

  constructor(private http: HttpClient) { }

  public getSpeeds(): Observable<Speed[]> {
    return this.http.get(environment.speedUrl,
      { withCredentials: true }).pipe(map(
      resp => {
        const a: Speed[] = resp as Speed[];
        return a;
      }
      ));
  }
}
