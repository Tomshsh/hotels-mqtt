import { toBoolean } from '@datorama/akita';
import { ChipsComponent, IconRendererComponent } from '@my-tray/shared/layout';
import { TrayStateDto } from '@my-tray/api-interfaces';
import { StateFiltersComponent } from '../containers/state-filters/state-filters.component';

export const STATE_COLUMNS = {
  objectId: {
    title: 'ID',
    type: 'string',
  },
  floor: {
    title: 'Floor',
    type: 'number',
    width: '100px',
    valuePrepareFunction: (value: string, cell: TrayStateDto, row) => {
      return cell.room.floor;
    }
  },
  isOnline: {
    title: 'Online',
    type: 'custom',
    filter: false,
    valuePrepareFunction: (value, cell, row) => {
      return toBoolean(cell.isOnline) ? { icon: 'wifi-outline', status: 'success' } : {
        icon: 'wifi-off-outline',
        status: 'danger'
      };
    },
    renderComponent: IconRendererComponent,
    width: '50px'
  },
  num: {
    title: 'Room Number',
    type: 'number',
    width: '150px',
    valuePrepareFunction: (value: string, cell: TrayStateDto, row) => {
      return cell.room.num;
    }
  },
  isOccupied: {
    title: 'Vacant/Occupied',
    type: 'boolean',
    width: '50px',
    valuePrepareFunction: (value: string, cell: TrayStateDto, row) => {
      return cell.room.isOccupied;
    },
    editor: {
      type: 'checkbox',
    },
  },

  products: {
    title: 'Products',
    type: 'custom',
    valuePrepareFunction: (value, cell, row) => {
      return toTupleArray(cell.states);
    },
    renderComponent: ChipsComponent,
    filter: {
      type: 'custom',
      component: StateFiltersComponent
    }
  }
};

function toTupleArray(array) {
  return array?.map(x => x.tag.title ? { title: x.tag.abbr, color: x.lastAction } : '')
    .filter(p => p);
}
