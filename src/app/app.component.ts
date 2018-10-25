import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './core/auth/auth.service';
import { StorageService } from './core/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private storageService: StorageService,
    private router: Router,
  ) {}

  ngOnInit() {
  }
}
