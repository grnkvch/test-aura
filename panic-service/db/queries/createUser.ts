import { IUser } from '..'

export function createUser(user: IUser): [string, string[]]{
  const { name, surname, organization, user_role } = user
  return [
    `with created_user as (INSERT INTO users (name, surname, organization, user_role) 
    VALUES ($1, $2, $3, $4) returning *),
    g as (insert into guards (user_id) (select id from created_user where user_role = 'guard'))
    
    select 
    created_user.id,
    created_user.name,
    created_user.surname,
    created_user.organization,
    created_user.user_role
    from created_user;`,
    [name, surname || null, organization || null, user_role]
  ]
}
