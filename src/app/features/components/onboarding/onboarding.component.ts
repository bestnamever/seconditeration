import { Component, OnInit } from '@angular/core';
import {TooltipService} from "../../../core/services/tooltip.service";

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss']
})
export class OnboardingComponent implements OnInit {

  isOpened : boolean; // is the pop-up opened?
  opacity: string;
  background: string;
  boxshadow: string;

  constructor(private tooltipService: TooltipService) {
    // Check in localstorage if the onboarding should be shown
    (localStorage.getItem('onboardingDone') === "true") ? this.isOpened = false : this.isOpened = true;
    this.opacity = "100%";
    this.background = "white";
    this.boxshadow = "0 20px 25px -5px rgb(0 0 0 / 0.1)" //, 0 8px 10px -6px rgb(0 0 0 / 0.25)"
  }

  ngOnInit() {
    this.tooltipService.currentlyHoveredWidgetTypeState.subscribe(widgetType => {
      if(widgetType == undefined) {
        this.opacity = "100%";
        this.background = "white";
        this.boxshadow = "0 20px 25px -5px rgb(0 0 0 / 0.1)" //, 0 8px 10px -6px rgb(0 0 0 / 0.25)"
      } else {
        this.opacity = "10%";
        this.background = "rgba(255, 255, 255, 0.1)"
        this.boxshadow = "0 10px 12px -5px rgb(0 0 0 / 0.1)" //, 0 4px 5px -3px rgb(0 0 0 / 0.25)"
      }
    })
  }

  /**
   * Function that closes the pop-up and saves a value to localstorage for disabling the pop-up on next load
   */
  closeOnboarding = () : void => {
    this.isOpened = false
    localStorage.setItem('onboardingDone', 'true');
  }

}
