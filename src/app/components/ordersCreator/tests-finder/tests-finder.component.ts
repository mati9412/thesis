import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { DataService } from 'src/app/services/data.service';
import { Order } from 'src/app/interfaces/order';
import { LabTest } from 'src/app/interfaces/lab-test';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-tests-finder',
  templateUrl: './tests-finder.component.html',
  styleUrls: ['./tests-finder.component.css'],
})
export class TestsFinderComponent implements OnInit {
  tests: LabTest[] = [];
  dataSource!: MatTableDataSource<LabTest>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Output() priceChange = new EventEmitter<number>();

  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'price',
    'type',
    'external',
    'stability',
    'buy',
  ];
  constructor(private data: DataService, private cart: CartService) {}

  ngOnInit() {
    this.data.getLabTests().subscribe((data) => {
      this.tests = data;
      this.dataSource = new MatTableDataSource(this.tests);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  LabStability(test: LabTest) {
    if (test.stability === true) return 'Stabilne';
    else return 'Niestabilne';
  }

  LabExternal(test: LabTest) {
    if (test.external === true) return 'Wysyłkowe';
    else return 'Lokalnie';
  }

  addToCart(test: LabTest) {
    this.cart.addToCart(test);
    this.priceChange.emit();
  }
}
