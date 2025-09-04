import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { CyberHelperComponent } from './components/cyber-helper/cyber-helper.component';
import { CyberPartComponent } from './components/cyber-part/cyber-part.component';
import { QuoteListsComponent } from './components/quote-lists/quote-lists.component';
import { SupportSliderComponent } from './components/support-slider/support-slider.component';
import { ReadyBannerComponent } from './components/ready-banner/ready-banner.component';
import { SubsContainerComponent } from './components/subs-container/subs-container.component';
import { ChatbotService } from 'src/app/core/services/chatbot.service';
import { ChatbotComponent } from '../../components/chatbot/chatbot.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  imports: [
    ButtonComponent,
    TranslateModule,
    CommonModule,
    AngularSvgIconModule,
    CyberHelperComponent,
    CyberPartComponent,
    QuoteListsComponent,
    SupportSliderComponent,
    ReadyBannerComponent,
    SubsContainerComponent,
    ChatbotComponent,
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
})
export class IndexComponent {
  private readonly chatbot = inject(ChatbotService);
  open = this.chatbot.open;

  constructor(private router: Router) {}
  toCyberHelper() {
    this.router.navigateByUrl('/auth/register-helper');
  }
  toggleChat() {
    this.chatbot.toggleFromFab();
  }
  onLogoSlide(index: number) {
    console.log('Active logo index:', index);
  }
}
