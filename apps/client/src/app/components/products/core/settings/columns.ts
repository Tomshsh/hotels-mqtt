export const COLUMNS = {
  title: {
    title: 'Title',
    type: 'string',
    width: '20%',
    addable: true,
    editable: true
  },
  abbr: {
    title: 'Short Name',
    type: 'string',
    width: '10%',
    addable: true,
    editable: true
  },
  price: {
    title: 'Price',
    type: 'number',
    width: '10%',
    addable: true,
    editable: true
  },
  currency: {
    title: 'Currency',
    type: 'string',
    width: '20%',
    addable: true,
    editable: true,
    valuePrepareFunction: (value, cell, row) => {
      return value;
    },
    editor: {
      type: 'list',
      width: '80px',
      config: {
        selectText: 'Select',
        list: [
          { value: '', title: ' Select Currency ' },
          { value: 'USD', title: 'USD' },
          { value: 'EURO', title: 'EURO' },
          { value: 'NIS', title: 'NIS' },
        ],
      },
    }
  }
};
