import {DesignPage} from "./design-page";
import {DesignPosition} from "./design-position";

export interface Design {
  id: number;
  name: string,
  display_device: string, // Not used yet, also not planning to. Keeping it saved in phone.service.ts
  safe_space: number,
  display_safe_space: boolean,
  page: DesignPage,
  widgets: Array<DesignPosition>;
}
