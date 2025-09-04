import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-resend-email',
  templateUrl: './resend-email.component.html',
  styleUrls: ['./resend-email.component.css'],
  imports: [CommonModule, ReactiveFormsModule, AngularSvgIconModule, RouterLink],
})
export class ResendEmailComponent implements OnInit {
  form!: FormGroup<{
    email: FormControl<string>;
  }>;

  submitted = false;
  isLoading = false;
  message: string | null = null;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.fb.group({
      email: this.fb.nonNullable.control('', {
        validators: [Validators.required, Validators.email],
      }),
    });
  }

  onSubmit(): void {
    this.submitted = true;
    this.message = null;
    this.errorMessage = null;

    if (this.form.invalid) return;

    this.isLoading = true;

    this.authService.resendConfirmMail(this.form.value.email!).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.message = response.message || `Verification email has been resent to ${this.form.value.email}`;
        this.form.reset();
        this.submitted = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.message || 'Failed to resend the email.';
      },
    });
  }

  get f() {
    return this.form.controls;
  }
}
