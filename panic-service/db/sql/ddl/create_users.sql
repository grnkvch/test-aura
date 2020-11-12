CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

create table if not exists users (
	id uuid PRIMARY key default uuid_generate_v4(),
    name text NOT null,
    surname text,
    organization text,
    user_role text NOT null,
    foreign key ("user_role") references "user_roles" ("user_role") 
);
