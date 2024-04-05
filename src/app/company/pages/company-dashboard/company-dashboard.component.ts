import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrl: './company-dashboard.component.scss'
})
export class CompanyDashboardComponent implements OnInit {

  bookings: any;
  constructor(private companyService: CompanyService,
    private notification: NzNotificationService) { }

  ngOnInit(): void {
    this.getAllAdBookings();
  }

  getAllAdBookings() {
    this.companyService.getAllAdBookings().subscribe(res => {
      console.log(res);
      this.bookings = res;
    })
  }

  changeBookingsStatus(bookingId: number, status: string) {
    this.companyService.changeBookingStatus(bookingId, status).subscribe(res => {
      this.notification
        .success(
          'SUCCESS',
          `Booking status changed successfully`,
          { nzDuration: 5000 }
        );
      this.getAllAdBookings();
    }, error => {
      this.notification
      .error(
        'ERROR',
        `${error.message}`,
        { nzDuration: 5000 }
      );
    })
  }
}
