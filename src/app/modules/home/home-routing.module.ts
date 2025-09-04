import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { IndexComponent } from './pages/index/index.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { StatsUtilsComponent } from './pages/stats-utils/stats-utils.component';
import { SecurityComponent } from './pages/security/security.component';
import { FaqComponent } from './pages/faq/faq.component';
import { HelpCenterComponent } from './pages/help-center/help-center.component';
import { CguComponent } from './pages/cgu/cgu.component';
import { PromoteCyberComponent } from './pages/promote-cyber/promote-cyber.component';
import { CookiesPolicyComponent } from './pages/cookies-policy/cookies-policy.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { HelpCenterDetailComponent } from './pages/help-center/components/help-center-detail/help-center-detail.component';
import { ReportMisuseComponent } from './pages/report-misuse/report-misuse.component';
import { DeclareAssociationComponent } from './pages/declare-association/declare-association.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: IndexComponent },
      { path: 'contacts', component: ContactsComponent },
      { path: 'report-misuse', component: ReportMisuseComponent },
      { path: 'declare-association', component: DeclareAssociationComponent },
      { path: 'stats-utils', component: StatsUtilsComponent },
      { path: 'security', component: SecurityComponent },
      { path: 'faq', component: FaqComponent },
      { path: 'help', component: HelpCenterComponent },
      { path: 'help/:slug', component: HelpCenterDetailComponent },
      { path: 'cookies-policy', component: CookiesPolicyComponent },
      { path: 'privacy-policy', component: PrivacyPolicyComponent },
      { path: 'cgu', component: CguComponent },
      { path: 'promote-cyber', component: PromoteCyberComponent },
      { path: '**', redirectTo: 'errors/404' },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
