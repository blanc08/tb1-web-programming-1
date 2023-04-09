CREATE TABLE IF NOT EXISTS user (
    id NOT NULL PRIMARY KEY,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    level enum('teacher', 'student') NOT NULL,
    nama VARCHAR(50) NOT NULL
)