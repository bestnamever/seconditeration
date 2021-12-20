import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss']
})
export class OnboardingComponent implements OnInit {

  isOpened : boolean; // is the pop-up opened?

  constructor() {
    // Check in localstorage if the onboarding should be shown
    (localStorage.getItem('onboardingDone') === "true") ? this.isOpened = false : this.isOpened = true;
  }

  ngOnInit() {
  }

  /**
   * Function that closes the pop-up and saves a value to localstorage for disabling the pop-up on next load
   */
  closeOnboarding = () : void => {
    this.isOpened = false
    localStorage.setItem('onboardingDone', 'true');
  }

}
