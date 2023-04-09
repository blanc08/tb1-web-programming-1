CREATE TABLE IF NOT EXISTS replies (
    id NOT NULL PRIMARY KEY,
    userId INT NOT NULl,
    forumId INT NOT NULl,
    title VARCHAR(255) NOT NULL,
    body LONGTEXT NOT NULL,
    attachment VARCHAR(255) NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (forumId) REFERENCES forums(id)
)