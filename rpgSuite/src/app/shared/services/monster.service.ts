import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject} from 'rxjs';
import { map } from 'rxjs/operators';
import { Monster } from '../classes/monster';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MonsterService {

  constructor(private http: HttpClient) { }

  public getMonster(id: number): Observable<Monster> {
    return this.http.get(environment.creatureUrl + '/' + id,
      { withCredentials: true }).pipe(map(
        resp => {
          const m: Monster = resp as Monster;
          return m;
        })
        );}
  public searchName(name: string): Observable<Monster[]> {
    return this.http.get(environment.creatureUrl + '/name?name=' + name,
    {withCredentials: true}).pipe(map(
      resp => {
        const m: Monster[] = resp as Monster[];
        return m;
      }
    ));
  }
}
