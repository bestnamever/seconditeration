import { AfterContentChecked, Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeleteComfirmComponent } from '../delete-comfirm/delete-comfirm.component'

@Component({
  selector: 'app-layout-screen',
  templateUrl: './layout-screen.component.html',
  styleUrls: ['./layout-screen.component.scss']
})


export class LayoutScreenComponent implements OnInit {

  constructor(public dialog: MatDialog) {
    this.homepage = "homepage"
    this.height = 0
    this.width = 0
    this.customScreenSize = "Use custom screen size";
    this.isHidden = true
    this.safeSpace = "Display safe-space in preview"
    this.setHomepage = "Set Homepage"
    this.isInNavigation = "Show in navigation"
    this.delete_title = "Delete this page"

  }

  ngOnInit(): void {
  }

  homepage: string;
  width: number;
  height: number;
  setHomepage: string;
  isInNavigation: string;
  customScreenSize: string;
  isHidden: boolean;
  safeSpace: string;
  delete_title: string;


  showHideCustom() {
    this.isHidden = !this.isHidden;
  }

  openDeleteDialog() {
    const dialogRef = this.dialog.open(DeleteComfirmComponent, { data: { title: this.delete_title } });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

