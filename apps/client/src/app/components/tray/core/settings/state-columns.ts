import { toBoolean } from '@datorama/akita';
import { ChipsComponent, IconRendererComponent } from '@my-tray/shared/layout';
import { TrayStateDto } from '@my-tray/api-interfaces';
import { ProductsSelectionComponent } from '../containers/products-selection/products-selection.component';
import { StateFiltersComponent } from '../containers/state-filters/state-filters.component';

export const STATE_COLUMNS = {
  objectId: {
    title: 'ID',
    type: 'string',
    editable: false,
    addable: false
  },
  floor: {
    title: 'Floor',
    type: 'number',
    editable: true,
    addable: true,
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
      return toBoolean(cell.tray.isOnline) ? { icon: 'wifi-outline', status: 'success' } : {
        icon: 'wifi-off-outline',
        status: 'danger'
      };
    },
    renderComponent: IconRendererComponent,
    width: '50px',
    addable: false,
    editable: false,
  },
  num: {
    title: 'Room Number',
    type: 'number',
    editable: true,
    addable: true,
    width: '150px',
    valuePrepareFunction: (value: string, cell: TrayStateDto, row) => {
      return cell.room.num;
    }
  },
  isOccupied: {
    title: 'Vacant/Ocupied',
    type: 'boolean',
    width: '50px',
    addable: true,
    editable: true,
    valuePrepareFunction: (value: string, cell: TrayStateDto, row) => {
      return cell.room.isOccupied;
    },
    editor: {
      type: 'checkbox',
    },
  },
  isUtility: {
    title: 'Service Room',
    type: 'string',
    width: '150px',
    addable: true,
    editable: true,
    valuePrepareFunction: (value: string, cell: TrayStateDto, row) => {
      return cell.room.isUtility;
    },
    editor: {
      type: 'checkbox',
    },
  },
  products: {
    title: 'Products',
    type: 'custom',
    addable: true,
    editable: true,
    valuePrepareFunction: (value, cell, row) => {
      return cell.tray.template.products;
    },
    renderComponent: ChipsComponent,
    editor: {
      type: 'custom',
      component: ProductsSelectionComponent
    },
    filter: {
      type: 'custom',
      component: StateFiltersComponent
    }
  }
};
