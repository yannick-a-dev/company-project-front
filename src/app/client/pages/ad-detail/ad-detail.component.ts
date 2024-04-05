import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserStorageService } from '../../../basic/services/storage/user-storage.service';

@Component({
  selector: 'app-ad-detail',
  templateUrl: './ad-detail.component.html',
  styleUrl: './ad-detail.component.scss'
})
export class AdDetailComponent implements OnInit{
  
  adId = this.activatedRoute.snapshot.params['adId'];
  avatarUrl:any;
  ad:any;
  validateform: FormGroup;
  reviews:any;

  constructor(private clientService: ClientService,
             private activatedRoute: ActivatedRoute,
             private notification: NzNotificationService,
             private router: Router,
             private fb: FormBuilder){}

  ngOnInit(): void {
    this.validateform = this.fb.group({
      bookDate:[null,[Validators.required]]
    })
   this.getAdDetailsByAdId();
  }

  getAdDetailsByAdId(){
    this.clientService.getAdDetailsByAdId(this.adId).subscribe(res => {
      console.log(res);
      this.avatarUrl = res.adDTO.returnedImg;
      this.ad = res.adDTO;
      this.reviews = res.reviewDTOList;
    })
  }

  bookService(){
    const bookServiceDTO = {
      bookDate: this.validateform.get(['bookDate']).value,
      adId:  this.adId,
      userId: UserStorageService.getUserId()
    }
    this.clientService.bookService(bookServiceDTO).subscribe(res => {
      this.notification
      .success(
        'SUCCESS',
        `Request posted successfully`,
        {nzDuration: 5000}
      );
      this.router.navigateByUrl('/client/bookings');
    })
  }
}
