import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

const TOKEN = 's_token';
const USER = 's_user';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  constructor(@Inject(DOCUMENT) private document: Document) { }

  public saveToken(token: string): void {
    if (this.document.defaultView && window.localStorage) {
      window.localStorage.removeItem(TOKEN);
      window.localStorage.setItem(TOKEN, token);
    }
  }

  static getToken(): string {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage.getItem(TOKEN);
    }
    return null;
  }

  public saveUser(user: any): void {
    if (this.document.defaultView && window.localStorage) {
      window.localStorage.removeItem(USER);
      window.localStorage.setItem(USER, JSON.stringify(user));
    }
  }

  static getUser(): any {
    if (typeof window !== 'undefined' && window.localStorage) {
      const userData = window.localStorage.getItem(USER);
      try {
        return JSON.parse(userData);
      } catch (error) {
        console.error("Error parsing user data:", error);
        return null;
      }
    }
    return null;
  }

  static getUserId(): string {
    const user = this.getUser();
    return user ? user.userId : null;
  }

  static getUserRole(): string {
    const user = this.getUser();
    return user ? user.role : '';
  }
  
  static isClientLoggedIn(): boolean {
    return this.getToken() !== null && this.getUserRole() === 'CLIENT';
  }

  static isCompanyLoggedIn(): boolean {
    return this.getToken() !== null && this.getUserRole() === 'COMPANY';
  }

  static signOut(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(TOKEN);
      window.localStorage.removeItem(USER);
    }
  }
}
