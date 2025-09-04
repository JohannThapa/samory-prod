import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { ReportService } from 'src/app/core/services/report.service';

@Component({
  selector: 'app-report-misuse',
  imports: [CommonModule, ReactiveFormsModule, AngularSvgIconModule, TranslateModule, RouterLink],
  templateUrl: './report-misuse.component.html',
  styleUrl: './report-misuse.component.css',
})
export class ReportMisuseComponent implements OnDestroy {
  reportForm: FormGroup;
  isLoading = false;
  submissionSuccess = false;
  submissionError: string | null = null;
  misuseTypes = ['Harassment', 'Inappropriate Behavior', 'Spam', 'Fraud', 'Threats', 'Other'];

  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder, private reportService: ReportService, private toastrService: ToastrService) {
    this.reportForm = this.fb.group({
      reporterEmail: ['', [Validators.email]],
      reportedEmail: ['', [Validators.required, Validators.email]],
      misuseType: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(20)]],
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get f() {
    return this.reportForm.controls;
  }

  onSubmit() {
    if (this.reportForm.valid) {
      this.isLoading = true;
      this.submissionError = null;

      const { reporterEmail, reportedEmail, description } = this.reportForm.value;

      this.reportService
        .submitReport({ reporterEmail, reportedEmail, description })
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            this.isLoading = false;
            this.submissionSuccess = true;
            this.toastrService.success(response.message || 'Report submitted successfully!');
          },
          error: (err) => {
            this.isLoading = false;
            this.submissionError = 'An error occurred. Please try again later.';
            console.error('Submission error:', err);
            this.toastrService.error('Submission failed!');
          },
        });
    } else {
      this.reportForm.markAllAsTouched();
    }
  }
}
