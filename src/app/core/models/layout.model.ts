export interface FeatureList {
  title: string;
  items: string[];
  iconSrc?: string;
  imageSrc?: string;
  srLabel?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqCategory {
  title: string;
  items: FaqItem[];
}

export interface Tab {
  label: string;
  value: string;
}
