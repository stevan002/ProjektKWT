import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit{

  post: Post = new Post();
  loggedIn: boolean = false;

  constructor(private route: ActivatedRoute,
    private postService: PostService,
    private authService: AuthenticationService){}


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.postService.getOne(id).subscribe((post: Post) => {
        this.post = post;
      })
      this.loggedIn = this.authService.isLoggedIn();
    })
  }

}
