select 
  guards.id,
  guards.user_id,
  us.name,
  us.surname,
  us.organization,
  us.user_role,
  guards.available,
  (select st_astext(guards.geolocation)) as gelocation
from ((select * from users where user_role = 'guard') as us left join guards on us.id = guards.user_id) where surname = 'Rossi' and name = 'Nikolas' 
ORDER BY ST_Distance(guards.geolocation , ST_GeographyFromText('Point(27.36253 53.317779)')) ASC;