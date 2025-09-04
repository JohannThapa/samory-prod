import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { AssociationService } from 'src/app/core/services/association.service';
import { SuccessCardComponent } from 'src/app/shared/components/cards/success-card/success-card.component';

@Component({
  selector: 'app-declare-association',
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, AngularSvgIconModule, RouterLink, SuccessCardComponent],
  templateUrl: './declare-association.component.html',
  styleUrl: './declare-association.component.css',
})
export class DeclareAssociationComponent implements OnDestroy {
  associationForm: FormGroup;
  isLoading = false;
  submissionSuccess = false;
  submissionError: string | null = null;
  selectedFile: File | null = null;

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private associationService: AssociationService,
    private toastrService: ToastrService,
  ) {
    this.associationForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      website: ['', [Validators.required]],
      address: ['', [Validators.required]],
      responsibleName: ['', [Validators.required]],
      responsibleEmail: ['', [Validators.required, Validators.email]],
      responsiblePhone: ['', [Validators.required]],
      termsConsent: [false, Validators.requiredTrue],
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get f() {
    return this.associationForm.controls;
  }

  onFileSelected(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    const fileList: FileList | null = element.files;
    if (fileList && fileList.length > 0) {
      this.selectedFile = fileList[0];
    } else {
      this.selectedFile = null;
    }
  }

  onSubmit() {
    // if (this.associationForm.valid && this.selectedFile) {
    if (this.associationForm.valid) {
      this.isLoading = true;
      this.submissionError = null;

      const formData = new FormData();
      formData.append('name', this.f['name'].value);
      formData.append('description', this.f['description'].value);
      formData.append('email', this.f['email'].value);
      formData.append('phone', this.f['phone'].value);
      formData.append('website', this.f['website'].value);
      formData.append('address', this.f['address'].value);
      formData.append('responsibleName', this.f['responsibleName'].value);
      formData.append('responsibleEmail', this.f['responsibleEmail'].value);
      formData.append('responsiblePhone', this.f['responsiblePhone'].value);
      // formData.append('photoFile', this.selectedFile, this.selectedFile.name);

      this.associationService
        .declareAssociation(formData)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.isLoading = false;
            this.submissionSuccess = true;
            this.toastrService.success('Association declared successfully!');
          },
          error: (err) => {
            this.isLoading = false;
            this.submissionError = 'An error occurred. Please try again later.';
            console.error('Submission error:', err);
            this.toastrService.error('Submission failed!');
          },
        });
    } else {
      this.associationForm.markAllAsTouched();
      if (!this.selectedFile) {
        this.toastrService.error('Please upload an association photo.');
      }
    }
  }
}
