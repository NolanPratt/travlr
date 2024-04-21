import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
selector: 'app-navbar',
standalone: true,
imports: [CommonModule],
templateUrl: './navbar.component.html',
styleUrls: ['./navbar.component.css'],
})

export class NavbarComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() { }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  public goToLogin(): void {
    this.router.navigateByUrl('/login');
  }

  public onLogout(): void {
    return this.authenticationService.logout();
  }
} 