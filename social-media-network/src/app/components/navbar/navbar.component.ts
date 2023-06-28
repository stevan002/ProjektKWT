import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  loggedIn: boolean = false;
  username: string = "";

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private userService: UserService
  ){}

  ngOnInit(): void {
    this.loggedIn = this.authService.isLoggedIn();
    this.userService.getUsername() ? this.username = this.userService.getUsername() : ""
  }

  onLogout(){
    this.authService.logout();
  }

}
