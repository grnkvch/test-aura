import { IUser } from '..'
import { getUserList } from './getUserList'

export function updateUser(user: Partial<IUser> & {id: string}): [string, string[]]{
  const { id, user_role, ...fieldsToUpdate } = user
  const keys = Object.keys(fieldsToUpdate)
  if(!keys.length) return [...getUserList({ id }), undefined]
  const updateFieldsString = keys.reduce((acc, item, index, {length})=>{
    acc += `${item} = $${index+2}`
    if(index !== length -1) acc+=', '
    return acc
  }, '')
  const values = Object.values(fieldsToUpdate)
  return [
    `with updated_user as (UPDATE users set ${updateFieldsString}
      WHERE id = $1 returning *)
      select 
      updated_user.id,
      updated_user.name,
      updated_user.surname,
      updated_user.organization,
      updated_user.user_role
      from updated_user;`,
    [id, ...values]
  ]
}
