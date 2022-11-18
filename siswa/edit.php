<?php
require 'koneksi.php';

$input = file_get_contents('php://input');
$data = json_decode($input, true);
$pesan = [];

$nama = $data['nama'];
$alamat = $data['alamat'];
$nis = $data['nis'];
$jenis_kelamin = $data['jenis_kelamin'];

$query = mysqli_query($koneksi, "update siswa set nama='$nama', alamat='$alamat' where nis = '$nis'");

// if ($query) {
//     http_response_code(201);
//     $pesan['status'] = 'sukses';
// } else {
//     http_response_code(422);
//     $pesan['status'] = 'gagal';
// }

echo json_encode($pesan);
echo mysqli_error($koneksi);
