import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [HomeRoutingModule, AngularSvgIconModule.forRoot(), ToastrModule.forRoot()],
  providers: [provideHttpClient(withInterceptorsFromDi())],
})
export class HomeModule {}
