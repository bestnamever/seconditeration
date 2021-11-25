import {PhoneType} from "./phone-type";

export interface PhoneProperties {
  phoneType: PhoneType;
  aspectRatio: string;
  borderThickness: string;
  borderRadius: string;
  smallNotch: boolean;
  smallNotchRadius: string;
  smallNotchWidth: string;
  largeNotch: boolean;
  largeNotchWidth: string;

  customWidth?: number;
  customHeight?: number;
}
