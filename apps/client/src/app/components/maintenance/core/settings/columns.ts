import { ChipsComponent, IconRendererComponent, ToggleComponent } from '@my-tray/shared/layout';
import { OnShiftToggleComponent, ChoreSelectionComponent } from '../containers';
import { ChoreDto } from '@my-tray/api-interfaces';

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
    valuePrepareFunction: (val: ChoreDto[], row, col) => {
      if (val) {
        return val.map(x => ({
          title: x.title,
          abbr: x.abbr
        }))
      }
    },
    editable: true,
    editor: {
      type: 'custom',
      component: ChoreSelectionComponent
    }

  }
}