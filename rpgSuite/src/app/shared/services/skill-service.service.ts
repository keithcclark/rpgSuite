import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject} from 'rxjs';
import { map } from 'rxjs/operators';
import { Skill } from '../classes/skill';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor(private http: HttpClient) { }

  public getSkills(): Observable<Skill[]> {
    return this.http.get(environment.skillUrl,
      { withCredentials: true }).pipe(map(
      resp => {
        const a: Skill[] = resp as Skill[];
        return a;
      }
      ));
    }
  }
