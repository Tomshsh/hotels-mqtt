import { ChipsComponent } from '@my-tray/shared/layout'
import { CardsSelectionComponent } from '../containers/cards-selection/cards-selection.component'
import { SelectRoomRendererComponent } from '../../../tray/core/containers/select-room-renderer/select-room-renderer.component'

export const COLUMNS = {
  room: {
    title: 'Room',
    type: 'string',
    editable: true,
    valuePrepareFunction: (value, cell, row) => {
      return value.name
    },
    editor:{
      type:'custom',
      component: SelectRoomRendererComponent
    }
  },
  currCount: {
    title: 'Current count',
    type: 'number',
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
      return value.map(c => ({ title: c, color: '', abbr: c }))
    },
    editor:{
      type: 'custom',
      component: CardsSelectionComponent
    }
  },
}