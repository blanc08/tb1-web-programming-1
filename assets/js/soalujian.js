var base_url = "localhost/tb1-web-programming-1/";
var id_tes =
  "f07fe79beee22e90fce51eac869c47e6d8d153ff929c8eb36c8b71691b95f3a4dd561d32dd448b2276b25b88226015e018b709d2e94056c1ec1ba6ece170991b93bvM5Q/dQGf+rYwrN0U4UmTZdiARGp+zWJXJn6v3Ek=";
var widget = $(".step");
var total_widget = widget.length;
var kode_tryout = "b2eaa075fd";
var userid = "106";
var id_tryout = "";

function sisawaktu(t) {
  // Set the date we're counting down to
  var countDownDate = new Date(t.replace(/-/g, "/")).getTime();

  // Update the count down every 1 second
  var x = setInterval(function () {
    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    // $('.sisawaktu').html(days + "d " + hours + "h " + minutes + "m " + seconds + "s ");
    $(".sisawaktu").html(
      hours + "Jam " + minutes + "Meni " + seconds + "Detik "
    );

    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(x);
      waktuHabis();
    }
  }, 1000);
}

function ajaxcsrf() {
  var csrfname = "csrf_test_name";
  var csrfhash = "ff13272d8103abd6f4cf328562ee6bc8";
  var csrf = {};
  csrf[csrfname] = csrfhash;
  $.ajaxSetup({
    data: csrf,
  });
}

$(document).ready(function () {
  setInterval(function () {
    var date = new Date().toLocaleTimeString();
    $(".live-clock").html(date);
  }, 1000);
});

$(document).ready(function () {
  var t = $(".sisawaktu");
  if (t.length) {
    sisawaktu(t.data("time"));
  }

  buka(1);
  simpan_sementara();

  widget = $(".step");
  btnnext = $(".next");
  btnback = $(".back");
  btnsubmit = $(".submit");

  // $(".step, .back, .selesai").hide();
  $("#widget_1").show();
});

function getFormData($form) {
  var unindexed_array = $form.serializeArray();
  var indexed_array = {};
  $.map(unindexed_array, function (n, i) {
    indexed_array[n["name"]] = n["value"];
  });
  return indexed_array;
}

function buka(id_widget) {
  $(".next").attr("rel", id_widget + 1);
  $(".back").attr("rel", id_widget - 1);
  $(".ragu_ragu").attr("rel", id_widget);
  cek_status_ragu(id_widget);
  cek_terakhir(id_widget);

  $("#soalke").html(id_widget);

  $(".step").hide();
  $("#widget_" + id_widget).show();

  simpan();
}

function next() {
  var berikutnya = $(".next").attr("rel");
  berikutnya = parseInt(berikutnya);
  berikutnya = berikutnya > total_widget ? total_widget : berikutnya;

  $("#soalke").html(berikutnya);

  $(".next").attr("rel", berikutnya + 1);
  $(".back").attr("rel", berikutnya - 1);
  $(".ragu_ragu").attr("rel", berikutnya);
  cek_status_ragu(berikutnya);
  cek_terakhir(berikutnya);

  var sudah_akhir = berikutnya == total_widget ? 1 : 0;

  $(".step").hide();
  $("#widget_" + berikutnya).show();

  if (sudah_akhir == 1) {
    $(".back").show();
    $(".next").hide();
  } else if (sudah_akhir == 0) {
    $(".next").show();
    $(".back").show();
  }

  simpan();
}

function back() {
  var back = $(".back").attr("rel");
  back = parseInt(back);
  back = back < 1 ? 1 : back;

  $("#soalke").html(back);

  $(".back").attr("rel", back - 1);
  $(".next").attr("rel", back + 1);
  $(".ragu_ragu").attr("rel", back);
  cek_status_ragu(back);
  cek_terakhir(back);

  $(".step").hide();
  $("#widget_" + back).show();

  var sudah_awal = back == 1 ? 1 : 0;

  $(".step").hide();
  $("#widget_" + back).show();

  if (sudah_awal == 1) {
    $(".back").hide();
    $(".next").show();
  } else if (sudah_awal == 0) {
    $(".next").show();
    $(".back").show();
  }

  simpan();
}

