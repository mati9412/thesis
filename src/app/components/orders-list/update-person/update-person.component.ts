import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Order } from 'src/app/interfaces/order';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-update-person',
  templateUrl: './update-person.component.html',
  styleUrls: ['./update-person.component.css']
})
export class UpdatePersonComponent implements OnInit{

  order!: Order;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Order, private dataService: DataService) {}

  ngOnInit(): void {
    this.order = this.data;
  }

  update(){
    this.dataService.updateOrder(this.order).subscribe();
  }

}
