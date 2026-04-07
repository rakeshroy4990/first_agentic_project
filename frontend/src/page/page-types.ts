export interface BasePage {
  packageName: string;
  pageId: string;
  selector: string;
  templateUrl?: string;
  styleUrls?: string[];
  imports?: string[];
}

export type PageActionType = "click" | "navigation" | "submit" | "custom";

export interface PageAction {
  id: string;
  type: PageActionType;
  target?: string;
  payload?: Record<string, unknown>;
}

export interface PageEvent {
  name: string;
  when?: "init" | "destroy" | "beforeRender" | "afterRender" | "custom";
  actionId?: string;
}

export interface PageListener {
  source: "window" | "document" | "store" | "component" | "custom";
  event: string;
  actionId: string;
}

export type ComponentSourceType = "design-system" | "custom";

export interface ComponentReference {
  id: string;
  sourceType: ComponentSourceType;
  packageName: string;
  selector: string;
  slots?: string[];
  inputs?: Record<string, string>;
}

export interface PageConfig extends BasePage {
  actions: PageAction[];
  events: PageEvent[];
  listeners: PageListener[];
  components: ComponentReference[];
  uiStoreSlot: string;
}
