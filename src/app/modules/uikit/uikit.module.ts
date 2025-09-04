import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UikitRoutingModule } from './uikit-routing.module';
import { CustomInputComponent } from 'src/app/shared/components/forms/custom-input/custom-input.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, UikitRoutingModule, CustomInputComponent],
})
export class UikitModule {}
