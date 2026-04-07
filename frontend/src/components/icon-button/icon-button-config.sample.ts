import type { IconButtonComponentConfig } from "./icon-button-types";

export const iconButtonConfig: IconButtonComponentConfig = {
  id: "refresh-icon-button",
  type: "icon-button",
  packageName: "@acme/design-system",
  selector: "ds-icon-button",
  sourceType: "design-system",
  icon: "refresh",
  ariaLabel: "Refresh data",
  variant: "ghost",
  actionId: "refresh-list",
  uiStoreSlot: "headerSlot"
};
