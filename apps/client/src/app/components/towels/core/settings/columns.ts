import { ChipsComponent } from '@my-tray/shared/layout'

export const COLUMNS = {
  room: {
    title: 'Room',
    type: 'string',
    valuePrepareFunction: (value, cell, row) => {
      return value.num
    },
    editable: true
  },
  currCount: {
    title: 'Current count',
    type: 'string',
    filter: false,
    editable: true

  },
  towelLimit: {
    title: 'Limit',
    type: 'number',
    filter: false,
    editable: true
  },
  cards: {
    title: 'cards',
    type: 'custom',
    filter: false,
    editable: true,
    renderComponent: ChipsComponent,
    valuePrepareFunction: (value, row, cell) => {
      return value.map(c => ({ title: c, color: '' }))
    },
    editor:{
      type: 'custom'
    }
  },
}