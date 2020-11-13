import { IGuard } from '..'

export function updateGuardGeolocation(properties: Required<Pick<IGuard, 'id'|'geolocation'>>): [string, string[]]{
  const {id, geolocation: { lon, lat }} = properties
  console.log({ lon, lat })
  return [`with updated_guard as (
    UPDATE guards set geolocation = 'POINT(${lon} ${lat})'
    WHERE id = $1 returning *
    )
    select 
    updated_guard.id,
    updated_guard.user_id,
    updated_guard.available,
    (select st_astext(updated_guard.geolocation)) as gelocation
    from updated_guard;`,
  [String(id)]
  ]
}