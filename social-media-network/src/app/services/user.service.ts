import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from 'src/environments/environment.development';

@Injectable()
export class UserService {
  getUsername() {
    throw new Error('Method not implemented.');
  }

  constructor(
    private http: HttpClient
  ) { }

  public register(user: User): Observable<boolean> {
    return this.http.post<boolean>(`${environment.api}/auth/register`, user);
  }


}
