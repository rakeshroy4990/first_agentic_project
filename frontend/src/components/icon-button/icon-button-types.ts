import type { BaseComponentConfig } from "../shared/base-component-types";

export interface IconButtonComponentConfig extends BaseComponentConfig {
  type: "icon-button";
  icon: string;
  ariaLabel: string;
  variant?: "primary" | "secondary" | "ghost";
  actionId?: string;
}
