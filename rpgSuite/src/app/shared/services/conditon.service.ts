import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject} from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Condition } from '../classes/condition';

@Injectable({
  providedIn: 'root'
})
export class ConditonService {

  constructor(private http: HttpClient) { }

  public getConditions(): Observable<Condition[]> {
    return this.http.get(environment.conditionUrl,
      { withCredentials: true }).pipe(map(
      resp => {
        const a: Condition[] = resp as Condition[];
        return a;
      }
      ));
    }
}
