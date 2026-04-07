import type { PopupComponentConfig } from "./popup-types";

export const popupConfig: PopupComponentConfig = {
  id: "delete-popup",
  type: "popup",
  packageName: "src/features/shared/delete-popup",
  selector: "app-delete-popup",
  sourceType: "custom",
  title: "Delete Record",
  body: "This action cannot be undone.",
  triggerText: "Delete",
  uiStoreSlot: "bodySlot",
  actions: [
    { label: "Cancel", actionId: "cancel-delete" },
    { label: "Confirm", actionId: "confirm-delete" }
  ]
};
