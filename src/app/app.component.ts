import { Component, OnInit } from '@angular/core';
import { UserStorageService } from './basic/services/storage/user-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'company-app';

  isClientLoggedIn: boolean = UserStorageService.isClientLoggedIn();
  isCompanyLoggedIn: boolean = UserStorageService.isCompanyLoggedIn();

  constructor(private router: Router){}

  ngOnInit(): void {
   this.router.events.subscribe(event =>{
    this.isClientLoggedIn = UserStorageService.isClientLoggedIn();
    this.isCompanyLoggedIn = UserStorageService.isCompanyLoggedIn();
   })
  }

  logout(){
    UserStorageService.signOut();
    this.router.navigateByUrl('login');
  }
}
