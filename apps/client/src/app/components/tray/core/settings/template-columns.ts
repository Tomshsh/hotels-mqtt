import { ChipsComponent } from '@my-tray/shared/layout';
import { ProductsSelectionComponent } from '../containers/products-selection/products-selection.component';

export const TEMPLATE_COLUMNS = {
  title: {
    title: 'Title',
    type: 'string',
    width: '250px',
    addable: true,
    editable: true
  },
  products: {
    title: 'Products',
    type: 'custom',
    addable: true,
    editable: true,
    valuePrepareFunction: (value, cell, row) => {
      return value;
    },
    renderComponent: ChipsComponent,
    editor: {
      type: 'custom',
      component: ProductsSelectionComponent
    }
  }
};
