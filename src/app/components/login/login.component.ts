import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { israeliIdValidator } from '../../validator/israeli-id.validator';
import { CredentialsModel } from '../models/credentials.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  credentials = new CredentialsModel();

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      id: ['', [Validators.required, israeliIdValidator()]],
      password: ['', Validators.required],
    });
  }

  async onSubmit(): Promise<void> {
    if (this.loginForm.valid) {
      const { id, password } = this.loginForm.value;
      console.log('ID:', id);
      console.log('Password:', password);
      this.credentials = { id: id, password: password };
      await this.authService.login(this.credentials);

      // Implement your login logic here
    }
  }
}
