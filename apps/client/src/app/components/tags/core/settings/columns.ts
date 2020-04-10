import {
  DateRangePickerComponent,
  DatepickerRendererComponent,
  SelectListRendererComponent,
  SelectListComponent
} from '@my-tray/shared/layout';
import { SelectListRendererContextComponent }
from '../../components/select-list-renderer-context/select-list-renderer-context.component';

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
    editor: {
      type: 'custom',
      component: DateRangePickerComponent,
      config: {
        format: 'dd-MMM-yyyy'
      }
    }
  },
  productTitle: {
    title: 'Product Name',
    type: 'custom',
    width: '450px',
    valuePrepareFunction: (value, cell, row) => {
      return row.productTitle;
    },
    renderComponent: SelectListRendererComponent,
    editor: {
      type: 'custom',
      component: SelectListRendererContextComponent,
      onComponentInitFunction(instance: SelectListRendererContextComponent) {
        instance.itemSelect.subscribe(() => {
          console.log('Update product-price with this value');
        });
      }
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
