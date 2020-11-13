create table if not exists connections (
	id SERIAL PRIMARY KEY,
    connection_id text UNIQUE
);