with updated_user as (UPDATE users set name = 'Johny', surname = 'Cash'
WHERE id = '96485527-935e-470d-93c9-17af2463f562' returning *)
select 
updated_user.id,
updated_user.name,
updated_user.surname,
updated_user.organization,
updated_user.user_role
from updated_user;