import type { PageConfig } from "./page-types";

export const customerDetailsPageConfig: PageConfig = {
  packageName: "crm.customers",
  pageId: "customer-details",
  selector: "app-customer-details-page",
  imports: ["CommonModule", "SlotDirective"],
  actions: [
    { id: "open-edit-modal", type: "click", target: "editButton" },
    { id: "go-customer-list", type: "navigation", target: "/customers" }
  ],
  events: [
    { name: "pageInit", when: "init", actionId: "open-edit-modal" },
    { name: "pageClose", when: "destroy", actionId: "go-customer-list" }
  ],
  listeners: [
    { source: "store", event: "customer.updated", actionId: "open-edit-modal" }
  ],
  components: [
    {
      id: "customer-header",
      sourceType: "design-system",
      packageName: "@acme/design-system",
      selector: "ds-page-header",
      slots: ["headerSlot"],
      inputs: {
        title: "Customer Details"
      }
    },
    {
      id: "customer-info-panel",
      sourceType: "custom",
      packageName: "src/features/customers/customer-info-panel",
      selector: "app-customer-info-panel",
      slots: ["bodySlot"]
    }
  ],
  uiStoreSlot: "bodySlot"
};
