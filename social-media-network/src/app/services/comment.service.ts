import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  public save(comment: Comment){
    return this.http.post(`${environment.api}/comments`, comment);
  }

  public getOne(id: number):Observable<Comment>{
    return this.http.get<Comment>(`${environment.api}/comments/${id}`);
  }

  delete(id: number): Observable<boolean>{
    return this.http.delete<boolean>(`${environment.api}/comments/${id}`);
  }
}
