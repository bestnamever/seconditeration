import { Component, Input, OnInit } from '@angular/core';
import { PhoneProperties } from "../../../core/models/phone-properties";
import { PhoneDirection } from "../../../core/models/phone-direction";
import { tr } from 'date-fns/locale';
import { PreviewService } from 'src/app/core/services/preview.service';

@Component({
  selector: 'app-preview-topbar',
  templateUrl: './preview-topbar.component.html',
  styleUrls: ['./preview-topbar.component.scss']
})
export class PreviewTopbarComponent implements OnInit {

  @Input() toptext: string | undefined;
  @Input() fullscreen: boolean | undefined;
  @Input() phoneOptions: PhoneProperties | undefined;
  @Input() phoneOrientation: PhoneDirection | undefined;

  editing: boolean = false

  constructor(private previewService: PreviewService) {
  }

  ngOnInit(): void {
  }

  getWidth(): string {
    switch (this.fullscreen) {
      case true:
        return "100vw";
        break;
      default:
        return "100%";
    }
  }

  isInPortraitMode(): boolean {
    return this.phoneOrientation == PhoneDirection.PORTRAIT;
  }

  getNotchPosition(): string {
    if (this.phoneOptions?.customPosition != null) {
      return this.phoneOptions?.customPosition;
    } else {
      return 'center'
    }
  }
  getNotchMarginTop(): string {
    if (this.phoneOptions?.smallNotchCustomTopMargin != null) {
      return this.phoneOptions?.smallNotchCustomTopMargin;
    } else {
      return '4px';
    }
  }

  isEditing(): boolean {
    return this.editing
  }

  edit() {
    this.editing = true
  }

  setPageName(event: any) {
    this.previewService.changePageName(event.target.value)

    if (event.code == "Enter" && event.target.value != "") {
      this.editing = false
    }
  }
}
