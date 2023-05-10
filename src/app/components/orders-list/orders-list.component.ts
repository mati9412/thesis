import {  Component, OnInit } from '@angular/core';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';

import { Person } from 'src/app/interfaces/person';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css'],
})
export class OrdersListComponent implements OnInit {
  persons: Person[] = [];
  term: string = '';

  heroes$!: Observable<Person[]>;
  private searchTerms = new Subject<string>();
  
  displayedColumns: string[] = ['id', 'Imie', 'Nazwisko'];
  constructor(private data: DataService) {};

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit() {
    this.data.getPersons().subscribe((data) => {
      this.persons = data;
    });

    this.heroes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.data.searchPersons(term)),
    );

  }

}
