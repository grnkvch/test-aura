import { IGuard } from '..'

export function getGuardsList(guardsProperties?: Partial<IGuard>): [string]{
  let query = `select 
  guards.id,
  guards.user_id,
  us.name,
  us.surname,
  us.organization,
  us.user_role,
  guards.available,
  (select st_astext(guards.geolocation)) as gelocation
  from ((select * from users where user_role = 'guard') as us left join guards on us.id = guards.user_id) `
  
  if(guardsProperties){
    const { geollocation, ...rest } = guardsProperties
    const entries = Object.entries(rest)
    if(entries.length) {
      const userFieldsString = entries.reduce((acc, [key, value], index, {length})=>{
        acc += `${key === 'id' ? 'guards.id' : key} = '${value}'`
        if(index !== length -1) acc+=', '
        return acc
      }, '')
      query+=`where ${userFieldsString}`
    }
  }

  return [query+';']
}