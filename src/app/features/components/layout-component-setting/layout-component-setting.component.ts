import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatChip } from '@angular/material/chips';
import { WidgetComponent } from 'src/app/core/models/widget-component';
import { PreviewService } from "../../../core/services/preview.service"
import { DesignService } from "../../../core/services/design.service";
import { GridsterItem } from 'angular-gridster2';
import { Design } from 'src/app/core/models/design';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DeletionService } from 'src/app/core/services/deletion.service';
import { AttributePickerControlService } from "../../../core/services/attributePickerControl.service"
import { OpenremoteService } from '../../../core/services/openremote.service';
import { DesignPosition } from "../../../core/models/design-position";
import { DialogComponent } from '../dialog/dialog.component';

interface width {
  value: number
  viewValue: string
}

@Component({
  selector: 'app-layout-component-setting',
  templateUrl: './layout-component-setting.component.html',
  styleUrls: ['./layout-component-setting.component.scss']
})
export class LayoutComponentSettingComponent implements OnDestroy {



  // Current Design
  design: Design | undefined;

  // Selected item variables
  selectedWidget: WidgetComponent | null;
  selectedGridsterItem: GridsterItem | undefined;  // selected widget's GridsterItem
  selectedWidgetType: number | undefined;
  selectedWidgetText: string | undefined;
  selectedWidgetValue: string | undefined;

  // Dialog shown
  isDialogShown: boolean | undefined;

  // Placeholder text variables
  delete_component: string;
  delete_title: string;
  widths: width[];
  widthValue: number;

  // Subscriptions
  private selectedWidgetSub: Subscription;
  private currentDesignSub: Subscription;




  /* -------------------------------------------------------------------- */
  /*                       Constructor Method                             */
  /* -------------------------------------------------------------------- */

  constructor(private openRemote: OpenremoteService, private inputData: PreviewService, private outputData: DesignService, public dialog: MatDialog, private deletionService: DeletionService, private attributePicker: AttributePickerControlService) {

    // Selected item variables
    this.selectedWidget = null

    // Placeholder text variables
    this.delete_component = "Component"
    this.delete_title = "Delete this Component"
    this.selectedWidgetText = "Room Temperature"
    this.widths = [
      { value: 30, viewValue: '30%' },
      { value: 50, viewValue: '50%' },
      { value: 66, viewValue: '66%' },
      { value: 100, viewValue: '100%' }
    ]
    this.widthValue = 0


    // Subscribing to the Selected Widget, and setting the right variables
    this.selectedWidgetSub = this.inputData.currentlySelectedWidgetState.subscribe(widget => {
      this.selectedWidget = widget;
      this.selectedGridsterItem = widget?.gridsterItem;
      this.selectedWidgetType = widget?.widgetData.widgetType;
      this.selectedWidgetText = widget?.widgetData.text;
      if (widget?.widgetData.values != null && widget.widgetData.values.length > 0) {
        this.selectedWidgetValue = widget?.widgetData.values[0].value;
      }
      // console.log("value is : " + this.selectedWidgetValue)
    })

    // Subscribing to the current Design.
    this.currentDesignSub = this.outputData.currentDesignState.subscribe(designpage => {
      if (designpage != null) {
        this.design = JSON.parse(JSON.stringify(designpage));
      }
    });

    // Subsciribing to changes in the attribute picker
    attributePicker.lastSelectionChange.subscribe((value) => {
      this.setWidgetValues(this.selectedWidget?.widgetData.values, value);
    })

    deletionService.isDialogShownState.subscribe(isShown => {
      if (isShown != null)
        this.isDialogShown = isShown
    })
  }






  /* -------------------------------------------------------------------- */
  /*                 Set Methods for changing details                     */
  /* -------------------------------------------------------------------- */


  // select width by chips
  selectionOnChip(chip: MatChip, value: number) {
    this.widthValue = value
    chip.toggleSelected();
  }

  //select value by input textarea
  setValue(event: any) {

    // change value in designpage
    this.design?.widgets.forEach((widget: DesignPosition) => {

      if (widget.id == this.selectedGridsterItem?.id) {
        console.log("selected widget data is :", widget, "value is : ", event.target.value)
        widget.element.text = event.target.value
        this.selectedWidgetText = event.target.value
      }
    })

    // subscript to this.deisgnpage
    if (this.design != null) {
      this.outputData.updateData(this.design)
    }
  }




  /* -------------------------------------------------------------------------------------- */
  /*                 Check statements whether a Widget Type is selected                     */
  /* -------------------------------------------------------------------------------------- */


  showCardView(): boolean { return this.selectedWidgetType === 0 }
  showGraphView(): boolean { return this.selectedWidgetType === 1 }
  showButtonView(): boolean { return this.selectedWidgetType === 2 }
  showChartView(): boolean { return this.selectedWidgetType === 3 }

  showDeleteButton(): boolean {
    if (this.selectedWidgetType != null) {
      return this.selectedWidgetType >= 0 || this.selectedWidgetType <= 4
    }
    else
      return false
  }





  /* -------------------------------------------------------------------------------------- */
  /*                Methods regarding opening Dialogs (for deleting ex.)                    */
  /* -------------------------------------------------------------------------------------- */


  //open delete dialog
  openDeleteDialog() {
    const data = {
      title: this.delete_title,
      descriptionHtml:
        'Are you sure you want to delete this <b>' + this.delete_component + '</b>?<br /><br />' +
        'Deleting this component is a <b>destructive</b> action, meaning that it cannot be reverted later.',
      alignActions: 'start',
      cancelText: 'CANCEL',
      successText: 'DELETE ' + this.delete_component.toUpperCase(),
      selectedWidget: this.selectedWidget
    }
    if (!this.isDialogShown) {
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '30%',
        data: data
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result === "true") {
          this.deletionService.sendEvent(data.selectedWidget)
        }
      });
    }
    else {
      this.deletionService.sendEvent(data.selectedWidget)
    }
  }

  setWidgetValues(widget: any, newData: any): void {

  }



  ngOnDestroy() {
    this.selectedWidgetSub.unsubscribe();
    this.currentDesignSub.unsubscribe();
  }
}



