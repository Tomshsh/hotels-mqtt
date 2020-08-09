export class RoomTowelsDto{
  guestName?: string
  room:{
    num: string,
    id: string
  }
  lang?: "HE" | "EN" | "RUS"
  towelLimit: number
  cards: string []
}