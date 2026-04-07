import type { BaseComponentConfig } from "../shared/base-component-types";

export interface ButtonComponentConfig extends BaseComponentConfig {
  type: "button";
  label: string;
  variant?: "primary" | "secondary" | "ghost";
  actionId?: string;
}
