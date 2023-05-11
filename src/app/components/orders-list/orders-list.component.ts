import { Component, OnInit } from '@angular/core';
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

import { Person } from 'src/app/interfaces/person';
import { DataService } from 'src/app/services/data.service';
import { Order } from 'src/app/interfaces/order';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css'],
})
export class OrdersListComponent implements OnInit {
  orders: Order[] = [];
  term: string = '';

  displayedColumns: string[] = ['id', 'Imie', 'Nazwisko'];
  constructor(private data: DataService) {}

  ngOnInit() {
    this.data.getOrders().subscribe((data) => {
      this.orders = data;
    });
  }
}
