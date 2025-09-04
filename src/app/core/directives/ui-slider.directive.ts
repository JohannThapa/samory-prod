import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appUiSlider]',
})
export class UiSliderDirective {
  constructor(public readonly tpl: TemplateRef<unknown>) {}
}
