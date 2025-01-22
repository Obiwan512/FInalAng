import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  imports: [CommonModule]
})
export class HomePageComponent implements OnInit {
  products: any[] = []; 
  displayedProducts: any[] = [];
  categories: string[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.http.get<any[]>('https://fakestoreapi.com/products').subscribe((data) => {
      this.products = data;
      this.displayedProducts = [...this.products];
      this.extractCategories();
    });
  }

  extractCategories(): void {
    const uniqueCategories = new Set(this.products.map((product) => product.category));
    this.categories = Array.from(uniqueCategories);
  }

  filterByCategory(category: string): void {
    if (category === 'all') {
      this.displayedProducts = [...this.products];
    } else {
      this.displayedProducts = this.products.filter((product) => product.category === category);
    }
  }
}
