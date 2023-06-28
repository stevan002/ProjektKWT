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
  activeRoute: string | undefined;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.loggedIn = this.authService.isLoggedIn();

    this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd) {
        this.refreshNavbar();
      }
    })
  }

  refreshNavbar(){
    this.activeRoute = this.router.url;
  }

  onLogout(){
    this.authService.logout();
  }

}
