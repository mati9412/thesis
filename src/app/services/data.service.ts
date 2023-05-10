import { Injectable } from '@angular/core';
import { Order } from '../interfaces/order';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Person } from '../interfaces/person';
import { Observable, of, tap } from 'rxjs';
import { map } from 'rxjs';
import { LabTest } from '../interfaces/lab-test';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  source: string =
    'https://thesis-f6bb3-default-rtdb.europe-west1.firebasedatabase.app/';

    labsSource: string =
      'https://thesis-f6bb3-default-rtdb.europe-west1.firebasedatabase.app/lab-tests.json';
    ordersSource: string =
      'https://thesis-f6bb3-default-rtdb.europe-west1.firebasedatabase.app/orders.json';
    
  constructor(private http: HttpClient) {}

  createOrder(order: Order) {
    return this.http.post(this.ordersSource, order);
  }

  getPersons(): Observable<Person[]> {
    return this.http
      .get<{ [key: string]: Person }>(this.source + 'persons.json')
      .pipe(
        map((response) => {
          const data: Person[] = [];
          for (const key in response) {
            if (response.hasOwnProperty(key)) {
              data.push({ ...response[key], id: key });
            }
          }
          return data;
        })
      );
  }
  searchPersons(query: string): Observable<Person[]> {
    return this.http
      .get<{ [key: string]: Person }>(this.source + 'persons.json')
      .pipe(
        map((response) => {
          const data: Person[] = [];
          for (const key in response) {
            if (response.hasOwnProperty(key)) {
              data.push({ ...response[key], id: key });
            }
          }
          return data.filter((el) =>
            el.firstName.toLowerCase().includes(query.toLowerCase())
          );
        })
      );
  }
  searchOrdersByName(query: string): Observable<LabTest[]> {
    if (!query.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<{ [key: string]: LabTest }>(this.labsSource).pipe(
      map((response) => {
        const data: LabTest[] = [];
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            data.push({ ...response[key], id: key });
          }
        }
        return data.filter((el) =>
          el.name.toLowerCase().includes(query.toLowerCase())
        );
      })
    );
  }
}

// getPersons(): Observable<Person[]> {
//   return this.http.get<Person[]>(this.source + 'persons.json').pipe(
//     map((response) => {
//       const data = [];
//       for (const key in response) {
//         if (response.hasOwnProperty(key)) {
//           data.push({ id: key, ...response[key] });
//         }
//       }
//       return data;
//     })
//   );
// }

// getPersons(): Observable<Person[]> {
//   return this.http.get<{[key: string]: Person}>(this.source + 'persons.json').pipe(
//     map((responseData) => Object.values(responseData))
//   ).pipe(tap(console.log));
// }

// searchPerson(term: string): Observable<Person[]> {
//   if (!term.trim()) {
//     // if not search term, return empty hero array.
//     return of([]);
//   }
//   return this.http
//     .get<{ [key: string]: Person }>(
//       `${this.source}persons/?id=${term}.json'`
//     )
//     // .pipe(
//     //   map((response) => {
//     //     const data: Person[] = [];
//     //     for (const key in response) {
//     //       if (response.hasOwnProperty(key)) {
//     //         data.push({ ...response[key], id: key });
//     //       }
//     //     }
//     //     return data;
//     //   })
//     // )
//     .pipe(tap(console.log));
// }
