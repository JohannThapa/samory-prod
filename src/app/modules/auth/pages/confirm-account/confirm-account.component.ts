import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-confirm-account',
  templateUrl: './confirm-account.component.html',
  styleUrl: './confirm-account.component.css',
  imports: [CommonModule, RouterLink, AngularSvgIconModule],
})
export class ConfirmAccountComponent implements OnInit, OnDestroy {
  isLoading = true;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  private sub!: Subscription;

  constructor(private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit(): void {
    this.sub = this.route.queryParams.subscribe((params) => {
      const token = params['token'];
      if (token) {
        this.confirmAccount(token);
      } else {
        this.isLoading = false;
        this.errorMessage = 'No confirmation token found in the URL. Please use the link from your email.';
      }
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  private confirmAccount(token: string): void {
    this.isLoading = true;
    this.successMessage = null;
    this.errorMessage = null;

    this.authService.confirmAccount(token).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.successMessage = response.message || 'Your account has been successfully confirmed!';
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.message;
      },
    });
  }
}
