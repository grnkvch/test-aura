select 
  u.id,
  u.name,
  u.surname,
  u.organization,
  u.user_role
from users u where u.name = 'John';