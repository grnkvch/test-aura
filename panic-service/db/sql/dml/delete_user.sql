with deleted_user as (DELETE FROM users 
WHERE id = '52f386fc-3f90-4ddb-9b9c-d9666fb2492b' returning *)
select 
deleted_user.id,
deleted_user.name,
deleted_user.surname,
deleted_user.organization,
deleted_user.user_role
from deleted_user;
