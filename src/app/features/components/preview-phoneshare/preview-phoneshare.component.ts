import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";
import {environment} from "../../../../environments/environment";
import {BackendService} from "../../../core/services/backend.service";
import {DesignService} from "../../../core/services/design.service";
import {Design} from "../../../core/models/design";

@Component({
  selector: 'app-preview-phoneshare',
  templateUrl: './preview-phoneshare.component.html',
  styleUrls: ['./preview-phoneshare.component.scss']
})
export class PreviewPhoneshareComponent implements OnInit {

  // Varialbes
  currentDesign: Design | undefined;

  // Constructor
  constructor(public dialog: MatDialog, private backendService: BackendService, private designService: DesignService) {
    this.currentDesign = undefined;
  }

  ngOnInit(): void {
    this.designService.currentDesignState.subscribe((x) => {
      this.currentDesign = x;
    })
  }

  openShareDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '30%',
      data: {
        title: 'Share App to your Phone!',
        descriptionHtml:
          '<span>Use this QR Code to use the App on your own Device!</span><br />' +
          '<span>You can use any Scanner on any device for this.</span><br /><br />' +
          '<span>Username: <b>admin</b></span><br />' +
          '<span>Password: <b>secret</b></span><br /><br /><br />' +
          '<span>Your personal QR Code:</span>',
        qrCodeUrl: environment.previewUrl,
        alignActions: 'end',
        cancelText: undefined,
        successText: undefined,
        closeButton: true
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  uploadToDatabase() {
    if(this.currentDesign != null) {
      this.backendService.uploadDesign(this.currentDesign);
    }
  }

}
