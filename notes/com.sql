CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    content TEXT,
    important BOOLEAN DEFAULT FALSE,
    date TIMESTAMP
);

insert into notes (content, important) values ('Relational databases rule the world', true);
insert into notes (content, important) values ('MongoDB is webscale', false);

insert into users (username, name, passwordHash) values ('anna', 'Anna Shi', 'hashedpassword');
insert into users (username, name) values ('anna', 'Anna Shi');