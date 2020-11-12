export function deleteUser(id: string): [string, string[]]{
  return [
    `with deleted_user as (DELETE FROM users 
    WHERE id = $1 returning *)
    select 
    deleted_user.id,
    deleted_user.name,
    deleted_user.surname,
    deleted_user.organization,
    deleted_user.user_role
    from deleted_user;`,
    [id]
  ]
}
