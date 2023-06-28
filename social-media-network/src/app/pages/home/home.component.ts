import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  posts: Post[] = [];
  loggedIn: boolean = false;

  constructor(private postService: PostService, private authService: AuthenticationService){}


  ngOnInit(): void {
    this.loggedIn = this.authService.isLoggedIn();
    this.postService.getAll().subscribe(data => {
      this.posts = data as Post[];
    })
  }

  
}
