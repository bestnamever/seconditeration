import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './features/pages/homepage/homepage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from "@angular/material/toolbar";
import { LayoutHeaderComponent } from './features/components/layout-header/layout-header.component';
import { LayoutLeftbarComponent } from './features/components/layout-leftbar/layout-leftbar.component';
import { LayoutRightbarComponent } from './features/components/layout-rightbar/layout-rightbar.component';
import { MatSidenavModule } from "@angular/material/sidenav";
import { ExampleGetdesignsComponent } from './features/components/example-getdesigns/example-getdesigns.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { HttpbaseurlInterceptor } from "./core/interceptors/httpbaseurl.interceptor";
import { LayoutTabComponent } from './features/components/layout-tab/layout-tab.component';
import { MatTabsModule } from "@angular/material/tabs";
import { MatIconModule } from '@angular/material/icon';
import { LayoutScreenComponent } from './features/components/layout-screen/layout-screen.component';
import { DividerComponent } from './features/components/divider/divider.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LayoutHeaderComponent,
    LayoutLeftbarComponent,
    LayoutRightbarComponent,
    ExampleGetdesignsComponent,
    LayoutTabComponent,
    LayoutScreenComponent,
    DividerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTabsModule,
    MatIconModule,
    MatDividerModule,
    MatInputModule,
    MatCheckboxModule,
    MatListModule,
    MatSelectModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpbaseurlInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
