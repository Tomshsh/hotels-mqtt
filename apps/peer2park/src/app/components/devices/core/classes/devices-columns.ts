import { SocketStatusRendererComponent } from '../../components/socket-status-renderer/socket-status-renderer.component';
import { CustomActionsComponent } from '@my-tray/shared/layout';

export const DEVICES_COLUMNS = {
  serial: {
    title: 'Serial',
    type: 'text',
    valuePrepareFunction: (cell: any, row: any[]) => {
      // return row.deviceNo
    }
  },
  sockets: {
    title: 'Sockets',
    type: 'custom',
    renderComponent: SocketStatusRendererComponent,
    onComponentInitFunction: (btnGroup: SocketStatusRendererComponent) => {
      /*btnGroup.onInitFunction = function () {
        const sockets: any[] = btnGroup.value
        btnGroup.indicators = sockets.filter(s => s.resource === 'energy').map(s => s.socketNo).sort((a, b) => a - b)
      }*/
    },
    valuePrepareFunction: (cell, row) => {
     /* const sockets: any[] = row.sockets
      return sockets.length ? sockets : null*/
    }
  },
  valve: {
    title: 'Valve',
    type: 'custom',
    renderComponent: SocketStatusRendererComponent,
    onComponentInitFunction: (btnGroup: SocketStatusRendererComponent) => {
      // btnGroup.onInitFunction = () => {
        // const sockets: any[] = btnGroup.value
        // btnGroup.indicators = sockets.filter(s => s.resource === 'water').map(s => s.socketNo).sort((a, b) => a - b)
      // }
    },
    valuePrepareFunction: (cell, row) => {
      // const sockets: any[] = row.sockets
      // return sockets.length ? sockets : null
    }
  },
  actions: {
    title: 'actions',
    type: 'custom',
    renderComponent: CustomActionsComponent,
    onComponentInitFunction: (actionsComp: CustomActionsComponent) => {
     /* actionsComp.buttons = ['control', 'history'];
      actionsComp.clickHandler = (ref: HTMLButtonElement) => {
        switch (ref.innerText) {
          case 'control':
            break;
        }
      }*/
    }
  }
};