import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment.development';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class UserService {

  private currentUser!: User;

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) { }

  public register(user: any) {
    return this.http.post(`${environment.api}/auth/register`, user);
  }

  public getUser(username: string): Observable<User> {
    return this.http.get<User>(`${environment.api}/users/${username}`);
  }

  public getUsername(): string{
    return this.authService.getCurrentUsername();
  }

  public update(user: User): Observable<User>{
    return this.http.put<User>(`${environment.api}/users`, user);
  }

}
