import { Component, EventEmitter, Output } from '@angular/core';
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs';
import { LabTest } from 'src/app/interfaces/lab-test';
import { CartService } from 'src/app/services/cart.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  tests$!: Observable<LabTest[]>;
  cartTests: LabTest [] = [];
  private searchTerms = new Subject<string>();
  @Output() priceChange = new EventEmitter<number>();

  constructor(private data: DataService, private cart: CartService) {}

  search(term: string): void {
    this.searchTerms.next(term);
  }

  addToCart(item: LabTest) {
    this.cart.addToCart(item);
    this.priceChange.emit();
  }

  getCart(){
    this.cartTests = this.cart.getItems();
  }

  removeFromCart(test: LabTest){
    this.cart.removeItem(test);
    this.priceChange.emit();
  }

  ngOnInit() {
    this.getCart();
    this.tests$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.data.searchLabTestsByName(term))
    );
  }
}
