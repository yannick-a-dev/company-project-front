import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-update-ad',
  templateUrl: './update-ad.component.html',
  styleUrl: './update-ad.component.scss'
})
export class UpdateAdComponent implements OnInit {

  adId: any = this.activatedRoute.snapshot.params['id'];
  selectedFile: File | null;
  imagePreview: string | ArrayBuffer | null;
  validateForm: FormGroup;
  existingImage: string | null = null;

  imgChanged = false;

  constructor(private fb: FormBuilder,
    private notification: NzNotificationService,
    private router: Router,
    private companyService: CompanyService,
    private activatedRoute: ActivatedRoute) { }


  ngOnInit(): void {
    this.validateForm = this.fb.group({
      serviceName: [null, [Validators.required]],
      description: [null, [Validators.required]],
      price: [null, [Validators.required]],
    })
    this.getAdById();
  }

  getAdById() {
    this.companyService.getAdById(this.adId).subscribe(res => {
      console.log(res);
      this.validateForm.patchValue(res);
      this.existingImage = 'data:image/jpeg;base64,'+res.returnedImg;
    })
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.previewImage();
    this.existingImage = null;
    this.imgChanged = true;
  }
  
  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(this.selectedFile);
  }

  updateAd() {
    const formData: FormData = new FormData();
    if(this.imgChanged && this.selectedFile){
      formData.append('img', this.selectedFile);
    }
    formData.append('serviceName', this.validateForm.get('serviceName').value);
    formData.append('description', this.validateForm.get('description').value);
    formData.append('price', this.validateForm.get('price').value);

    this.companyService.updateAd(this.adId,formData).subscribe(res => {
      this.notification
        .success(
          'SUCCESS',
          `Ad Update Successfully`,
          { nzDuration: 5000 }
        );
      this.router.navigateByUrl('/company/ads');
    }, error => {
      this.notification
        .error(
          'ERROR',
          `${error.error}`,
          { nzDuration: 5000 }
        )
    })
  }
}
