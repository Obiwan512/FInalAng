import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class AdminDashboardComponent implements OnInit {
  products: any[] = [];
  selectedProduct: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.http.get<any[]>('https://fakestoreapi.com/products').subscribe((data) => {
      this.products = data;
    });
  }


  deleteProduct(index: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.products.splice(index, 1);
      alert('Product deleted successfully!');
    }
  }


  editProduct(product: any): void {
    this.selectedProduct = { ...product }; 
  }


  updateProduct(): void {
    if (this.selectedProduct) {
      const index = this.products.findIndex((p) => p.id === this.selectedProduct.id);
      if (index !== -1) {
        this.products[index] = { ...this.selectedProduct }; 
        alert('Product updated successfully!');
        this.selectedProduct = null;
      }
    }
  }


  cancelEdit(): void {
    this.selectedProduct = null;
  }
}
