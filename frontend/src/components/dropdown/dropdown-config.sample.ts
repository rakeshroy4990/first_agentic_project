import type { DropdownComponentConfig } from "./dropdown-types";

export const dropdownConfig: DropdownComponentConfig = {
  id: "status-dropdown",
  type: "dropdown",
  packageName: "@acme/design-system",
  selector: "ds-dropdown",
  sourceType: "design-system",
  placeholder: "Select status",
  options: [
    { label: "Active", value: "ACTIVE" },
    { label: "Inactive", value: "INACTIVE" }
  ],
  valuePath: "filters.status",
  uiStoreSlot: "filterSlot"
};
