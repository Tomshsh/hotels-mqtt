import { ChipsComponent, IconRendererComponent } from '@my-tray/shared/layout';
import { CardsSelectionComponent } from '../../../towels/core/containers/cards-selection/cards-selection.component';

export const COLUMNS = {
  name: {
    title: 'Name',
    type: 'string',
    editable: true
  },
  onShift: {
    title: 'On Shift',
    type: 'custom',
    renderComponent:IconRendererComponent,
    valuePrepareFunction: (val, row, cell) => {
      return val ? {icon:'checkmark', status: 'success'} : {icon: 'close', status: 'danger'}
    },
    editable: true,
    editor: {
      type: 'custom',
      component: ()=>{}
    }
  },
  chores: {
    title: 'chores',
    type: 'custom',
    renderComponent: ChipsComponent,
    valuePrepareFunction: (val, row, col) => {
      return val.map(x => ({
        title: x,
        abbr: x
      }))
    },
    editable: true,
    editor:{
      type: 'custom',
      component: CardsSelectionComponent
    }

  }
}