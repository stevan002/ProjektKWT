import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private headers = new HttpHeaders({'Content-Type': 'application/json'});

	constructor(
		private http: HttpClient,
		private router: Router
	) { }

	login(auth: any): Observable<any> {
		return this.http.post(environment.api + '/auth/login', {username: auth.username, password: auth.password}, {headers: this.headers, responseType: 'text'}).pipe(
		  tap(response => console.log(response)),
		  catchError(error => {
			console.error(error);
			throw error;
		  })
		);
	  }

	logout(): void {
		localStorage.clear();
		this.router.navigate(['/auth/login']);
	}

	isLoggedIn(): boolean {
		if (!localStorage.getItem('user')) {
				return false;
		}
		return true;
	}

	getToken(): string | null{
		return localStorage.getItem('user');
	}

	getAuthenticatedHeaders(): HttpHeaders {
		const token = this.getToken();
		if (token) {
			return this.headers.set('Authorization', `Bearer ${token}`);
		}
		return this.headers;
	}
}
