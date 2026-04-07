export type JsonObject = Record<string, unknown>;

export interface AnnotationBinding {
  target: string;
  kind: string;
  from: { source: string; path: string };
}

export interface AnnotationValidation {
  field?: string;
  type: string;
  message?: string;
}

export interface AnnotationApiRef {
  id: string;
  method: string;
  path: string;
}

export interface AnnotationEventHook {
  event: string;
  handler: { type: string; ref: string };
}

export interface ComponentAnnotation {
  id?: string;
  componentType: string;
  bindings: AnnotationBinding[];
  validation?: AnnotationValidation[];
  rbac?: JsonObject;
  api?: AnnotationApiRef[];
  events?: AnnotationEventHook[];
}

export interface UINode {
  tag: string;
  attrs?: Record<string, string>;
  text?: string;
  children?: UINode[];
}
