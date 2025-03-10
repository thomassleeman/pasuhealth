declare global {
  //WhatIsPasuDotIo
  interface CustomSVGProps extends React.SVGProps<SVGSVGElement> {
    classes: string;
  }

  // Type for the Slug structure in Sanity
  export interface SanitySlug {
    current: string;
    _type: "slug";
  }
}

export {};
