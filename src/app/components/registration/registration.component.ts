import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NotifyService } from '../services/notify.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private notify: NotifyService
  ) {
    this.form = this.fb.group({
      identificationNumber: ['', [Validators.required]],
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  ngOnInit(): void {
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  async submit(): Promise<void> {
    try {
      if (this.form.valid) {
        const { identificationNumber, fullName, email, password } = this.form.value;
        await this.authService.register({ identificationNumber, fullName, email, password });
        this.notify.success('Registered successfully!');
      } else {
        this.notify.error('Form is invalid!');
      }
    } catch (error) {
      this.notify.error(error.message || 'Failed to register!');
    }
  }
}
