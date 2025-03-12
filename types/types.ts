declare global {
  //WhatIsPasuDotIo
  interface CustomSVGProps extends React.SVGProps<SVGSVGElement> {
    classes: string;
  }

  export interface SanitySlug {
    current: string;
    _type: "slug";
  }

  export type SanityImage = {
    asset: {
      _ref: string;
      _type: string;
    };
    alt?: string;
    caption?: string;
  };
}

export {};
