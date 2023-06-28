import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-item-list',
  templateUrl: './post-item-list.component.html',
  styleUrls: ['./post-item-list.component.css']
})
export class PostItemListComponent implements OnInit{


  ngOnInit(): void {
  }

  constructor(private postService: PostService){}

  @Input() posts: Post[] = [];
}
