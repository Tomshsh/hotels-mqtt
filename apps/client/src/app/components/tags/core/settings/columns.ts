import { DateRangePickerComponent, DatepickerRendererComponent } from '@my-tray/shared/layout';

export const TAGS_COLUMNS = {
  objectId: {
    title: 'ID',
    type: 'string',
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
    editor: {
      type: 'list',
      config: {
        selectText: '- none -',
        list: []
      },
    }
  },
  productPrice: {
    title: 'Price',
    type: 'number',
    editable: false
  }
};
