export interface AppNavItem {
  title: string;
  icon: string;
  link: string;
  expanded: boolean;
  children?: AppNavItem[];
  order?: number;
}
