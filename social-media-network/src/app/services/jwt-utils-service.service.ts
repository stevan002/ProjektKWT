import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtUtilsServiceService {

  constructor() { }

  getUsernameFromToken(): string{
    const token = localStorage.getItem('user');

    if(token) {
      const decodedToken: any = jwt_decode(token);
      return decodedToken.sub;
    }

    return "";
  }
}
