import { Component, WritableSignal, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { WizardData } from 'src/app/core/models/wizard.module';
import { stepSlide } from 'src/app/core/utils/wizard-animations';
import { Step1BasicInfoComponent } from './step1-basic-info/step1-basic-info.component';
import { Step2UploadPhotoComponent } from './step2-upload-photo/step2-upload-photo.component';
import { Step3PreferencesComponent } from './step3-preferences/step3-preferences.component';
import { Step4ExperienceComponent } from './step4-experience/step4-experience.component';
import { WizardStepperComponent } from './wizard-stepper/wizard-stepper.component';
import { onlyCharactersValidator, phoneNumberValidator } from 'src/app/core/utils/form-validators';

@Component({
  selector: 'app-wizard',
  styleUrl: './wizards.component.css',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    WizardStepperComponent,
    Step1BasicInfoComponent,
    Step2UploadPhotoComponent,
    Step3PreferencesComponent,
    Step4ExperienceComponent,
  ],
  animations: [stepSlide],
  template: `
    <section class="background-grid h-full min-h-screen">
      <app-wizard-stepper [current]="currentStep"></app-wizard-stepper>

      <form [formGroup]="form" class="step-card relative mx-auto max-w-[730px] p-8">
        <div class="mx-auto max-w-3xl" [@stepSlide]="currentStep()">
          <ng-container [ngSwitch]="currentStep()">
            <app-wizard-step1
              *ngSwitchCase="1"
              [group]="stepGroup(1)"
              (onSkip)="next()"
              [currentStep]="currentStep()" />
            <!-- <app-wizard-step2 *ngSwitchCase="2" [group]="stepGroup(2)" (onSkip)="next()" /> -->
            <app-wizard-step2
              *ngSwitchCase="2"
              [group]="stepGroup(2)"
              (onSkip)="next()"
              (photoSelected)="onPhotoSelected($event)" />

            <app-wizard-step3 *ngSwitchCase="3" [group]="stepGroup(3)" (onSkip)="next()" />
            <app-wizard-step4 *ngSwitchCase="4" [group]="stepGroup(4)" />

            <button
              [disabled]="!form.valid"
              [ngClass]="{ 'border-danger text-danger': !form.valid }"
              (click)="currentStep() === 4 ? submit() : next()"
              class="bg-primary hover:bg-primary-light mt-4 w-full cursor-pointer rounded-xl py-3 font-semibold text-white transition-colors duration-200">
              @if (currentStep() === 4) {
              <span>Finish Onboarding</span>
              } @else {
              <span>Next</span>
              }
            </button>

            @if (currentStep() > 1 && currentStep() <= 4) {
            <button
              (click)="prev()"
              class="mt-4 w-full cursor-pointer rounded-xl bg-[#00A062] py-3 font-semibold text-white transition-colors duration-200 hover:bg-green-300">
              Back
            </button>
            }
          </ng-container>
        </div>
      </form>
    </section>
  `,
})
export class WizardComponent {
  private fb = inject(FormBuilder);

  currentStep: WritableSignal<number> = signal(1);

  form: FormGroup = this.fb.group({
    step1: this.fb.group({
      fullName: ['', [Validators.required, onlyCharactersValidator]],
      address: [''],
      phoneNumber: ['', phoneNumberValidator],
    }),
    step2: this.fb.group({
      photo: [null],
    }),
    step3: this.fb.group({
      receiveEmails: [true],
      receiveSms: [false],
      canBeMobilized: [false],
      canBeContacted: [false],
      ghostMode: [false],
    }),
    step4: this.fb.group({
      bio: [''],
      linkedinProfile: ['', [Validators.pattern(/^(http|https):\/\/(www\.)?linkedin\.com\/.*$/i)]],
      languages: [[] as string[]],
      yearsOfExperience: [null as number | null],
      expertise: [[] as string[]],
      availability: [''],
    }),
  });

  protected stepGroup(idx: number): FormGroup {
    return this.form.get(`step${idx}`) as FormGroup;
  }

  next() {
    const g = this.stepGroup(this.currentStep());
    g.markAllAsTouched();
    if (g.valid) this.currentStep.update((v) => Math.min(4, v + 1));
  }

  prev() {
    this.currentStep.update((v) => Math.max(1, v - 1));
  }
  onPhotoSelected(file: File) {
    if (!file) {
      this.stepGroup(2).get('photo')?.setValue(null);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.stepGroup(2)
        .get('photo')
        ?.setValue({
          file,
          previewUrl: reader.result as string,
        });
    };
    reader.readAsDataURL(file);
  }

  submit() {
    if (this.form.invalid) {
      this.stepGroup(this.currentStep()).markAllAsTouched();
      return;
    }
    const payload: WizardData = this.form.getRawValue() as WizardData;
    console.log('Submitting payload', payload);
    alert('Profile setup complete! Check console for payload.');
  }
}
