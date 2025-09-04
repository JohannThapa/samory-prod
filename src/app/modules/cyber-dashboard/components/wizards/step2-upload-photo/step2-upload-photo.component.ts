import { Component, EventEmitter, Input, Output, computed } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-wizard-step2',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  styleUrl: './step2-upload-photo.component.css',
  template: `
    <div class="mx-auto" [formGroup]="group">
      <div class="mb-6 flex items-center justify-between">
        <h2 class="text-success text-xl font-semibold">Add Profile Photo</h2>
        <button type="button" class="text-primary rounded-sm bg-[#F8F4FE] py-2 px-6 text-sm" (click)="skip()">
          Skip
        </button>
      </div>

      <div class="flex flex-col items-center gap-6 py-8">
        <label class="relative">
          <input type="file" accept="image/*" class="hidden" (change)="onFileChange($event)" />

          <div *ngIf="!preview()" class="h-34 w-34 rounded-full bg-[#F8F4FE] p-1">
            <div
              class="grid h-32 w-32 cursor-pointer place-content-center rounded-full border border-dashed border-[#2304484D]">
              <div class="text-primary">
                <!-- placeholder SVG -->
                <svg width="65" height="65" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M32.5013 27.0834C38.4844 27.0834 43.3346 22.2332 43.3346 16.2501C43.3346 10.267 38.4844 5.41675 32.5013 5.41675C26.5182 5.41675 21.668 10.267 21.668 16.2501C21.668 22.2332 26.5182 27.0834 32.5013 27.0834Z"
                    fill="#230448" />
                  <path
                    opacity="0.5"
                    d="M54.1654 47.3958C54.1654 54.126 54.1654 59.5833 32.4987 59.5833C10.832 59.5833 10.832 54.126 10.832 47.3958C10.832 40.6655 20.5333 35.2083 32.4987 35.2083C44.4641 35.2083 54.1654 40.6655 54.1654 47.3958Z"
                    fill="#230448" />
                </svg>
              </div>
            </div>
          </div>

          @if (preview()){
          <div
            class="-right-18 bg-danger/70 absolute top-6 grid h-8 w-8 place-content-center rounded-full text-2xl text-white"
            (click)="removePhoto()">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </div>
          } @else {
          <div
            class="absolute right-4 bottom-2 grid h-8 w-8 place-content-center rounded-full bg-[color:var(--brand-accent)] text-2xl text-white">
            +
          </div>
          }
        </label>

        <ng-container *ngIf="preview()">
          <img [src]="preview()" alt="preview" class="h-34 w-34 rounded-full border border-violet-200" />
        </ng-container>
      </div>
    </div>
  `,
})
export class Step2UploadPhotoComponent {
  @Input({ required: true }) group!: FormGroup;
  @Output() onSkip = new EventEmitter<Event>();
  @Output() photoSelected = new EventEmitter<File>();

  preview = computed(() => {
    const val = this.group.get('photo')?.value;
    return val?.previewUrl ?? null;
  });

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      this.removePhoto();
      return;
    }

    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.group.get('photo')?.setValue({ file, previewUrl: reader.result as string });
      this.photoSelected.emit(file);
    };
    reader.readAsDataURL(file);
  }

  removePhoto() {
    this.group.get('photo')?.setValue(null);
    this.photoSelected.emit(null!);
  }

  skip(): void {
    this.onSkip.emit();
  }
}
