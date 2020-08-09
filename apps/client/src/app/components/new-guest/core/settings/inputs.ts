export const INPUTS = [
    {label:"Guest name", input:"input", name:'guestName', value: ''},
    {
      label:"Room number",
      input:"select",
      required:true,
      name:'room',
      selectOptions:[]
    },
    {
      label: "Language",
      input: "select",
      name:"lang",
      value:"HE",
      selectOptions:[
        {value:'HE', text:"Hebrew"},
        {value:"EN", text:"English"},
        {value:"RUS", text:"Russian"}
      ]
    },
    {label:"Towel limit", input:"input", name:'towelLimit', type:'number', value:0},
    {label:'card', input:'duplicatable', name:'cards', value: '' },
  ]
