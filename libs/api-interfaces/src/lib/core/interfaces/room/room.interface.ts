export interface Room {
  readonly objectId: string;
  readonly num: number;
  readonly floor: number;
  readonly name: string;
  readonly isOccupied: boolean;
  readonly isUtility: boolean;
}
