export interface AngularComponentArtifacts {
  componentTs: string;
  templateHtml: string;
  styleCss: string;
}

export const toClassName = (value: string): string =>
  value
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join("");
