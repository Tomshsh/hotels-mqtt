import {
  DatepickerRendererComponent,
  DateRangePickerComponent,
  SelectListRendererComponent
} from '@my-tray/shared/layout';
import { SelectListRendererContextComponent } from '../../components/select-list-renderer-context/select-list-renderer-context.component';

export const TAGS_COLUMNS = {
  objectId: {
    title: 'ID',
    type: 'string',
    width: '200px',
    addable: true,
    editable: false
  },
  expDate: {
    title: 'Expiration Date',
    type: 'custom',
    width: '250px',
    renderComponent: DatepickerRendererComponent,
    valuePrepareFunction: (value, cell, row) => {
      return value;
    },
    editor: {
      type: 'custom',
      component: DateRangePickerComponent,
    }
  },
  productTitle: {
    title: 'Product Name',
    type: 'custom',
    width: '450px',
    valuePrepareFunction: (value, cell, row) => {
      return value;
    },
    renderComponent: SelectListRendererComponent,
    editor: {
      type: 'custom',
      component: SelectListRendererContextComponent
    }
  },
  productPrice: {
    title: 'Price',
    type: 'number',
    editable: false,
    addable: false,
    width: '450px',
    valuePrepareFunction: (cell, row) => {
      return row.productPrice;
    },
  }
};
