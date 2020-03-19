export interface AppNavItem {
  title: string;
  icon: string;
  link: string;
  component?: string;
  expanded: boolean;
  children: AppNavItem[];
}
