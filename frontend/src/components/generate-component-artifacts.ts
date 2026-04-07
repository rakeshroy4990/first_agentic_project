import { buttonConfig } from "./button/button-config.sample";
import { compileButtonToAngularArtifacts } from "./button/button-angular-compiler";
import { dropdownConfig } from "./dropdown/dropdown-config.sample";
import { compileDropdownToAngularArtifacts } from "./dropdown/dropdown-angular-compiler";
import { iconButtonConfig } from "./icon-button/icon-button-config.sample";
import { compileIconButtonToAngularArtifacts } from "./icon-button/icon-button-angular-compiler";
import { popupConfig } from "./popup/popup-config.sample";
import { compilePopupToAngularArtifacts } from "./popup/popup-angular-compiler";

export const generateAllComponentArtifacts = () => {
  return {
    button: compileButtonToAngularArtifacts(buttonConfig),
    iconButton: compileIconButtonToAngularArtifacts(iconButtonConfig),
    dropdown: compileDropdownToAngularArtifacts(dropdownConfig),
    popup: compilePopupToAngularArtifacts(popupConfig)
  };
};
