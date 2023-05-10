import { Injectable } from '@angular/core';
import { LabTest } from '../interfaces/lab-test';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  tests: LabTest[] = [];

  constructor() { }
  
    addToCart(product: LabTest) {
      this.tests.push(product);
    }
  
    getItems() {
      return this.tests;
    }
  
    clearCart() {
      this.tests = [];
      return this.tests;
    }

}
