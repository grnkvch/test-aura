import { IGuard } from '..'

export function updateGuardAvailability(properties: Required<Pick<IGuard, 'id'|'available'>>): [string, string[]]{
  const {id, available} = properties
  return [`with updated_guard as (
    UPDATE guards set available = $2
    WHERE id = $1 returning *
    )
    select 
    updated_guard.id,
    updated_guard.user_id,
    updated_guard.available,
    (select st_astext(updated_guard.geolocation)) as gelocation
    from updated_guard;`,
  [String(id), String(available)]
  ]
}