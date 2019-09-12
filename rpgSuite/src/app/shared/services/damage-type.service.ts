import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject} from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { DamageType } from '../classes/damage-type';

@Injectable({
  providedIn: 'root'
})
export class DamageTypeService {

  constructor(private http: HttpClient) { }

  public getDamageTypes(): Observable<DamageType[]> {
    return this.http.get(environment.damage_typeUrl,
      { withCredentials: true }).pipe(map(
      resp => {
        const a: DamageType[] = resp as DamageType[];
        return a;
      }
      ));
    }
}
