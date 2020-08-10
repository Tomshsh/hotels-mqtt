export class RoomTowelsDto{
  id: string
  guestName?: string
  room:{
    name: string,
    id: string
  }
  lang?: "HE" | "EN" | "RUS"
  currCount?: number
  towelLimit: number
  cards: string []
}