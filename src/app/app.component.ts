import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSonnerToaster } from 'ngx-sonner';
import { ThemeService } from './core/services/theme.service';
import { ResponsiveHelperComponent } from './shared/components/responsive-helper/responsive-helper.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterOutlet, ResponsiveHelperComponent, NgxSonnerToaster],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {
  protected readonly title = signal('Samory - Mon Aide Cyber');

  constructor(public themeService: ThemeService) {}
}
