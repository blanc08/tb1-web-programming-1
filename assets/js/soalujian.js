let base_url = "http://localhost/tb1-web-programming-1/";
let id_tes =
    "f07fe79beee22e90fce51eac869c47e6d8d153ff929c8eb36c8b71691b95f3a4dd561d32dd448b2276b25b88226015e018b709d2e94056c1ec1ba6ece170991b93bvM5Q/dQGf+rYwrN0U4UmTZdiARGp+zWJXJn6v3Ek=";
let widget = $(".step");
let total_widget = widget.length;
let kode_tryout = "b2eaa075fd";
let userid = "106";
let id_tryout = "";

function sisawaktu(t) {
    console.log(t);
    // Set the date we're counting down to
    const countDownDate = new Date(t.replace(/-/g, "/")).getTime();

    // Update the count down every 1 second
    const x = setInterval(function () {
        // Get today's date and time
        const now = new Date().getTime();

        // Find the distance between now and the count down date
        const distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="demo"
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

function getFormData($form) {
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};
    $.map(unindexed_array, function (n, i) {
        indexed_array[n["name"]] = n["value"];
    });
    return indexed_array;
}

function buka(id_widget) {
    const nextButtonDom = document.querySelector(".next");
    const backButtonDom = document.querySelector(".back");
    const RaguButtonDom = document.querySelector(".ragu_ragu");

    nextButtonDom.setAttribute("rel", id_widget + 1);
    backButtonDom.setAttribute("rel", id_widget - 1);
    RaguButtonDom.setAttribute("rel", id_widget);

    cek_status_ragu(id_widget);
    cek_terakhir(id_widget);

    document.querySelector("#soalke").innerText = id_widget;

    document
        .querySelectorAll(".step")
        .forEach((item) => (item.style.display = "none"));

    document.querySelector("#widget_" + id_widget).style.display = "block";

    // $(".step").hide();
    // $("#widget_" + id_widget).show();

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
    const formAsal = $("#ujian");
    const form = getFormData(formAsal);
    //form = JSON.stringify(form);
    const jml_soal = parseInt(form.jml_soal);

    let hasil_jawaban = "";

    for (let i = 1; i < jml_soal; i++) {
        const idx = "opsi_" + i;
        const idx2 = "rg_" + i;
        const jawab = form[idx];
        const ragu = form[idx2];

        if (jawab != undefined) {
            if (ragu == "Y") {
                if (jawab == "-") {
                    hasil_jawaban += ` <a id="btn_soal_${i}" class="btn btn-default bg-red btn_soal btn-sm" onclick="() => buka(${i})"> ${i}. ${jawab}</a>`;
                } else {
                    hasil_jawaban += ` <a id="btn_soal_${i}" class="btn btn-warning btn_soal btn-sm" onclick="() => buka(${i})">${i}. ${jawab}</a>`;
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

    const form = $("#ujian");
    $.ajax({
        type: "POST",
        url: base_url + "api/simpan_satu.php",
        data: form.serialize(),
        dataType: "json",
        success: function (data) {
            $(".ajax-loading").show();
            console.log(data);
        },
    });
}

function selesai() {
    // simpan();
    const idDom = document.querySelector("#quiz-id");
    ajaxcsrf();
    $.ajax({
        type: "POST",
        url: base_url + "api/simpan_akhir.php",
        data: {
            id: idDom.value,
        },
        beforeSend: function () {
            simpan();
            $(".ajax-loading").show();
        },
        success: function (r) {
            const response = JSON.parse(r);
            if (response.message === "success") {
                window.location.href = base_url;
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

// Run it after Dom Loaded
window.addEventListener("load", () => {
    setInterval(function () {
        document.querySelector(".live-clock").innerHTML =
            new Date().toLocaleTimeString();
    }, 1000);

    const sisaWaktuDom = document.querySelector(".sisawaktu");
    if (sisaWaktuDom) sisawaktu(sisaWaktuDom.dataset.time);

    const currentDate = new Date();
    const currentDateDom = document.getElementById("current-date");
    currentDateDom.innerText = currentDate.toLocaleDateString("Jakarta");

    buka(1);
    // simpan_sementara();

    // widget = $(".step");
    // btnnext = $(".next");
    // btnback = $(".back");
    // btnsubmit = $(".submit");

    // $("#widget_1").show();
});
