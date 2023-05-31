import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TestsFinderComponent } from '../components/ordersCreator/tests-finder/tests-finder.component';
import { Order } from '../interfaces/order';
import { UpdatePersonComponent } from '../components/orders-list/update-person/update-person.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  openCardFinder() {
    const dialogRef = this.dialog.open(TestsFinderComponent);
    return dialogRef.componentInstance.priceChange;
  }

  openDialogWithData(data: Order): void {
    const dialogRef = this.dialog.open(UpdatePersonComponent, {
      data: data,
    });
  }
}
