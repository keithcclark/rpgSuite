import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject} from 'rxjs';
import { map } from 'rxjs/operators';
import {Type} from '../classes/type';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  constructor(private http: HttpClient) { }

  public getTypes(): Observable<Type[]> {
    return this.http.get(environment.typeUrl,
      { withCredentials: true }).pipe(map(
      resp => {
        const a: Type[] = resp as Type[];
        return a;
      }
      ));
  }
}