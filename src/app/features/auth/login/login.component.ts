import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private auth: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  errorMessage = signal<string>("");
  isLoading = signal<boolean>(false);

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/)])
  })


  loginSubmit() {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      this.auth.loginAPI(this.loginForm.value).subscribe({
        next: (res) => {
          if (res.message == "success") {
            this.isLoading.set(false);
            localStorage.setItem("userToken", res.token);
            this.auth.setUserData()
            this.router.navigate(["/home"]);
            // console.log(res)
          }
        },
        error: (err) => {
          console.log(err)
          this.errorMessage.set(err.error.message);
          this.isLoading.set(false);
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }
      })
    }
  }
}
