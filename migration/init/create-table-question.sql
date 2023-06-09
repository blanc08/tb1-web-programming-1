CREATE TABLE IF NOT EXISTS questions (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    quizId INT NOT NULL,
    attachment VARCHAR(255) NOT NULL,
    body LONGTEXT NOT NULL,
    option_a TEXT NOT NULL,
    option_b TEXT NOT NULL,
    option_c TEXT NOT NULL,
    option_d TEXT NOT NULL,
    option_e TEXT NOT NULL,
    attachment_a VARCHAR(255) NOT NULL,
    attachment_b VARCHAR(255) NOT NULL,
    attachment_c VARCHAR(255) NOT NULL,
    attachment_d VARCHAR(255) NOT NULL,
    attachment_e VARCHAR(255) NOT NULL,
    answer VARCHAR(255) NOT NULL,
    FOREIGN KEY (quizId) REFERENCES quizzes(id)
);