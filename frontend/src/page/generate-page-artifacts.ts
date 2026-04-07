import { compilePageConfigToAngularArtifacts } from "./angular-page-compiler";
import { customerDetailsPageConfig } from "./page-config.sample";

// Runtime conversion entry point:
// page config -> Angular-style component class + template + style strings
export const generateCustomerPageArtifacts = () => {
  return compilePageConfigToAngularArtifacts(customerDetailsPageConfig);
};
