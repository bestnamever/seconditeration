import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './features/pages/homepage/homepage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import { LayoutHeaderComponent } from './features/components/layout-header/layout-header.component';
import { LayoutLeftbarComponent } from './features/components/layout-leftbar/layout-leftbar.component';
import { LayoutRightbarComponent } from './features/components/layout-rightbar/layout-rightbar.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import { ExampleGetdesignsComponent } from './features/components/example-getdesigns/example-getdesigns.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {HttpbaseurlInterceptor} from "./core/interceptors/httpbaseurl.interceptor";
import { PreviewGridComponent } from './features/components/preview-grid/preview-grid.component';
import { GridsterModule } from 'angular-gridster2';
import { PreviewParentwidgetComponent } from './features/components/preview-parentwidget/preview-parentwidget.component';
import { PreviewTopbarComponent } from './features/components/preview-topbar/preview-topbar.component';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import { WidgetLabelComponent } from './features/components/widget-label/widget-label.component';
import { WidgetGraphComponent } from './features/components/widget-graph/widget-graph.component';
import { PreviewUpdatedtextComponent } from './features/components/preview-updatedtext/preview-updatedtext.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {NgChartsModule} from "ng2-charts";
import { WidgetBarchartComponent } from './features/components/widget-barchart/widget-barchart.component';
import {LittestingComponent} from "./features/pages/littesting/littesting.component";
import './features/litelements/vd-label/vd-label.component'

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LayoutHeaderComponent,
    LayoutLeftbarComponent,
    LayoutRightbarComponent,
    ExampleGetdesignsComponent,
    PreviewGridComponent,
    PreviewParentwidgetComponent,
    PreviewTopbarComponent,
    WidgetLabelComponent,
    WidgetGraphComponent,
    PreviewUpdatedtextComponent,
    WidgetBarchartComponent,
    LittestingComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    GridsterModule,
    NgChartsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpbaseurlInterceptor, multi: true }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    // customElements.define('app-vd-label', VdLabelComponent);
  }
}
