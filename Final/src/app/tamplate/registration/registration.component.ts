import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/authservice.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  registrationForm: FormGroup;

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {
    this.registrationForm = fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  // This method will handle the form submission for registration
  onRegister(): void {
    if (this.registrationForm.valid) {
      const { username, password } = this.registrationForm.value;
      this.authService.register({ username, password }).subscribe(
        (response) => {
          console.log('User registered successfully', response);
          this.router.navigate(['/login']); // Redirect to login page after successful registration
        },
        (error) => {
          console.error('Registration failed', error);
          alert('Registration failed: ' + error.message);
        }
      );
    }
  }

  // This method will navigate the user to the login page
  navigateToLogin(): void {
    this.router.navigate(['/login']); // Redirect to login page
  }
}
