CREATE TABLE IF NOT EXISTS quizzes (
    id NOT NULL PRIMARY KEY,
    nama VARCHAR(50) NOT NULL,
    mata_pelajaran VARCHAR(50) NOT NULL,
    timer INT(30) NOT NULL 
)