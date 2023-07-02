import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit{
  posts: Post[] = [];
  newPostContent: string = '';
  currentUser: any;

  constructor(
    private postService: PostService,
    private authService: AuthenticationService){}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.loadPosts();
  }

  createPost(){
    if(!this.newPostContent.trim()){
      return
    }

    this.currentUser = this.authService.getCurrentUser();
    if(!this.currentUser){
      console.log("nepoznat ulogovani korisnik");
      return
    }

    const newPost: Post = {
      content: this.newPostContent,
      comments: [],
      isEditing: false,
      isUpdating: false,
      showComments: false,
      updatedContent: ''
    };

    this.postService.save(newPost).subscribe(
      createdPost => {
        this.posts.push(createdPost);
        this.loadPosts();
        this.newPostContent = '';
      },
      error => {
        console.log(error);
      }
    );
  }

  loadPosts(){
    this.postService.getAll().subscribe(
      posts => {
        this.posts = posts;
        
        //ocitavanje komentara

        this.posts.sort((a, b) => {
          if(a.createdAt && b.createdAt){
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          }else{
            return 0;
          }
        });
        this.posts.reverse();
//        console.log(this.posts);
      },
      error => {
        console.log(error);
      }
    )
  }

  deletePost(postId: number){
    this.currentUser = this.authService.getCurrentUser();
    const post = this.posts.find(p => p.id === postId);

    if(!post || !this.currentUser || post.createdBy?.username !== this.currentUser.sub){
        console.error("Niste kreirali post, ne mozete da ga obrisete.");
        return
    }
    this.postService.delete(postId).subscribe(() => {
      this.loadPosts();
    });

    this.loadPosts();
  }

  startEditPost(post: Post) {
    post.isEditing = true;
    post.updatedContent = post.content;
  }

  cancelEditPost(post: Post) {
    post.isEditing = false;
  }

  updatePost(postId: number, post: Post){
    this.currentUser = this.authService.getCurrentUser();

    if(!this.currentUser || post.createdBy?.username !== this.currentUser.sub){
      console.error("Niste kreirali objavu!");
      return
    }
    if (!post.updatedContent.trim()) {
      return;
    }

    post.content = post.updatedContent;
    post.isEditing = false;
    post.isUpdating = true;

    this.postService.update(postId, post.content).subscribe(
      updatePost =>{
        post.isUpdating = false;
      },
      error => {
        console.log("Greska: ", error);
        post.isEditing = true;
        post.isUpdating = false;
      }
    )
  }
}
