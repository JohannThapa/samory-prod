import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { passwordStrengthValidator, passwordMatchValidator } from 'src/app/core/utils/password';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  submitted = false;
  isLoading = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  passwordVisible = false;
  token: string | null = null;
  private sub!: Subscription;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.sub = this.route.queryParams.subscribe((params) => {
      this.token = params['token'];
      if (!this.token) {
        this.errorMessage = 'Invalid password reset link. Please try again.';
      }
    });

    this.form = this.fb.group(
      {
        newPassword: ['', [Validators.required, passwordStrengthValidator]],
        email: ['', [Validators.required, Validators.email]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: passwordMatchValidator },
    );
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  get f() {
    return this.form.controls;
  }

  togglePassword() {
    this.passwordVisible = !this.passwordVisible;
  }

  onSubmit() {
    this.submitted = true;
    this.successMessage = null;
    this.errorMessage = null;

    if (this.form.invalid || !this.token) {
      return;
    }

    this.isLoading = true;
    const payload = {
      token: this.token,
      newPassword: this.form.value.newPassword,
      email: this.form.value.email,
    };

    this.authService.resetPassword(payload).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.successMessage = response.message || 'Your password has been reset successfully!';
        this.form.reset();
        this.submitted = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.message || 'Failed to reset password. Please try again.';
      },
    });
  }
}
