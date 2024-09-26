// import the original type declarations
import "i18next";
import { allJSONFE } from "../i18n/i18n";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: typeof allJSONFE;
  }
}
