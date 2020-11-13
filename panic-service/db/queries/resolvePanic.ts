export function resolvePanic(panicId: string): [string, string[]]{
  return [`with updated_panic as (
    UPDATE panics set resolved_at = NOW()
    WHERE id = $1 returning *
    )
    select updated_panic.id,
    (select st_astext(updated_panic.geolocation)) as gelocation,
    updated_panic.created_at,
    updated_panic.resolved_at,
    updated_panic.user_id,
    updated_panic.guard_id 
    from updated_panic;`,
  [panicId]
  ]
}