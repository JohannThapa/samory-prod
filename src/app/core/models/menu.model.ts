export interface MenuItem {
  group: string;
  separator?: boolean;
  selected?: boolean;
  active?: boolean;
  items: Array<SubMenuItem>;
}

export interface SubMenuItem {
  icon?: string;
  label?: string;
  route?: string | null;
  expanded?: boolean;
  active?: boolean;
  children?: Array<SubMenuItem>;
}

export interface HomeMenuItem {
  label?: string;
  route?: string | null;
  expanded?: boolean;
  active?: boolean;
  children?: Array<HomeMenuItem>;
}
export interface MenuGroup {
  group: string;
  separator: boolean;
  items: MenuItem[];
}
