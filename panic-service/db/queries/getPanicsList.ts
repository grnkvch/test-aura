import { IPanic } from '..'

export function getPanicsList(properties?: Pick<Partial<IPanic>, 'id'|'user_id'|'guard_id'>): [string]{
  let query = `select 
  p.id,
  (select st_astext(p.geolocation)) as gelocation,
  p.created_at,
  p.resolved_at,
  p.user_id,
  p.guard_id
  from panics p `

  if(properties){
    const { id, user_id, guard_id } = properties
    const entries = Object.entries({ id,user_id,guard_id })
    if(entries.length) {
      const fieldsString = entries.reduce((acc, [key, value], index, {length})=>{
        acc += `p.${key} = '${value}'`
        if(index !== length -1) acc+=' and '
        return acc
      }, '')
      query+=`where ${fieldsString}`
    }
  }

  return [query+';']
}