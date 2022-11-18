<?php
require 'koneksi.php';

$input = file_get_contents('php://input');
$pesan = [];

$nis = $_GET['nis'];
$query = mysqli_query($koneksi, "delete from siswa where nis = '$nis'");

if ($query) {
    http_response_code(201);
    $pesan['status'] = 'sukses';
} else {
    http_response_code(422);
    $pesan['status'] = 'gagal';
}

echo json_encode($pesan);
echo mysqli_error($koneksi);
