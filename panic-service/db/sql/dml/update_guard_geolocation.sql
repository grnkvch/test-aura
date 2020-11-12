with updated_guard as (
UPDATE guards set geolocation = 'POINT(27.58 53.1101)'
WHERE id = 3 returning *
)
select 
updated_guard.id,
updated_guard.user_id,
updated_guard.available,
(select st_astext(updated_guard.geolocation)) as gelocation
from updated_guard;