import type { BaseComponentConfig } from "../shared/base-component-types";

export interface DropdownOption {
  label: string;
  value: string;
}

export interface DropdownComponentConfig extends BaseComponentConfig {
  type: "dropdown";
  placeholder?: string;
  options: DropdownOption[];
  valuePath?: string;
}
