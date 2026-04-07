export interface HeaderMenuItem {
  id: string;
  label: string;
  target: string;
}

export interface HeaderActionItem {
  id: string;
  label: string;
  target: string;
  icon?: string;
}

export interface HeaderBrand {
  text: string;
  target: string;
  logoUrl?: string;
}

export interface HeaderTheme {
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  mutedTextColor: string;
}

export interface HeaderConfig {
  brand: HeaderBrand;
  menu: HeaderMenuItem[];
  actions: HeaderActionItem[];
  theme: HeaderTheme;
}

export interface HeaderSection {
  brand: HeaderBrand;
  actions: HeaderActionItem[];
  theme: HeaderTheme;
}

export interface UiMetadataData {
  header: HeaderSection;
  menu: HeaderMenuItem[];
  body: Record<string, unknown>;
  footer: Record<string, unknown>;
}

export interface UiMetadataResponse {
  uniqueId: string;
  data: UiMetadataData;
}
