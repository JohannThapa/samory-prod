import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { IconButtonComponent } from 'src/app/shared/components/icon-button/icon-button.component';

@Component({
  selector: 'app-buttons',
  imports: [CommonModule, IconButtonComponent, ButtonComponent],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.css',
})
export class ButtonsComponent {
  title = 'icon-button-example';

  handlePrimaryClick() {
    console.log('Primary icon button clicked!');
  }

  handleSendClick() {
    console.log('Success icon button clicked!');
  }

  handleDangerClick() {
    console.log('Danger icon button clicked!');
  }

  handleLightClick() {
    console.log('Light icon button clicked!');
  }

  handleButtonPrimaryClick() {
    console.log('Primary button clicked!');
  }

  handleButtonDangerClick() {
    console.log('Danger button clicked!');
  }

  handleButtonSuccessClick() {
    console.log('Success button clicked!');
  }

  handleButtonWarningClick() {
    console.log('Warning button clicked!');
  }
}
