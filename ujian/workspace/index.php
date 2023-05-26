<?php

$slug = $_GET['slug'];
$mysqli = new mysqli("localhost", "root", "root", "tb1_aplikasi_ujian");
$quiz = $mysqli->query("SELECT * FROM quizzes WHERE slug = '$slug'")->fetch_array();
$quizId = $quiz['id'];
$userId = 1;

$currentDateTime = new DateTime(timezone: new DateTimeZone('Asia/Jakarta'));

$questions = $mysqli->query("SELECT questions.* FROM questions INNER JOIN quizzes ON quizzes.slug = '" . $slug . "'");

// Insert dummy data
$insertDummyQuery = "INSERT INTO review_nilai (quizId, userId, jawaban) VALUES ($quizId, $userId, '');";
$mysqli->query($insertDummyQuery);
$result = $mysqli->query("SELECT LAST_INSERT_ID();")->fetch_array();

?>

<html style="height: auto; min-height: 100%;">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Ujian</title>
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <link rel="stylesheet" href="/tb1-web-programming-1/assets/css/bootstrap.min.css">
    <script src="https://kit.fontawesome.com/0952a2e6cc.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="/tb1-web-programming-1/assets/css/AdminLTE.min.css">
    <link rel="stylesheet" href="/tb1-web-programming-1/assets/css/skin-blue.min.css">
    <link rel="stylesheet" href="/tb1-web-programming-1/assets/css/mystyle.css">
    <link rel="stylesheet" href="/tb1-web-programming-1/assets/css/pace-theme-flash.css">
    <link rel="stylesheet" href="/tb1-web-programming-1/assets/css/halamanujian.css">

    <script src="/tb1-web-programming-1/assets/js/jquery-3.3.1.min.js"></script>
    <script src="/tb1-web-programming-1/assets/js/sweetalert2.all.min.js"></script>

</head>

