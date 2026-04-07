import type { PageConfig } from "./page-types";

export interface AngularPageArtifacts {
  componentTs: string;
  templateHtml: string;
  styleCss: string;
}

const escapeText = (value: string): string => value.replace(/`/g, "\\`");

const toClassName = (value: string): string => {
  const sanitized = value.replace(/[^a-zA-Z0-9]+/g, " ");
  return sanitized
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join("");
};

const buildTemplate = (config: PageConfig): string => {
  const slotMarkup = config.components
    .map((component) => {
      const slotName = component.slots?.[0] ?? "default";
      return `  <ng-container *uiStoreSlot="'${slotName}'">\n    <${component.selector}></${component.selector}>\n  </ng-container>`;
    })
    .join("\n");

  return [
    `<section class="${config.pageId}-page">`,
    `  <h1>{{ pageTitle }}</h1>`,
    `  <div class="page-package">{{ packageName }}</div>`,
    `  <ng-container *uiStoreSlot="uiStoreSlot">`,
    `    <div class="dynamic-slot">Dynamic slot: {{ uiStoreSlot }}</div>`,
    `  </ng-container>`,
    slotMarkup,
    `</section>`
  ].join("\n");
};

const buildComponentTs = (config: PageConfig, templateUrl: string): string => {
  const className = `${toClassName(config.pageId)}PageComponent`;
  const imports = (config.imports ?? ["CommonModule", "SlotDirective"])
    .map((name) => `    ${name}`)
    .join(",\n");
  const actions = JSON.stringify(config.actions, null, 2);
  const events = JSON.stringify(config.events, null, 2);
  const listeners = JSON.stringify(config.listeners, null, 2);
  const components = JSON.stringify(config.components, null, 2);

  return `import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SlotDirective } from "../directives/slot.directive";

@Component({
  selector: "${escapeText(config.selector)}",
  templateUrl: "${escapeText(templateUrl)}",
  styleUrls: ["./page.component.scss"],
  imports: [
${imports}
  ],
  standalone: true
})
export class ${className} {
  readonly packageName = "${escapeText(config.packageName)}";
  readonly pageId = "${escapeText(config.pageId)}";
  readonly pageTitle = "${escapeText(config.pageId)}";
  readonly uiStoreSlot = "${escapeText(config.uiStoreSlot)}";

  readonly actions = ${actions};
  readonly events = ${events};
  readonly listeners = ${listeners};
  readonly components = ${components};
}
`;
};

export const compilePageConfigToAngularArtifacts = (
  config: PageConfig
): AngularPageArtifacts => {
  const templateHtml = buildTemplate(config);
  const componentTs = buildComponentTs(config, "./page.component.html");
  const styleCss = `.${config.pageId}-page { padding: 1rem; }`;

  return { componentTs, templateHtml, styleCss };
};
