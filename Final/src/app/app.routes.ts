import { Routes } from '@angular/router';
import { LoginComponent } from './tamplate/login/login.component';
import { RegistrationComponent } from './tamplate/registration/registration.component';
import { HomePageComponent } from './tamplate/home-page/home-page.component';
import { ProductDetailsComponent } from './tamplate/product-details/product-details.component';
import { AdminDashboardComponent } from './tamplate/admin-dashboard/admin-dashboard.component';


export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'homepage', component: HomePageComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  
  { path: '**', redirectTo: '/login' },
];
