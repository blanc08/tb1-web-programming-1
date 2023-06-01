<?php
require "../config/Database.php";
$mysqli = new Database();
$mysqli->connect();

$id = $_POST['id'];
// $mysqli = new mysqli("localhost", "root", "root", "tb1_aplikasi_ujian");
$selectQuery = "SELECT * FROM review_nilai WHERE id = $id";
$quizResult = $mysqli->query($selectQuery)->fetch_assoc();
$pecahanJawaban = explode(",", $quizResult['jawaban']);
$questions = $mysqli->query("SELECT * FROM questions")->fetch_all(MYSQLI_ASSOC);

$points = [];
$nilai = 0;
foreach ($pecahanJawaban as $nomor) {
    $jawaban = explode(":", $nomor);
    $questionId = (int) $jawaban[0];
    $answer = $jawaban[1];
    $ragu = $jawaban[2];

    foreach ($questions as $question) {
        // echo 'jawaban : ', strtolower($answer), strtolower($question['answer']), '<br>';
        if ($question['id'] == $questionId && strtolower($answer) === strtolower($question['answer'])) {
            array_push($points, 5);
            $nilai += 5;
        }
    }

}

$updateQuery = "UPDATE review_nilai SET nilai = '$nilai' WHERE id = $id";
$result = $mysqli->query($updateQuery);

if ($result = 1) {
    echo json_encode(['message' => 'success']);
    return;
}

echo json_encode(['message' => 'failed']);
return;