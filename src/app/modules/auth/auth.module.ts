import { NgModule } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AuthRoutingModule } from './auth-routing.module';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [AuthRoutingModule, AngularSvgIconModule.forRoot(), ToastrModule.forRoot()],
  providers: [],
})
export class AuthModule {}
