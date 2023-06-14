import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { DataService } from 'src/app/services/data.service';
import { Order } from 'src/app/interfaces/order';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-finances',
  templateUrl: './finances.component.html',
  styleUrls: ['./finances.component.css'],
})
export class FinancesComponent implements OnInit {
  onCreat: boolean = false;
  orders: Order[] = [];
  cardAmount: number = 0;
  cashAmount: number = 0;
  currentDate: Date = new Date();

  dataSource!: MatTableDataSource<Order>;
  selectedDate!: Date;
  filteredDataSource = new MatTableDataSource<Order>();
  displayedColumns: string[] = [
    'createDate',
    'pesel',
    'firstName',
    'lastName',
    'paymentMethodIsCard',
    'payment',
  ];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private data: DataService) {}

  ngOnInit() {
    this.getData();
  }

  applyDateFilter(date: Date) {
    this.selectedDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      this.currentDate.getHours(),
      this.currentDate.getMinutes(),
      this.currentDate.getSeconds()
    );
    this.dataSource.data = this.orders;
    const filterValue = this.selectedDate.toISOString().split('T')[0];
    const filteredData = this.dataSource.data.slice();
    const filteredRows = filteredData.filter((item) => {
      return (
        item &&
        item.createDate
          .split('T')[0]
          .toLowerCase()
          .includes(filterValue.toLowerCase())
      );
    });
    this.dataSource.data = filteredRows;
    this.calculateTotalAmount();
    console.log(this.selectedDate);
  }

  getData() {
    this.data
      .getOrders()
      .pipe(
        finalize(() => {
          this.onCreat = true;
          this.selectedDate = new Date();
          this.applyDateFilter(this.currentDate);
        })
      )
      .subscribe((data) => {
        this.orders = data;
        this.dataSource = new MatTableDataSource(this.orders);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        if (this.onCreat === false)
          this.sort.sort({
            id: 'createDate',
            start: 'desc',
            disableClear: true,
          });
      });
  }

  calculateTotalAmount(): void {
    this.cardAmount = 0;
    this.cashAmount = 0;
    this.dataSource.filteredData.forEach((item: Order) => {
      if (item.paymentMethodIsCard == true) this.cardAmount += item.payment;
      else if (item.paymentMethodIsCard == false)
        this.cashAmount += item.payment;
    });
  }

  paymentMethod(payment: boolean): string {
    if (payment == true) return 'Karta';
    else return 'Gotówka';
  }
}
