with created_user as (INSERT INTO users (name, surname, organization, user_role) 
VALUES ('John', 'Wayne', NULL, 'guard') returning *),
g as (insert into guards (user_id) (select id from created_user where user_role = 'guard'))

select 
created_user.id,
created_user.name,
created_user.surname,
created_user.organization,
created_user.user_role
from created_user;
