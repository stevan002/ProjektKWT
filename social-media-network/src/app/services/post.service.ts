import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Post } from '../models/post';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  public save(postForm: FormGroup): Observable<Post> {
    return this.http.post<Post>(`${environment.api}/post`, postForm.value);
  }

  public delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.api}/post/${id}`);
  }

  public getAll(): Observable<Post[]>{
    return this.http.get<Post[]>(`${environment.api}/post/all`);
  }

  public getOne(id: number): Observable<Post> {
    return this.http.get<Post>(`${environment.api}/post/${id}`);
  }
}
