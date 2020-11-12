create table if not exists guards (
	id SERIAL PRIMARY KEY,
    user_id uuid UNIQUE,
    available bool,
    geolocation geography(POINT)
);

alter table guards
	add constraint fk_users_user_id
	foreign key (user_id)
	references users(id)
	on delete cascade;