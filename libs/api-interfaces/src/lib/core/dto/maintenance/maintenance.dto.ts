export class MaintenanceDto{
  id: string
  name: string
  onShift: boolean
  chores: 'refill lockers' | 'replace bin' | 'check locker' []
}