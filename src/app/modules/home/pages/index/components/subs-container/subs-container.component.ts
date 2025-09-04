import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { NewsletterService } from 'src/app/core/services/newsletter.service';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';

@Component({
  selector: 'app-subs-container',
  standalone: true, // You may need to add standalone: true
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './subs-container.component.html',
  styleUrl: './subs-container.component.css',
})
export class SubsContainerComponent implements OnInit, OnDestroy {
  newsletterForm: FormGroup;
  private destroy$ = new Subject<void>();
  isLoading: boolean = false;
  submissionSuccess: boolean = false;
  submissionError: string | null = null;

  constructor(private fb: FormBuilder, private subs: NewsletterService, private toastrService: ToastrService) {
    this.newsletterForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
  get f() {
    return this.newsletterForm.controls;
  }
  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onSubmit() {
    if (this.newsletterForm.valid) {
      this.isLoading = true;
      this.submissionError = null;

      const { email } = this.newsletterForm.value;

      this.subs
        .submitSubscriptionForm({ email })
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            this.isLoading = false;
            this.submissionSuccess = true;
            this.newsletterForm.reset();
            this.toastrService.success(response.message || 'Subscribed successfully!');
          },
          error: (err) => {
            this.isLoading = false;
            const errorMessage = err.error?.message || 'An error occurred. Please try again later.';
            this.submissionError = errorMessage;
            console.error('Submission error:', err);
            this.toastrService.error(errorMessage);
          },
        });
    } else {
      this.newsletterForm.markAllAsTouched();
    }
  }
}
