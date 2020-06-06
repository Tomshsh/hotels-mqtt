export const ROOMS_COLUMNS = {
  floor: {
    title: 'Floor',
    type: 'number',
    editable: true,
    addable: true,
    width: '50px'
  },
  num: {
    title: 'Room Number',
    type: 'number',
    editable: true,
    addable: true,
    width: '150px'
  },
  name: {
    title: 'Name',
    type: 'string',
    width: '150px',
    addable: true,
    editable: true,

  },
  isOccupied: {
    title: 'Vacant/Ocupied',
    type: 'boolean',
    width: '50px',
    addable: true,
    editable: true,
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
    editor: {
      type: 'checkbox',
    },
  }
};
