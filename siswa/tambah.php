<?php
require 'koneksi.php';

$input = file_get_contents('php://input');
$data = json_decode($input, true);

$pesan = [];
$nis = trim($data['nis']);
$nama = trim($data['nama']);
$jenis_kelamin = trim($data['jenis_kelamin']);
$alamat = trim($data['alamat']);

$query = mysqli_query($koneksi, "insert into siswa(nis, nama, jenis_kelamin, alamat) values('$nis', '$nama', '$jenis_kelamin', '$alamat')");

if ($query) {
    http_response_code(201);
    $pesan['status'] = 'sukses';
} else {
    http_response_code(422);
    $pesan['status'] = 'gagal';
}

echo json_encode($pesan);
echo mysqli_error($koneksi);
