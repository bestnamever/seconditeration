import {PhoneType} from "./phone-type";
import {DesignPage} from "./design-page";
import {DesignPosition} from "./design-position";

export interface Design {
  id: number;
  name: string,
  display_device: PhoneType | string,
  safe_space: number,
  display_safe_space: boolean,
  page: DesignPage,
  widgets: Array<DesignPosition>;
}
