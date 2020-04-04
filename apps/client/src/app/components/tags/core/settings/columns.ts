import { DateRangePickerComponent, DateRangePickerRenderComponent } from '@my-tray/shared/layout';

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
    renderComponent: DateRangePickerRenderComponent,
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
    type: 'number'
  }
};
