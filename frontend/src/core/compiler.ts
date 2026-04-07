import type { ComponentAnnotation, UINode } from "./ui-types";

const createList = (items: string[]): UINode => ({
  tag: "ul",
  children: items.map((text) => ({ tag: "li", text }))
});

export const compileAnnotationToUINodes = (
  annotation: ComponentAnnotation
): UINode[] => {
  const base: UINode[] = [
    { tag: "h2", text: `Component: ${annotation.componentType}` },
    { tag: "p", text: `Id: ${annotation.id ?? "n/a"}` },
    { tag: "h3", text: "Bindings" },
    createList(
      annotation.bindings.map(
        (b) => `${b.target} (${b.kind}) <- ${b.from.source}.${b.from.path}`
      )
    )
  ];

  if (annotation.validation?.length) {
    base.push({ tag: "h3", text: "Validation" });
    base.push(
      createList(
        annotation.validation.map(
          (v) => `${v.field ?? "component"}: ${v.type}${v.message ? ` - ${v.message}` : ""}`
        )
      )
    );
  }

  if (annotation.api?.length) {
    base.push({ tag: "h3", text: "API" });
    base.push(
      createList(annotation.api.map((a) => `${a.method} ${a.path} (${a.id})`))
    );
  }

  if (annotation.events?.length) {
    base.push({ tag: "h3", text: "Events" });
    base.push(
      createList(
        annotation.events.map((e) => `${e.event} -> ${e.handler.type}:${e.handler.ref}`)
      )
    );
  }

  if (annotation.rbac) {
    base.push({ tag: "h3", text: "RBAC" });
    base.push({ tag: "pre", text: JSON.stringify(annotation.rbac, null, 2) });
  }

  return base;
};
