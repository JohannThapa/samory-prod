import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { CKEditorModule, loadCKEditorCloud, CKEditorCloudResult } from '@ckeditor/ckeditor5-angular';
import type { DecoupledEditor, EditorConfig } from 'https://cdn.ckeditor.com/typings/ckeditor5.d.ts';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { ModalDialogComponent } from 'src/app/shared/components/modal-dialog/modal-dialog.component';
import { ModalData } from 'src/app/core/models/dialog.model';
import { EnableAccountContentComponent } from './components/enable-account.component';

@Component({
  selector: 'app-forms',
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule, CKEditorModule, ButtonComponent, ModalDialogComponent],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css',
})
export class FormsComponent implements OnInit {
  form: FormGroup;
  switchForm!: FormGroup;

  public Editor: typeof DecoupledEditor | null = null;
  public config: EditorConfig | null = null;

  languages = ['English', 'French', 'Spanish', 'German'];
  years = ['0-1 Years', '2-4 Years', '5-7 Years', '8+ Years'];
  expertiseList = ['Phishing', 'Malware', 'Awareness Training'];
  availabilityOptions = ['Full-time', 'Part-time', 'Freelance'];

  isModalOpen = false;
  modalData: ModalData | null = null;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      bio: [''],
      linkedin: ['', Validators.pattern(/https?:\/\/(www\.)?linkedin\.com\/.+/)],
      languages: [[]],
      years: [null],
      expertise: [[]],
      availability: [null],
      notifications: [true, Validators.required],
      darkMode: [false],
      description: ['', Validators.required],
    });
  }
  public ngOnInit(): void {
    loadCKEditorCloud({
      version: '46.0.1',
    }).then(this._setupEditor.bind(this));
  }

  submit() {
    if (this.form.valid) {
      console.log(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }

  private _setupEditor(cloud: CKEditorCloudResult<{ version: '46.0.1' }>) {
    const { DecoupledEditor, Essentials, Paragraph, Bold, Italic, BlockQuote, Heading, List } = cloud.CKEditor;

    this.Editor = DecoupledEditor;

    this.config = {
      licenseKey: '<CK_LICENSE_KEY>',
      plugins: [Essentials, Paragraph, Bold, Italic, BlockQuote, Heading, List],
      toolbar: ['undo', 'redo', '|', 'heading', '|', 'bold', 'italic', 'bulletedList', 'numberedList', 'blockQuote'],
    };
  }
  public onReady(editor: DecoupledEditor): void {
    const element = editor.ui.getEditableElement()!;
    const parent = element.parentElement!;
    parent.insertBefore(editor.ui.view.toolbar.element!, element);
  }

  openModal(): void {
    this.modalData = {
      title: 'Enable Account',
      description:
        'Are you sure you want to enable the account for: Fatoumata Diallo (fatoumata@cybersafe.org)? The user will be able to log in immediately after enabling.',
      buttons: [
        { label: 'Cancel', action: 'cancel', variant: 'light' },
        { label: 'Enable Account', action: 'confirm', variant: 'success' },
      ],
      customComponent: EnableAccountContentComponent,
      customComponentInputs: {
        checkboxLabel: 'Send email notification to the user',
      },
    };
    this.isModalOpen = true;
  }

  onConfirmAction(): void {
    console.log('Action confirmed!');
  }
}
