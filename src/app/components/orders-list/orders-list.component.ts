import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { DataService } from 'src/app/services/data.service';
import { Order } from 'src/app/interfaces/order';
import { finalize } from 'rxjs';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css'],
})
export class OrdersListComponent implements OnInit {
  onCreat: boolean = false;
  orders: Order[] = [];
  dataSource!: MatTableDataSource<Order>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'createDate',
    'pesel',
    'firstName',
    'lastName',
    'delete',
  ];
  constructor(private data: DataService, private dialog: DialogService) {}

  ngOnInit() {
    this.getData();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onDeleteOrder(id: string) {
    this.data.deleteOrder(id).subscribe(() => {
      this.getData();
    });
  }

  onEditPatient(order: Order){
    this.dialog.openDialogWithData(order);
  }

  getData() {
    this.data
      .getOrders()
      .pipe(
        finalize(() => {
          this.onCreat = true;
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
}
