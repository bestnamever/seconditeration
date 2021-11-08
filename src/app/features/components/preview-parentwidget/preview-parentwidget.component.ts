import {AfterContentInit, Component, Input, OnInit, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import {WidgetType} from "../../../core/models/widget-type";
import {DesignElement} from "../../../core/models/design-element";
import {skip} from "rxjs/operators";
import {DesignService} from "../../../core/services/design.service";

@Component({
  selector: 'app-preview-parentwidget',
  templateUrl: './preview-parentwidget.component.html',
  styleUrls: ['./preview-parentwidget.component.scss']
})
export class PreviewParentwidgetComponent implements OnInit, AfterContentInit {

  // Variables
  @Input('widgetId') widgetId: number | undefined;
  // @Input('widgetData') widgetData: DesignElement | undefined;
  widgetData: DesignElement | undefined;

  @ViewChild("container", {read: ViewContainerRef}) containerRef: ViewContainerRef | undefined;
  @ViewChild("content", {read: TemplateRef}) contentRef: TemplateRef<any> | undefined;

  // Constructor
  constructor(private designService: DesignService) {
  }

  ngOnInit(): void {
    console.log('Rendering PreviewParentWidget with the following data:');
    // console.log(this.widgetData);

    // Subscribe to changes of the Design
    this.designService.currentDesignState.pipe(skip(this.designService.getHistorySize() - 1)).subscribe(design => {
      console.log("Updating the ParentWidget...");
      this.widgetData = design.positions.find(x => { return x.id == this.widgetId})?.element;
      if(this.containerRef != null && this.contentRef != null) {
        this.containerRef.clear();
        this.containerRef.createEmbeddedView(this.contentRef);
      }
    });
  }

  ngAfterContentInit() {
    if(this.containerRef != null && this.contentRef != null) {
      this.containerRef.createEmbeddedView(this.contentRef);
    }
  }

  /* -------------------------------- */

  // ngIf methods
  isLabel(): boolean { return this.widgetData?.widgetType === WidgetType.LABEL; }
  isGraph(): boolean { return this.widgetData?.widgetType === WidgetType.GRAPH; }
  isBarChart(): boolean { return this.widgetData?.widgetType === WidgetType.BARCHART }

}
