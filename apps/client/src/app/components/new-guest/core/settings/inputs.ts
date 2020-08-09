export const INPUTS = [
    {label:"Guest name", input:"input", name:'guestName'},
    {
      label:"Room number",
      input:"select",
      required:true,
      name:'roomNo',
      selectOptions:[
        {value:'option 1', text:'option'}
      ]
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
    {label:"Towel limit", input:"input", name:'towelLimit', type:'number'},
    {label:'card', input:'duplicatable', name:'cards' },
  ]