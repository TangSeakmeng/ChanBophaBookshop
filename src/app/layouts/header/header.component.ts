import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  searchProductForm;
  selectedOption = "Name";

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.searchProductForm = this.formBuilder.group({
      option: 'Name',
      keyword: ''
    })
  }

  ngOnInit(): void {
  }

  changePassword() {

  }

  onLogOut() {
    this.auth.signOut();
    this.router.navigate(['login']);
  }

  onSubCategoryChanged(event: any) {
    this.selectedOption = event.value;
  }

  onSubmit(formData) {
    if(formData.keyword == '') {
      alert('Please enter any keyword!')
      return;
    }

    this.router.navigateByUrl(`/admin/product-management/products/${formData.option}/${formData.keyword}`)
  }
}
