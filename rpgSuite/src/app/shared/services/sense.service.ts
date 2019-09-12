import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject} from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Sense } from '../classes/sense';

@Injectable({
  providedIn: 'root'
})
export class SenseService {

  constructor(private http: HttpClient) { }

  public getSenses(): Observable<Sense[]> {
    return this.http.get(environment.senseUrl,
      { withCredentials: true }).pipe(map(
      resp => {
        const a: Sense[] = resp as Sense[];
        return a;
      }
      ));
  }
}
