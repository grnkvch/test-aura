with updated_panic as (
    UPDATE panics set guard_id = 5
    WHERE id = '6731cd44-0c45-48e2-b21a-73bd76236056' returning *
    )
select updated_panic.id,
(select st_astext(updated_panic.geolocation)) as gelocation,
updated_panic.created_at,
updated_panic.resolved_at,
updated_panic.user_id,
updated_panic.guard_id 
from updated_panic;