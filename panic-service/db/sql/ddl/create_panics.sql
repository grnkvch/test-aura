create table if not exists panics (
	id SERIAL PRIMARY KEY,
    user_id uuid,
    guard_id integer,
  	geolocation geography(POINT) not null,
  	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  	resolved_at TIMESTAMP
);

alter table panics
	add constraint fk_users_user_id
	foreign key (user_id)
	references users(id)
	on delete set null;

alter table panics
	add constraint fk_guards_guard_id
	foreign key (guard_id)
	references guards(id)
	on delete set null;