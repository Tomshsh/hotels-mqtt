export class MaintenanceDto{
  id: string
  name: string
  onShift: boolean
  chores: 'refill_lockers' | 'empty_basket' | 'check_locker' []
}