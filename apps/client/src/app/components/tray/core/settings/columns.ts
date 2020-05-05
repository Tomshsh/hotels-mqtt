import { SelectListRendererComponent } from '@my-tray/shared/layout';
import { SelectRoomRendererComponent } from '../../components/select-room-renderer/select-room-renderer.component';
import { IconRendererComponent } from '@my-tray/shared/layout';
import { toBoolean } from '@datorama/akita';

export const TRAY_COLUMNS = {
  objectId: {
    title: 'ID',
    type: 'string',
    width: '200px',
    addable: true,
    editable: false
  },
  title: {
    title: 'Title',
    type: 'string',
    width: '250px',
    addable: true,
    editable: true
  },
  room: {
    title: 'Room Name',
    type: 'string',
    width: '250px',
    valuePrepareFunction: (value, cell, row) => {
      const { title } = value;
      if (!title) {
        return value.name;
      }
      return title;
    },
    renderComponent: SelectListRendererComponent,
    editor: {
      type: 'custom',
      component: SelectRoomRendererComponent
    }
  },
  isOnline: {
    title: 'Online',
    type: 'custom',
    filter: false,
    valuePrepareFunction: (value, cell, row) => {
      return toBoolean(value) ? { icon: 'wifi-outline', status: 'success' } : {
        icon: 'wifi-off-outline',
        status: 'danger'
      };
    },
    renderComponent: IconRendererComponent,
    width: '80px',
    editor: {
      type: 'list',
      width: '80px',
      config: {
        selectText: 'Select',
        list: [
          { value: '', title: ' Select ' },
          { value: true, title: 'Active' },
          { value: false, title: 'Not' },
        ],
      },
    }
  },
  isService: {
    title: 'Service',
    type: 'bool',
    width: '200px',
    addable: false,
    editable: false,
    filter: false
  }
};
