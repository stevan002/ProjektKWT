import { NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css'],
  providers: [NgIf]
})
export class PostItemComponent implements OnInit{

  @Input() post: Post = new Post()
  loggedIn: boolean = false;

  constructor(private authService: AuthenticationService){}

  ngOnInit(): void {
    this.loggedIn = this.authService.isLoggedIn();
  }

}
