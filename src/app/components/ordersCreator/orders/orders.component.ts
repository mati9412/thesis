import { Component, OnDestroy, OnInit } from '@angular/core';
import { LabTest } from 'src/app/interfaces/lab-test';
import { Order } from 'src/app/interfaces/order';
import { Person } from 'src/app/interfaces/person';
import { CartService } from 'src/app/services/cart.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnDestroy {
  currentDate = new Date();
  order: Order = {
    barcode: 0,
    createDate: this.currentDate.toISOString(),
    person: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      pesel: '',
    },
    labTests: [],
  };

  fullPrice: number = 0;

  constructor(private data: DataService, private cart: CartService) {}

  send() {
    this.data.createOrder(this.order).subscribe((response) => {
      console.log(response);
    });
    this.order.person.firstName = '';
    this.order.person.lastName = '';
    this.order.person.email = '';
    this.order.person.phoneNumber = '';
    this.order.person.pesel = '';
  }

  updateCart() {
    this.order.labTests = this.cart.getItems();
    this.fullPrice = this.cart.getPrice();
  }
  ngOnDestroy(): void {
    this.cart.clearCart();
  }
}
