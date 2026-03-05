CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author TEXT,
    url TEXT NOT NULL,
    title TEXT NOT NULL,
    likes INTEGER DEFAULT 0
);

INSERT INTO blogs (author, url, title, likes)
VALUES
('Author One', 'https://example.com/1', 'First Blog', 0);

INSERT INTO blogs (author, url, title, likes)
VALUES
('Author Two', 'https://example.com/2', 'Second Blog', 5);