function tidak_jawab() {
  var id_step = $(".ragu_ragu").attr("rel");
  var status_ragu = $("#rg_" + id_step).val();

  if (status_ragu == "N") {
    $("#rg_" + id_step).val("Y");
    $("#btn_soal_" + id_step).removeClass("btn-success");
    $("#btn_soal_" + id_step).addClass("btn-warning");
  } else {
    $("#rg_" + id_step).val("N");
    $("#btn_soal_" + id_step).removeClass("btn-warning");
    $("#btn_soal_" + id_step).addClass("btn-success");
  }

  cek_status_ragu(id_step);

  simpan();
}

function cek_status_ragu(id_soal) {
  var status_ragu = $("#rg_" + id_soal).val();

  if (status_ragu == "N") {
    $(".ragu_ragu").html("Ragu");
  } else {
    $(".ragu_ragu").html("Tidak Ragu");
  }
}

function cek_terakhir(id_soal) {
  var jml_soal = $("#jml_soal").val();
  jml_soal = parseInt(jml_soal) - 1;

  if (jml_soal === id_soal) {
    $(".next").hide();
    $(".selesai, .back").show();
  } else {
    $(".next").show();
    $(".selesai, .back").hide();
  }
}

function simpan_sementara() {
  var f_asal = $("#ujian");
  var form = getFormData(f_asal);

  //form = JSON.stringify(form);
  var jml_soal = form.jml_soal;
  jml_soal = parseInt(jml_soal);

  var hasil_jawaban = "";

  for (var i = 1; i < jml_soal; i++) {
    var idx = "opsi_" + i;
    var idx2 = "rg_" + i;
    var jawab = form[idx];
    var ragu = form[idx2];

    if (jawab != undefined) {
      if (ragu == "Y") {
        if (jawab == "-") {
          hasil_jawaban +=
            ' <a id="btn_soal_' +
            i +
            '" class="btn btn-default bg-red btn_soal btn-sm" onclick="return buka(' +
            i +
            ');">' +
            i +
            ". " +
            jawab +
            "</a>";
        } else {
          hasil_jawaban +=
            ' <a id="btn_soal_' +
            i +
            '" class="btn btn-warning btn_soal btn-sm" onclick="return buka(' +
            i +
            ');">' +
            i +
            ". " +
            jawab +
            "</a>";
        }
      } else {
        if (jawab == "-") {
          hasil_jawaban +=
            ' <a id="btn_soal_' +
            i +
            '" class="btn bg-red btn-default btn_soal btn-sm" onclick="return buka(' +
            i +
            ');">' +
            i +
            ". " +
            jawab +
            "</a>";
        } else {
          hasil_jawaban +=
            ' <a id="btn_soal_' +
            i +
            '" class="btn btn-success btn_soal btn-sm" onclick="return buka(' +
            i +
            ');">' +
            i +
            ". " +
            jawab +
            "</a>";
        }
      }
    } else {
      hasil_jawaban +=
        ' <a id="btn_soal_' +
        i +
        '" class="btn btn-default bg-red btn_soal btn-sm" onclick="return buka(' +
        i +
        ');">' +
        i +
        ". -</a>";
    }
  }
  $("#tampil_jawaban").html('<div id="yes"></div> ' + hasil_jawaban);
}

function simpan() {
  simpan_sementara();
  var form = $("#ujian");

  $.ajax({
    type: "POST",
    url: base_url + "ujian/simpan_satu",
    data: form.serialize(),
    dataType: "json",
    success: function (data) {
      $(".ajax-loading").show();
      console.log(data);
    },
  });
}

function selesai() {
  simpan();
  ajaxcsrf();
  $.ajax({
    type: "POST",
    url: base_url + "ujian/simpan_akhir/" + kode_tryout,
    data: {
      id: id_tes,
    },
    beforeSend: function () {
      simpan();
      $(".ajax-loading").show();
    },
    success: function (r) {
      console.log(r);
      if (r.status) {
        window.location.href = base_url + "raport";
      }
    },
  });
}

function resetInput() {
  $('input[type="radio"]').prop("checked", false);
}

function waktuHabis() {
  selesai();
  alert("Waktu ujian telah habis!");
}

function simpan_akhir() {
  simpan();
  if (confirm("Yakin ingin mengakhiri tes?")) {
    selesai();
  }
}
