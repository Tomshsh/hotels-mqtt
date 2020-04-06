export class RouteDto {
  path: string;
  component?: string;
  children?: RouteDto[];
  pathMatch?: string;
  redirectTo?: string;
}
