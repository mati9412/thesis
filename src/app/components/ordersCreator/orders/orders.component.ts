import { Component, OnDestroy } from '@angular/core';
import { finalize } from 'rxjs';
import { Order } from 'src/app/interfaces/order';
import { CartService } from 'src/app/services/cart.service';
import { DataService } from 'src/app/services/data.service';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnDestroy {
  currentDate = new Date();
  order: Order = {
    createDate: this.currentDate.toISOString(),
    person: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      pesel: '',
    },
    labTests: [],
    barcode: '',
    payment: 0,
    paymentMethodIsCard: true,
  };

  constructor(
    private data: DataService,
    private cart: CartService,
    private dialogService: DialogService
  ) {}

  send() {
    if (this.order.labTests.length == 0) alert("Brak badań w koszyku")
    else {
    this.data
      .createOrder(this.order)
      .pipe(
        finalize(() => {
          alert(`Dodano nowe zlecenie o numerze ${this.order.barcode}`)
          this.data.reloadComponent();
        })
      )
      .subscribe();
    }
  }

  updateCart() {
    this.order.labTests = this.cart.getItems();
    this.order.payment = this.cart.getPrice();
  }

  openDialog() {
    this.dialogService.openCardFinder().subscribe(() => {
      this.updateCart();
    });
  }
  
  ngOnDestroy(): void {
    this.cart.clearCart();
  }

}
