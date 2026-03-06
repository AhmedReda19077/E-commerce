import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [ReactiveFormsModule],
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private auth: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  errorMessage = signal<string>("");
  isLoading = signal<boolean>(false);

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/)]),
    rePassword: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/)]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^(01)[0125][0-9]{8}$/)])
  }, this.customValid)

  customValid(myForm: AbstractControl) {
    if (myForm.get("password")?.value === myForm.get("rePassword")?.value) {
      return null;
    }
    else {
      return { notMatched: true };
    }
  }

  registerSubmit() {
    if (this.registerForm.valid) {
      this.isLoading.set(true);
      this.auth.registerAPI(this.registerForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.message == "success") {
            this.isLoading.set(false);
            this.router.navigate(["/login"]);
          }
        },
        error: (err) => {
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
