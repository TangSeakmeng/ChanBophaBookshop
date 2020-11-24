import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm;
  email = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  hide = true;

  constructor(
    public formBuilder: FormBuilder,
    private auth: AngularFireAuth,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, , Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
  }

  onSubmit(formData) {
    const { email, password } = formData;
    this.auth.signInWithEmailAndPassword(email, password).then(user => {
      this.router.navigate(['/admin']);
    }).catch((error) => {
      console.log(error)
    });
  }

  // getEmailErrorMessage() {
  //   console.log(this.email.hasError('required'))
  //   if (this.email.hasError('required')) {
  //     return 'You must enter an email';
  //   }

  //   return this.email.hasError('email') ? 'Not a valid email' : '';
  // }

  // getPasswordErrorMessage() {
  //   if(!this.password.hasError('required'))
  //     return 'You must enter a password.'
  //   return '';
  // }
}
