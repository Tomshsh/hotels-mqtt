import moment from 'moment';

export const COLUMNS = {
  title:{
    title: 'chore',
    type: 'string',
  },
  updatedAt: {
    title: 'updated at',
    type: 'string',
    editable: false,
    addable: false,
    valuePrepareFunction:(val, row, col) => {
      return moment(row.updatedAt).format('lll')
    }
  },

}