import { Injectable } from '@angular/core';
import { LabTest } from '../interfaces/lab-test';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  tests: LabTest[] = [];

  price: number = 0;

  constructor() { }
  
    addToCart(product: LabTest) {
      this.tests.push(product);
      this.price += product.price;
    }
  
    getItems() {
      return this.tests;
    }
    removeItem(product: LabTest){
      this.tests.splice(this.tests.indexOf(product),1);
      this.price -= product.price;
    }
  
    clearCart() {
      this.tests = [];
      this.price = 0;
      return this.tests;
    }

    getPrice(): number{
      return this.price;
    }

}
