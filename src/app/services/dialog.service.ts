import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TestsFinderComponent } from '../components/ordersCreator/tests-finder/tests-finder.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  openComponentInCard() {
    const dialogRef = this.dialog.open(TestsFinderComponent);
    return dialogRef.componentInstance.priceChange;
  }
}
