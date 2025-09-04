import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ToastrService } from 'ngx-toastr';
import { ContactService } from 'src/app/core/services/contact.service';

@Component({
  selector: 'app-contact-form',
  imports: [CommonModule, ReactiveFormsModule, AngularSvgIconModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css',
})
export class ContactFormComponent {
  @Output() formSubmitted = new EventEmitter<void>();

  contactForm: FormGroup;
  isLoading = false;
  submissionError: string | null = null;

  constructor(private fb: FormBuilder, private contactService: ContactService, private toastrService: ToastrService) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]],
      consent: [false, [Validators.requiredTrue]],
    });
  }

  get f() {
    return this.contactForm.controls;
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.isLoading = true;
      this.submissionError = null;

      const { name, email, message } = this.contactForm.value;

      this.contactService.submitContactForm({ name, email, message }).subscribe({
        next: () => {
          this.formSubmitted.emit();
          this.isLoading = false;
          this.toastrService.success('Submitted Successfuly!');
        },
        error: (err) => {
          this.isLoading = false;
          this.submissionError = 'An error occurred. Please try again later.';
          console.error('Submission error:', err);
          this.toastrService.error('Submission error!');
        },
      });
    }
  }
}
