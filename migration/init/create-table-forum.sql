CREATE TABLE IF NOT EXISTS forums (
    id INT NOT NULL PRIMARY KEY,
    userId INT NOT NULl,
    title VARCHAR(255) NOT NULL,
    publishDate VARCHAR(50) NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id)
)   