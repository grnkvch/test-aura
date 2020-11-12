with updated_guard as (
UPDATE guards set available = false
WHERE user_id = 3 returning *
)
select 
updated_guard.id,
updated_guard.user_id,
updated_guard.available,
(select st_astext(updated_guard.geolocation)) as gelocation
from updated_guard;