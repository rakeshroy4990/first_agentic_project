import type { ButtonComponentConfig } from "./button-types";

export const buttonConfig: ButtonComponentConfig = {
  id: "save-button",
  type: "button",
  packageName: "@acme/design-system",
  selector: "ds-button",
  sourceType: "design-system",
  label: "Save",
  variant: "primary",
  actionId: "save-form",
  uiStoreSlot: "footerSlot"
};