<body class="skin-blue layout-top-nav  pace-done" style="height: auto; min-height: 100%;">
    <div class="pace  pace-inactive">
        <div class="pace-progress" data-progress-text="100%" data-progress="99"
            style="transform: translate3d(100%, 0px, 0px);">
            <div class="pace-progress-inner"></div>
        </div>
        <div class="pace-activity"></div>
    </div>
    <div class="wrapper" style="height: auto; min-height: 100%;">

        <header class="main-header">
            <nav class="navbar navbar-static-top">
                <div class="container">
                    <div class="navbar-header">
                        <a href="#" class="navbar-brand">
                            <i class="fa fa-laptop"></i>
                            <b>Tryout</b>Indonesia</a>
                        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                            data-target="#navbar-collapse">
                            <i class="fa fa-bars"></i>
                        </button>
                    </div>

                    <!-- Collect the nav links, forms, and other content for toggling -->
                    <div class="collapse navbar-collapse pull-left" id="navbar-collapse">
                        <ul class="nav navbar-nav">
                            <li><a href="#">Name</a></li>
                        </ul>
                    </div>
                    <div class="navbar-custom-menu">
                        <ul class="nav navbar-nav">
                            <li><a href="#" onclick="simpan_akhir()">Selesai Ujian</a></li>
                            <li class="dropdown">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="true">
                                    67290597 <span class="caret"></span>
                                </a>
                                <ul class="dropdown-menu" role="menu">
                                    <li><a href="localhost/tb1-web-programming-1">Logout</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <!-- /.navbar-collapse -->
                </div>
                <!-- /.container-fluid -->
            </nav>
        </header>
        <!-- Full Width Column -->
        <div class="content-wrapper" style="min-height: 508px;">
            <div class="container">
                <!-- Content Header (Page header) -->
                <section class="content-header">
                    <h1>
                        Ujian <small>Lembar Ujian</small>
                    </h1>
                    <ol class="breadcrumb">
                        <li>
                            <a href="localhost/tb1-web-programming-1">
                                <i class="fa fa-dashboard"></i> Home
                            </a>
                        </li>
                        <li><a href="localhost/tb1-web-programming-1">Ujian</a></li>
                        <li class="active">Lembar Ujian</li>
                    </ol>
                </section>

                <!-- Main content -->
                <section class="content">
                    <div class="row">
                        <!-- Questions -->
                        <div class="col-sm-9">
                            <form action="localhost/tb1-web-programming-1/ujian/#" id="ujian" method="post">

                                <input type="hidden" name="id" value="<?= $result[0] ?>">
                                <input type="hidden" name="csrf_test_name" value="ff13272d8103abd6f4cf328562ee6bc8">

                                <div class="box box-primary">
                                    <div class="box-header with-border">
                                        <h3 class="box-title">
                                            <h6 class="badge bg-blue">Soal # <span id='soalke'></span></h6>
                                        </h3>
                                        <div class="box-tools pull-right">
                                            <span class="badge bg-red">
                                                <span class="sisawaktu"
                                                    data-time="<?= $currentDateTime->add(DateInterval::createFromDateString($quiz['timer'] . ' minutes'))->format('Y-m-d H:m:s') ?>">
                                                    Jam Menit Detik
                                                </span></span>
                                            <button type="button" class="btn btn-box-tool" data-widget="collapse">
                                                <i class="fa fa-minus"> </i>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="box-body">
                                        <?php while ($question = mysqli_fetch_assoc($questions)): ?>
                                            <input type="hidden" name="id_soal_<?= $question['id'] ?>"
                                                value="<?= $question['id'] ?>">
                                            <input type="hidden" name="rg_<?= $question['id'] ?>"
                                                id="rg_<?= $question['id'] ?>" value="">
                                            <div class="step" id="widget_<?= $question['id'] ?>">
                                                <div class="text-center">
                                                    <div>
                                                        <?= $question['attachment'] !== '' ? $question['attachment'] : '' ?>
                                                    </div>
                                                </div>
                                                <p>
                                                    <?= $question['body'] ?>
                                                </p>
                                                <!-- Options -->
                                                <div class="options">
                                                    <div class="funkyradio">
                                                        <div class="funkyradio-success"
                                                            onclick="return simpan_sementara();">
                                                            <input class="soal" type="radio"
                                                                id="opsi_a_<?= $question['id'] ?>"
                                                                name="opsi_<?= $question['id'] ?>" value="A">
                                                            <label for="opsi_a_<?= $question['id'] ?>">
                                                                <div class="huruf_opsi">a</div>
                                                                <p class="py-3 mb-0">
                                                                    <?= $question['option_a'] ?>
                                                                </p>
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div class="funkyradio">
                                                        <div class="funkyradio-success"
                                                            onclick="return simpan_sementara();">
                                                            <input class="soal" type="radio"
                                                                id="opsi_b_<?= $question['id'] ?>"
                                                                name="opsi_<?= $question['id'] ?>" value="B">
                                                            <label for="opsi_b_<?= $question['id'] ?>">
                                                                <div class="huruf_opsi">b</div>
                                                                <p class="py-3 mb-0">
                                                                    <?= $question['option_b'] ?>
                                                                </p>
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div class="funkyradio">
                                                        <div class="funkyradio-success"
                                                            onclick="return simpan_sementara();">
                                                            <input class="soal" type="radio"
                                                                id="opsi_c_<?= $question['id'] ?>"
                                                                name="opsi_<?= $question['id'] ?>" value="C">
                                                            <label for="opsi_c_<?= $question['id'] ?>">
                                                                <div class="huruf_opsi">c</div>
                                                                <p class="py-3 mb-0">
                                                                    <?= $question['option_c'] ?>
                                                                </p>
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div class="funkyradio">
                                                        <div class="funkyradio-success"
                                                            onclick="return simpan_sementara();">
                                                            <input class="soal" type="radio"
                                                                id="opsi_d_<?= $question['id'] ?>"
                                                                name="opsi_<?= $question['id'] ?>" value="D">
                                                            <label for="opsi_d_<?= $question['id'] ?>">
                                                                <div class="huruf_opsi">d</div>
                                                                <p class="py-3 mb-0">
                                                                    <?= $question['option_d'] ?>
                                                                </p>
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div class="funkyradio">
                                                        <div class="funkyradio-success"
                                                            onclick="return simpan_sementara();">
                                                            <input class="soal" type="radio"
                                                                id="opsi_e_<?= $question['id'] ?>"
                                                                name="opsi_<?= $question['id'] ?>" value="E">
                                                            <label for="opsi_e_<?= $question['id'] ?>">
                                                                <div class="huruf_opsi">e</div>
                                                                <p class="py-3 mb-0">
                                                                    <?= $question['option_e'] ?>
                                                                </p>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        <?php endwhile ?>
                                    </div>
                                    <div class="box-footer text-center">
                                        <a class="action back btn btn-info" rel="0" onclick="return back();"
                                            style="display: none;">
                                            <i class="glyphicon glyphicon-chevron-left"></i> Back
                                        </a>
                                        <a class="ragu_ragu btn btn-warning" rel="1" onclick="return tidak_jawab();">
                                            Ragu
                                        </a>
                                        <a class="action next btn btn-info" rel="2" onclick="return next();">
                                            <i class="glyphicon glyphicon-chevron-right"></i>
                                            Next
                                        </a>
                                        <a class="selesai action submit btn btn-danger" onclick="return simpan_akhir();"
                                            style="display: none;">
                                            <i class="glyphicon glyphicon-stop"></i>
                                            Selesai
                                        </a>
                                        <input type="hidden" name="jml_soal" id="jml_soal"
                                            value="<?= $questions->num_rows + 1 ?>">
                                        <input type="hidden" name="kode_tryout" value="b2eaa075fd">

                                    </div>
                                </div>
                            </form>
                        </div>
                        <!-- Navigation -->
                        <div class="col-sm-3">
                            <div class="box box-primary">
                                <div class="box-header with-border">
                                    <h3 class="box-title">Navigasi Soal</h3>
                                    <div class="box-tools pull-right">
                                        <button type="button" class="btn btn-box-tool" data-widget="collapse">
                                            <i class="fa fa-minus"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="box-body text-center" id="tampil_jawaban">
                                    <a id="btn_soal_1" class="btn btn-default bg-red btn_soal btn-sm"
                                        onclick="return buka(1);">
                                        1.
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <!-- /.content -->
            </div>
            <!-- /.container -->
        </div>
        <!-- /.content-wrapper -->
        <footer class="main-footer">
            <div class="container">
                <span id='current-date'></span>
                ,
                <span class="live-clock"></span>
            </div>
            <!-- /.container -->
        </footer>
    </div>
    <!-- ./wrapper -->

    <script src="/tb1-web-programming-1/assets/js/soalujian.js"> </script>
    <script src="/tb1-web-programming-1/assets/js/bootstrap.min.js"> </script>
    <script src="/tb1-web-programming-1/assets/js/adminlte.min.js"> </script>
    <script src="/tb1-web-programming-1/assets/js/pace.min.js"> </script>

</body>

</html>