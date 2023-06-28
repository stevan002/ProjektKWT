import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from 'src/environments/environment.development';
import { JwtUtilsServiceService } from './jwt-utils-service.service';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class UserService {

  constructor(
    private http: HttpClient,
    private jwtUtilsService: JwtUtilsServiceService,
    private authService: AuthenticationService
  ) { }

  public register(user: User): Observable<boolean> {
    return this.http.post<boolean>(`${environment.api}/auth/register`, user);
  }

  public getUser(username: string): Observable<User> {
    return this.http.get<User>(`${environment.api}/users/${username}`);
  }

  public getUsername(): string{
    return this.jwtUtilsService.getUsernameFromToken();
  }

}
