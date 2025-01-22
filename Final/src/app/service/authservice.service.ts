import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  name: {
    firstname: string;
    lastname: string;
  };
  address: {
    city: string;
    street: string;
    number: number;
    zipcode: string;
    geolocation: {
      lat: number;
      long: number;
    };
  };
  phone: string;
  role: 'admin' | 'user';
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://fakestoreapi.com/users';  
  private userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public user: Observable<User | null> = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  register(user: { username: string; password: string }): Observable<any> {
    return this.http.post(this.apiUrl, user).pipe(
      catchError((error) => {
        console.error('Registration error:', error);
        throw error;
      })
    );
  }

  login(username: string, password: string): Observable<any> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      map((users) => {
        const user = users.find((user) => user.username === username && user.password === password);
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.userSubject.next(user);

          if (user.role === 'admin') {
            this.router.navigate(['/admin-dashboard']); 
          } else {
            this.router.navigate(['/home-page']); 
          }

          return user;
        }
        throw new Error('Invalid username or password');
      }),
      catchError((error) => {
        console.error('Login error:', error);
        throw error;
      })
    );
  }

  getUser(): User | null {
    return JSON.parse(localStorage.getItem('currentUser') || 'null');
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }
}
