import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[dtCell]',
  standalone: true,
})
export class DtCellTemplateDirective {
  @Input('dtCell') name!: string;
  constructor(public template: TemplateRef<any>) {}
}
