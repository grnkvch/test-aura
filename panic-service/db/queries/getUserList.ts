import { IUser } from '..'

export function getUserList(userProperties?: Partial<IUser>): [string]{
  let query = `select 
  u.id,
  u.name,
  u.surname,
  u.organization,
  u.user_role
  from users u `
  console.log(userProperties)
  if(userProperties){
    const entries = Object.entries(userProperties)
    if(entries.length) {
      const userFieldsString = entries.reduce((acc, [key, value], index, {length})=>{
        acc += `u.${key} = '${value}'`
        if(index !== length -1) acc+=', '
        return acc
      }, '')
      query+=`where ${userFieldsString}`
    }
  }

  return [query+';']
}