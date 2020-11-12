select 
  guards.id,
  guards.user_id,
  us.name,
  us.surname,
  us.organization,
  us.user_role,
  guards.available,
  (select st_astext(guards.geolocation)) as gelocation
from ((select * from users where user_role = 'guard') as us left join guards on us.id = guards.user_id) where us.id = '5583fe76-8009-42cd-a9fd-15fe3d4dc2f8';