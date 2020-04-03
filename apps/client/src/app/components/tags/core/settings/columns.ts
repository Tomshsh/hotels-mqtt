export const TAGS_COLUMNS = {
  objectId: {
    title: 'ID',
    type: 'string',
    addable: true,
    editable: false
  },
  expDate: {
    title: 'Expiration Date',
    type: 'string'
  },
  productTitle: {
    title: 'Product Name',
    editor: {
      type: 'list',
      config: {
        selectText: '- none -',
        list: [
          {value: '1', title:'admin'},
          {value: '2', title:'restricted'},
          {value: '3', title:'entry'},
          {value: '4', title:'report'},
        ]
      },
    }
  },
  productPrice: {
    title: 'Price',
    type: 'number'
  }
};
