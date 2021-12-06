import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-preview-phoneshare',
  templateUrl: './preview-phoneshare.component.html',
  styleUrls: ['./preview-phoneshare.component.scss']
})
export class PreviewPhoneshareComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
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

}
