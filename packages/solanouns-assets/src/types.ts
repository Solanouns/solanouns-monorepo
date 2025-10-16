export interface NounSeed {
  background: number;
  body: number;
  accessory: number;
  head: number;
  glasses: number;
}

export interface EncodedImage {
  filename: string;
  data: string;
}

export interface TraitData {
  name: string;
  filename: string;
}

export interface NounData {
  parts: EncodedImage[];
  background: string;
}

export interface SolanounsData {
  bgcolors: string[];
  traits: {
    accessories: TraitData[];
    backgrounds: TraitData[];
    bodies: TraitData[];
    heads: TraitData[];
    glasses: TraitData[];
  };
}
