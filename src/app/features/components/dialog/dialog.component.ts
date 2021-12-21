import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { is } from 'date-fns/locale';
import { DeletionService } from 'src/app/core/services/deletion.service';

@Component({
  selector: 'app-dialog-phoneshare',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(private deletionService: DeletionService, public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any,) {
  }

  ngOnInit(): void {
  }

  showHideDialog(checked:boolean){
    this.deletionService.showDialog(checked)
  }
}
