// Angular imports
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

// Material UI
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatTabsModule } from "@angular/material/tabs";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatChipsModule } from "@angular/material/chips";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatInputModule } from "@angular/material/input";
import { MatDialogModule } from "@angular/material/dialog";

// Other externally imported Libraries
import { GridsterModule } from 'angular-gridster2'
import { NgChartsModule } from "ng2-charts";

// Self-made Util classes (REST, interceptors etc)
import { HttpbaseurlInterceptor } from "./core/interceptors/httpbaseurl.interceptor";

// Self-made pages
import { AppComponent } from './app.component';
import { HomepageComponent } from './features/pages/homepage/homepage.component';

// Self-made components
import { DeleteComfirmComponent } from "./features/components/delete-comfirm/delete-comfirm.component";
import { LayoutHeaderComponent } from './features/components/layout-header/layout-header.component';
import { LayoutLeftbarComponent } from './features/components/layout-leftbar/layout-leftbar.component';
import { LayoutRightbarComponent } from './features/components/layout-rightbar/layout-rightbar.component';
import { LayoutRightbarComponentsComponent } from "./features/components/layout-rightbar-components/layout-rightbar-components.component";
import { LayoutTabComponent } from "./features/components/layout-tab/layout-tab.component";
import { LayoutComponentSettingComponent } from "./features/components/layout-component-setting/layout-component-setting.component";
import { LayoutScreenComponent } from "./features/components/layout-screen/layout-screen.component";
import { ExampleGetdesignsComponent } from './features/components/example-getdesigns/example-getdesigns.component';
import { PreviewGridComponent } from './features/components/preview-grid/preview-grid.component';
import { PreviewParentwidgetComponent } from './features/components/preview-parentwidget/preview-parentwidget.component';
import { PreviewTopbarComponent } from './features/components/preview-topbar/preview-topbar.component';
import { PreviewUpdatedtextComponent } from './features/components/preview-updatedtext/preview-updatedtext.component';
import { WidgetLabelComponent } from './features/components/widget-label/widget-label.component';
import { WidgetGraphComponent } from './features/components/widget-graph/widget-graph.component';
import { WidgetBarchartComponent } from './features/components/widget-barchart/widget-barchart.component';



/* -------------------------------------------------------------- */

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
    LayoutTabComponent,
    LayoutRightbarComponentsComponent,
    LayoutComponentSettingComponent,
    LayoutScreenComponent,
    DeleteComfirmComponent
  ],
  imports: [
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
    MatProgressSpinnerModule,
    MatTabsModule,
    MatDividerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatChipsModule,
    MatCheckboxModule,
    MatInputModule,
    MatDialogModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpbaseurlInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
