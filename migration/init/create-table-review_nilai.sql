CREATE TABLE IF NOT EXISTS review_nilai (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    quizId INT NOT NULL,
    userId INT NOT NULL,
    jawaban text NOT NULL,
    nilai INT(10) NULL,
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (quizId) REFERENCES quizzes(id)
);