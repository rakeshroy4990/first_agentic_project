import type { AngularComponentArtifacts } from "../shared/angular-artifact-types";
import { toClassName } from "../shared/angular-artifact-types";
import type { ButtonComponentConfig } from "./button-types";

export const compileButtonToAngularArtifacts = (
  config: ButtonComponentConfig
): AngularComponentArtifacts => {
  const className = `${toClassName(config.id)}Component`;
  const templateHtml = `
<section class="${config.id}-wrapper">
  <ng-container *uiStoreSlot="${config.uiStoreSlot ? `'${config.uiStoreSlot}'` : "'default'"}">
    <${config.selector} [variant]="'${config.variant ?? "primary"}'" (click)="dispatchAction('${config.actionId ?? ""}')">${config.label}</${config.selector}>
  </ng-container>
</section>`.trim();

  const componentTs = `import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SlotDirective } from "../directives/slot.directive";

@Component({
  selector: "${config.selector}",
  templateUrl: "./${config.id}.component.html",
  styleUrls: ["./${config.id}.component.scss"],
  standalone: true,
  imports: [CommonModule, SlotDirective]
})
export class ${className} {
  readonly packageName = "${config.packageName}";
  readonly config = ${JSON.stringify(config, null, 2)};

  dispatchAction(actionId: string): void {
    if (!actionId) return;
    console.log("Dispatch action:", actionId);
  }
}
`;

  return {
    componentTs,
    templateHtml,
    styleCss: `.${config.id}-wrapper { display: block; }`
  };
};
