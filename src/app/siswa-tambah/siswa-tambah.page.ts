import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { Http } from "@capacitor-community/http";
// import { Alert } from 'selenium-webdriver';

@Component({
  selector: 'app-siswa-tambah',
  templateUrl: './siswa-tambah.page.html',
  styleUrls: ['./siswa-tambah.page.scss'],
})
export class SiswaTambahPage implements OnInit {
  nis : any;
  nama : any;
  jenis_kelamin : any;
  alamat : any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public _apiService: ApiService,
    private alertController: AlertController,
    public loadingController: LoadingController
  ) { }

  ngOnInit() {
  }

  public optionFn() : void {
    let opt = this.jenis_kelamin;
  }

  addSiswa(){
    let url = this._apiService.apiURL() + "/tambah.php";
    Http.request({
      method: "POST",
      url: url,
      headers: { "Content-Type": "application/json" },
      data: {
        nis: this.nis,
        nama: this.nama,
        jenis_kelamin: this.jenis_kelamin,
        alamat: this.alamat
      },
    }).then((data) => {
      this.nis = '';
      this.nama = '';
      this.jenis_kelamin = '';
      this.alamat = '';
      this.alertController.create({
        header: 'Notifikasi',
        message: 'Berhasil Input Data Siswa',
        buttons: ['OK'],
      }).then(res => {
        res.present();
      });
      this.router.navigateByUrl('/siswa');
    }, (error) => {
      this.alertController.create({
        header: 'Notifikasi',
        message: 'Gagal Input Data Siswa',
        buttons: ['OK'],
      }).then(res => {
        res.present();
      });
    })
  }

}
