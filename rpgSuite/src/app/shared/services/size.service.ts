import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject} from 'rxjs';
import { map } from 'rxjs/operators';
import { Size } from '../classes/size';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SizeService {

  constructor(private http: HttpClient) { }

  public getSizes(): Observable<Size[]> {
    return this.http.get(environment.sizeUrl,
      { withCredentials: true }).pipe(map(
      resp => {
        const a: Size[] = resp as Size[];
        return a;
      }
      ));
    }
}
