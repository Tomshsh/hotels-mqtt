import { IconRendererComponent } from '@my-tray/shared/layout';
import { OnShiftToggleComponent } from '../../../maintenance/core/containers';

export const COLUMNS = {
  id:{
    title:"ID",
    type:"string",
    editable: false,
    addable: false
  },
  quantity:{
    title:"quantity",
    type: 'number',
  },

  capacity: {
    title: 'capacity',
    type: 'number',
  },

  open: {
    title:"open",
    type: 'custom',
    renderComponent: IconRendererComponent,
    valuePrepareFunction:(val, row, cell)=>{
      return val ? { icon: 'checkmark', status: 'success', value: true } : { icon: 'close', status: 'danger', value: false }
    },
    editor: {
      type: 'custom',
      component: OnShiftToggleComponent
    }
  }
  // title:{
  //   title: "Title",
  //   type:"string"
  // },
  // cells:{
  //   title:"Cells",
  //   type: "custom"

  // }


}