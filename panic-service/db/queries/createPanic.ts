import { IPanic } from '..'

export function createPanic(properties: Required<Pick<IPanic, 'user_id'|'geolocation'>>): [string, string[]]{
  const {user_id, geolocation: { lon, lat }} = properties
  return [`with created_panic as (INSERT INTO panics (user_id , geolocation) 
  VALUES ($1, 'POINT(${lon} ${lat})') returning *)

  select 
  created_panic.id,
  created_panic.user_id,
  created_panic.guard_id,
  (select st_astext(created_panic.geolocation)) as gelocation,
  created_panic.created_at,
  created_panic.resolved_at
  from created_panic;`,
  [user_id]
  ]
}