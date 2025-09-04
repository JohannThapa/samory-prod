import { Component } from '@angular/core';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { GlassyButtonComponent } from 'src/app/shared/components/button/type/glassy-button/glassy-button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contacts',
  imports: [
    CommonModule,
    ContactFormComponent,
    TranslateModule,
    AngularSvgIconModule,
    GlassyButtonComponent,
    RouterLink,
  ],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css',
})
export class ContactsComponent {
  formSubmittedSuccessfully = false;

  onFormSubmitted() {
    this.formSubmittedSuccessfully = true;
  }
}
