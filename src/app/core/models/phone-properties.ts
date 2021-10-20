import {PhoneType} from "./phone-type";

export interface PhoneProperties {
  phoneType: PhoneType;
  aspectRatio: string;
  borderThickness: string;
  borderRadius: string;
  notch: boolean;
  notchRadius: string;

  customWidth?: number;
  customHeight?: number;
}
