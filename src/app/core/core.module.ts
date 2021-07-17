import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { SlideMenuModule } from 'primeng/slidemenu';
import { RippleModule } from 'primeng/ripple';
import { DialogModule } from 'primeng/dialog';

import { HeaderComponent } from './components/header/header.component';
import { CoreRoutingModule } from './core-routing.module';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { MainTemplateComponent } from './templates/main-template/main-template.component';
import { UserAuthModule } from '../modules/user-auth/user-auth.module';
import { SidePanelModule } from '../side-panel/side-panel.module';
import { TimezoneOffsetInterceptor } from './interceptors/timezone-offset.interceptor';
import { FakeBackendInterceptor } from '../modules/api-mock/interceptors/fake-backend.interceptor';
import { InfoButtonComponent } from './components/info-button/info-button.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    HeaderComponent,
    PageNotFoundComponent,
    MainTemplateComponent,
    PageNotFoundComponent,
    MainTemplateComponent,
    InfoButtonComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,

    MenubarModule,
    ButtonModule,
    SidebarModule,
    SlideMenuModule,
    RippleModule,
    DialogModule,

    SharedModule,
    SidePanelModule,
    UserAuthModule,
    CoreRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TimezoneOffsetInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: FakeBackendInterceptor,
      multi: true
    }
  ],
  exports: [
    MainTemplateComponent
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule has already been loaded. You should only import Core modules in the AppModule only.');
    }
  }
}
