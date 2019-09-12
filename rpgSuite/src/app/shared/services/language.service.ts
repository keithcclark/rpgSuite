import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject} from 'rxjs';
import { map } from 'rxjs/operators';
import { Language } from '../classes/language';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private http: HttpClient) { }

  public getLanguages(): Observable<Language[]> {
    return this.http.get(environment.languageUrl,
      { withCredentials: true }).pipe(map(
      resp => {
        const a: Language[] = resp as Language[];
        return a;
      }
      ));
  }
}
