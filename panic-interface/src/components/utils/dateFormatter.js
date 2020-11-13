
const options = {
  year: 'numeric', month: 'numeric', day: 'numeric',
  hour: 'numeric', minute: 'numeric', second: 'numeric',
  hour12: false
}
const formater = new Intl.DateTimeFormat('en-EN',options)

export function dateFormatter(v){
  return v ? formater.format(new Date(v)) : ''
}