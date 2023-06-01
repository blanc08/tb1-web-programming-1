<?php
require "../config/Database.php";
$mysqli = new Database();
$mysqli->connect();


// Decrypt Id
$id_tes = $_POST['id'];
$input = $_POST;

$list_jawaban = "";
for ($i = 1; $i < $input['jml_soal']; $i++) {
    $_tjawab = "opsi_" . $i;
    $_tidsoal = "id_soal_" . $i;
    $_ragu = "rg_" . $i;
    $jawaban_ = empty($input[$_tjawab]) ? "" : $input[$_tjawab];
    $list_jawaban .= "" . $input[$_tidsoal] . ":" . $jawaban_ . ":" . $input[$_ragu] . ",";
}
$list_jawaban = substr($list_jawaban, 0, -1);


// save list_jawaban to jawaban column
// $mysqli = new mysqli("localhost", "root", "root", "tb1_aplikasi_ujian");
$updateQuery = "UPDATE review_nilai SET jawaban = '$list_jawaban' WHERE id = $id_tes";
$mysqli->query($updateQuery);