import { Routes } from '@angular/router';
import { HomePageComponent } from './tamplate/home-page/home-page.component';
import { ProductDetailsComponent } from './tamplate/product-details/product-details.component';
import { LoginComponent } from './tamplate/login/login.component';
import { RegistrationComponent } from './tamplate/registration/registration.component';
import { AdminDashboardComponent } from './tamplate/admin-dashboard/admin-dashboard.component';


export const routes: Routes = [
  { path: '', redirectTo: '/home-page', pathMatch: 'full' },
  { path: 'home-page', component: HomePageComponent },
  { path: 'product-details', component: ProductDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
];
