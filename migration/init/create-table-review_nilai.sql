CREATE TABLE IF NOT EXISTS review_nilai (
    quizId INT NOT NULL,
    userId INT NOT NULL,
    jawaban text NOT NULL,
    nilai INT(10) NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (quizId) REFERENCES quizzes(id)
)