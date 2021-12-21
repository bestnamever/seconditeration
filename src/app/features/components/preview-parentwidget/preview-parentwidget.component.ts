import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {WidgetType} from "../../../core/models/widget-type";
import {DesignElement} from "../../../core/models/design-element";
import {DesignService} from "../../../core/services/design.service";
import {Subscription} from "rxjs";
import {OpenremoteService} from 'src/app/core/services/openremote.service';
import {Design} from "../../../core/models/design";
import {AssetType} from "../../../core/models/asset-type";
import {AttributePickerControlService} from "../../../core/services/attributePickerControl.service";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-preview-parentwidget',
  templateUrl: './preview-parentwidget.component.html',
  styleUrls: ['./preview-parentwidget.component.scss']
})
export class PreviewParentwidgetComponent implements OnInit, AfterViewInit, OnDestroy {

  // Variables
  @Input('widgetId') widgetId: number | undefined;
  @Input('fullscreen') fullscreen: boolean | undefined;

  // @Input('widgetData') widgetData: DesignElement | undefined;
  widgetData: DesignElement | undefined;
  designPage: Design | undefined
  amountOfTimesUpdated: number;
  usedAssets : any;

  @ViewChild("container", {read: ViewContainerRef, static: false}) containerRef: ViewContainerRef | undefined;
  @ViewChild("content", {read: TemplateRef, static: false}) contentRef: TemplateRef<any> | undefined;

  private currentDesignSub: Subscription | undefined;

  // Constructor
  constructor(private designService: DesignService, private changeDetectorRef: ChangeDetectorRef, private openRemote : OpenremoteService, private attributeService: AttributePickerControlService) {
    this.amountOfTimesUpdated = 0;
  }

  ngOnInit(): void {
    console.log('Rendering PreviewParentWidget with the following data:');

    // Subscribe to changes of the Design
    this.currentDesignSub = this.designService.currentDesignState.subscribe(design => {
      if(design != null) {
        this.designPage = JSON.parse(JSON.stringify(design));

        const oldDesign = this.designService.getHistoryByNumber(1);
        let oldWidgetData = null;
        if(oldDesign != null) { oldWidgetData = oldDesign.widgets.find(x => { return x.id == this.widgetId})?.element; }
        const newWidgetData = design.widgets.find(x => { return x.id == this.widgetId})?.element;
        if(this.amountOfTimesUpdated == 0 || JSON.stringify(newWidgetData) !== JSON.stringify(oldWidgetData)) {
          console.log("Updating the ParentWidget...");
          this.amountOfTimesUpdated++;
          this.widgetData = newWidgetData;
          console.log("widgetdata", this.widgetData);
          if(this.containerRef != null && this.contentRef != null) {
            this.containerRef.clear();
            this.containerRef.createEmbeddedView(this.contentRef);
          }
        }
      }
    });

    // Wait for openRemote data and check if the value needs to be changed
    setTimeout(() => {
      // Get assets form OpenRemote API
      this.usedAssets = this.openRemote.getAssets();

      // Find the currently used asset based on the selected widget
      let selectedAsset = this.usedAssets.find((obj : any) => {
        return obj.id == ((this.widgetData?.values[0].asset_id != null) ? this.widgetData?.values[0].asset_id : this.widgetData?.values[0].assetId);
      })

      if (!selectedAsset) return; // When there are no widgets on screen

      // Find the attribute and its value based on the selected asset
      let attribute = <any>Object.values(selectedAsset.attributes).find((x : any) => {
        // console.log("looped attribute in ParentWidget is the following: ", x);
        // console.log("widgetData value is ", this.widgetData?.values[0]);
        return x.name === (this.widgetData?.values[0].attribute_name != null ? this.widgetData?.values[0].attribute_name : this.widgetData?.values[0].attributeName); // this.widgetData?.values[0].attributeName;
      });
      let value;
      if(attribute != null && attribute.value != null) {
        value = attribute.value;
      } else {
        value = "NaN";
      }
      console.log("[ParentWidget]", "checking if update is needed"); // Debug

      // If the local value and the OpenRemote value is different, update the local value
      if (value != this.widgetData?.values[0].value  && this.widgetData?.values[0].value != undefined){
        console.log("[ParentWidget]", true, attribute);
        this.widgetData.values[0].value = value;

        // Update the designpage with the new valuechange
        this.designPage?.widgets.forEach((element : any) => {
          if (element.id == this.widgetId) {
            element.element.values[0].value = this.widgetData?.values[0].value;

            console.log("[parentWidget] designpage", element.element.values[0].value) // Debug
          }
        });

        console.log("[parentWidget] Changed:", this.widgetData?.values[0].value, this.designPage); // Debug
      }
      else console.log("[parentWidget]", false, attribute, this.widgetData?.values[0].value); // Debug

      // Save the updated design
      if (this.designPage != null) 
      {
        console.log("called here")
        this.designService.updateData(this.designPage);
      }

    }, 3000);
  }

  ngAfterViewInit() {
    // Render lit components
    if(this.containerRef != null && this.contentRef != null) {
      this.containerRef.createEmbeddedView(this.contentRef);
    }
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy() {
    if(this.currentDesignSub != null) { this.currentDesignSub.unsubscribe(); }
  }

  openAttributePicker() : void {
    this.attributeService.setIsOpened(true);
  }

  reloadData() {
    if(this.containerRef != null && this.contentRef != null) {
      this.containerRef.clear();
      this.containerRef.createEmbeddedView(this.contentRef);
    }
    this.changeDetectorRef.detectChanges();
  }

  /* -------------------------------- */

  // ngIf methods
  isLabel(): boolean { return this.widgetData?.widgetType === WidgetType.LABEL; }
  isGraph(): boolean { return this.widgetData?.widgetType === WidgetType.GRAPH; }
  isBarChart(): boolean { return this.widgetData?.widgetType === WidgetType.BARCHART }
  isAssetTypeAll(): boolean { return this.widgetData?.assetType === AssetType.ALL }

  isDebugging(): boolean { return environment.debug_components; }
}
