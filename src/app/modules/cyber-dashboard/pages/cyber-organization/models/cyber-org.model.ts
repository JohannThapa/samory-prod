export type Organization = {
  id: number;
  name: string;
  type: string;
  city: string;
  website: string;
  avatar?: string;
};

export type ViewMode = 'list' | 'grid';
