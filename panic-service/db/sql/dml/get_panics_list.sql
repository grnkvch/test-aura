select 
  p.id,
  (select st_astext(p.geolocation)) as gelocation,
  p.created_at,
  p.resolved_at,
  p.user_id,
  p.guard_id
from panics p where guard_id = 5;