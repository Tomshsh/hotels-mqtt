import { ChipsComponent, IconRendererComponent, ToggleComponent } from '@my-tray/shared/layout';
import { CardsSelectionComponent } from '../../../towels/core';
import { OnShiftToggleComponent } from '../containers';

export const COLUMNS = {
  name: {
    title: 'Name',
    type: 'string',
    editable: true
  },
  onShift: {
    title: 'On Shift',
    type: 'custom',
    renderComponent: IconRendererComponent,
    valuePrepareFunction: (val, row, cell) => {
      return val ? { icon: 'checkmark', status: 'success', value: true } : { icon: 'close', status: 'danger', value: false }
    },
    editable: true,
    editor: {
      type: 'custom',
      component: OnShiftToggleComponent
    }
  },
  chores: {
    title: 'chores',
    type: 'custom',
    renderComponent: ChipsComponent,
    valuePrepareFunction: (val, row, col) => {
      if (val) {
        return val.map(x => ({
          title: x,
          abbr: x
        }))
      }
    },
    editable: true,
    editor: {
      type: 'custom',
      component: CardsSelectionComponent
    }

  }
}