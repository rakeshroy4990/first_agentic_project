export interface BaseComponentConfig {
  id: string;
  packageName: string;
  selector: string;
  sourceType: "design-system" | "custom";
  uiStoreSlot?: string;
  inputs?: Record<string, string | number | boolean>;
  outputs?: Record<string, string>;
}
