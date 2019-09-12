import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject} from 'rxjs';
import { map } from 'rxjs/operators';
import { Alignment} from '../classes/alignment';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlignmentService {

  constructor(private http: HttpClient) { }

  public getAlignments(): Observable<Alignment[]> {
    return this.http.get(environment.alignmentUrl,
      { withCredentials: true }).pipe(map(
      resp => {
        const a: Alignment[] = resp as Alignment[];
        return a;
      }
      ));
  }
}
