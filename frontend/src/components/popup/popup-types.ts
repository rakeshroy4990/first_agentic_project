import type { BaseComponentConfig } from "../shared/base-component-types";

export interface PopupAction {
  label: string;
  actionId: string;
}

export interface PopupComponentConfig extends BaseComponentConfig {
  type: "popup";
  title: string;
  body: string;
  triggerText: string;
  actions?: PopupAction[];
}
