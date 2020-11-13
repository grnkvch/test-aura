create table if not exists user_roles (
	id SERIAL PRIMARY KEY,
    user_role text UNIQUE NOT null
);