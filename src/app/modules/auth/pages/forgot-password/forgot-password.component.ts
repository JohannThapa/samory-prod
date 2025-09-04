import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
})
export class ForgotPasswordComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  isLoading = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.successMessage = null;
    this.errorMessage = null;

    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;

    this.authService.forgotPassword(this.form.value.email).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.successMessage = response.message || 'A password reset link has been sent to your email.';
        this.form.reset();
        this.submitted = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.message || 'Failed to send password reset link.';
      },
    });
  }
}
