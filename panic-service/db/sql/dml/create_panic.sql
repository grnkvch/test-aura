with created_panic as (INSERT INTO panics (user_id , geolocation) 
  VALUES ('54673a6f-69bc-45c2-8192-ec9f109120d6', 'POINT(27.58 53.1101)') returning *)
  
select 
created_panic.id,
created_panic.user_id,
created_panic.guard_id,
(select st_astext(created_panic.geolocation)) as gelocation,
created_panic.created_at,
created_panic.resolved_at
from created_panic;