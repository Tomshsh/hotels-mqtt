import { ChipsComponent } from '@my-tray/shared/layout'

export const COLUMNS = {
  room:{
    title:'Room',
    type:'string',
    valuePrepareFunction: (value, cell, row)=> {
      return value.num
    }
  },
  currCount:{
    title:'Current count',
    type:'string',
    filter:false
  },
  towelLimit:{
    title:'Limit',
    type:'number',
    filter:false
  },
  cards:{
    title:'cards',
    type:'custom',
    filter:false,
    renderComponent: ChipsComponent,
    valuePrepareFunction: (value, row, cell)=>{
      console.log(row)
      return value.map(c => ({title: c, color: ''}))
    }

  }
}