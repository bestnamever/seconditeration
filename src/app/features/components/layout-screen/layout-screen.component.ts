import { AfterContentChecked, Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OptionList } from 'src/app/core/models/option-list';
import { PhoneProperties } from 'src/app/core/models/phone-properties';
import { PhoneService } from 'src/app/core/services/phone.service';
import { DeleteComfirmComponent } from '../delete-comfirm/delete-comfirm.component'

@Component({
  selector: 'app-layout-screen',
  templateUrl: './layout-screen.component.html',
  styleUrls: ['./layout-screen.component.scss']
})


export class LayoutScreenComponent implements OnInit {

  // phone options
  phoneOptions: PhoneProperties | undefined;

  // phone selection
  phoneSelected: string | undefined

  //page name and setHomepge
  homepage: string;

  //custom width and heigth
  width: number;
  height: number;

  //custom enable
  isHidden: boolean;

  // label texts
  setHomepage: string;
  isInNavigation: string;
  customScreenSize: string;
  delete_component: string;
  delete_title: string;
  safeSpace: string;

  // phone screen options
  phoneOptionList: OptionList[]


  constructor(public dialog: MatDialog, private phoneSetting: PhoneService) {

    this.homepage = "homepage"
    this.height = 0
    this.width = 0
    this.customScreenSize = "Use custom screen size";
    this.isHidden = true
    this.safeSpace = "Display safe-space in preview"
    this.setHomepage = "Set Homepage"
    this.isInNavigation = "Show in navigation"
    this.delete_component = "Homepage"
    this.delete_title = "page"

    this.phoneOptionList = [
      { value: "0", viewValue: "SAMSUNG_S20" },
      { value: "1", viewValue: "SAMSUNG_S10" },
    ]


    this.phoneSetting.currentPhoneState.subscribe(phone => (
      this.phoneOptions = phone,
      this.phoneSelected = this.phoneOptions.phoneType === 0 ? "0" : "1",
      console.log(this.phoneSelected)
    ))
  }


  ngOnInit(): void {
  }


  //selection change
  change(phoneType: string) {
    this.phoneSetting.changePhone(parseInt(phoneType))

  }




  showHideCustom() {
    this.isHidden = !this.isHidden;
  }

  openDeleteDialog() {
    const dialogRef = this.dialog.open(DeleteComfirmComponent, { width: '30%', data: { title: this.delete_title, component: this.delete_component } });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

