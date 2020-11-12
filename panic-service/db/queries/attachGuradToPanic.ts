import { IPanic } from '..'

export function attachGuradToPanic(properties: Required<Pick<IPanic, 'id'|'guard_id'>>): [string, string[]]{
  const {id, guard_id} = properties

  return [`with updated_panic as (
    UPDATE panics set guard_id = $2
    WHERE id = $1 returning *
    )
    select updated_panic.id,
    (select st_astext(updated_panic.geolocation)) as gelocation,
    updated_panic.created_at,
    updated_panic.resolved_at,
    updated_panic.user_id,
    updated_panic.guard_id 
    from updated_panic;`,
  [id, String(guard_id)]
  ]
}