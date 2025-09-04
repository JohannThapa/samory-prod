import { Component } from '@angular/core';
import { SubsContainerComponent } from '../index/components/subs-container/subs-container.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-cgu',
  imports: [SubsContainerComponent, TranslateModule],
  templateUrl: './cgu.component.html',
  styleUrl: './cgu.component.css',
})
export class CguComponent {}
