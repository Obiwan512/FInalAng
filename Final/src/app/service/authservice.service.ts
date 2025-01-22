import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

// Interface to define the structure of a user
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
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://fakestoreapi.com/users';
  private userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public user: Observable<User | null> = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  // Register new user
  register(user: { username: string; password: string }): Observable<any> {
    return this.http.post(this.apiUrl, user).pipe(
      catchError((error) => {
        console.error('Registration error:', error);
        throw error;
      })
    );
  }

  // Login function
  login(username: string, password: string): Observable<any> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      map((users) => {
        const user = users.find((user) => user.username === username && user.password === password);
        if (user) {
          // Simulate JWT token storage (you can replace with real JWT logic)
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.userSubject.next(user);
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

  // Get the current logged-in user
  getUser(): User | null {
    return JSON.parse(localStorage.getItem('currentUser') || 'null');
  }

  // Log out the user
  logout(): void {
    localStorage.removeItem('currentUser');
    this.userSubject.next(null);
    this.router.navigate(['/login']); // Navigate to the login page
  }
}
