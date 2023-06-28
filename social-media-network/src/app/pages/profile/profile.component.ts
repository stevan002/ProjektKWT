import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  user: User = new User();
  editProfileEnabled: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ){}


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const username = params['username'];
      this.userService.getUser(username).subscribe((user: User) => {
        this.user = user;
      })
    })
  }

  onEditProfile(){
    this.editProfileEnabled = !this.editProfileEnabled;
  }

  onUpdateProfile(user: User){
    this.user = user;
    this.editProfileEnabled = false;
  }

}