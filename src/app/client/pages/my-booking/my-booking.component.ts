import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-my-booking',
  templateUrl: './my-booking.component.html',
  styleUrl: './my-booking.component.scss'
})
export class MyBookingComponent implements OnInit{
  
  bookedServices:any;

  constructor(private clientService: ClientService){}
  
  ngOnInit(): void {
    this.getMyBookings();
  }

  getMyBookings(){
    this.clientService.getMyBookings().subscribe(res => {
      this.bookedServices = res;
    })
  }

}
