import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { Http } from "@capacitor-community/http";

@Component({
  selector: 'app-siswa-edit',
  templateUrl: './siswa-edit.page.html',
  styleUrls: ['./siswa-edit.page.scss'],
})
export class SiswaEditPage implements OnInit {
  nis : any;
  nama : any;
  alamat : any;
  jenis_kelamin : any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public _apiService: ApiService,
    private alertController: AlertController,
    public loadingController: LoadingController
  ) {
    this.route.params.subscribe((param:any)=>{
      this.nis = param.nis;
      console.log(this.nis);
      this.ambilSiswa(this.nis);
    })
  }

  ngOnInit() {
  }

  public optionFn() : void {
    let opt = this.jenis_kelamin;
  }

  ambilSiswa(nis:any){
    this._apiService.ambilSiswa(nis).subscribe((res: any)=>{
      console.log('Sukses', res);
      let siswa = res;
      this.nama = siswa.nama;
      this.alamat = siswa.alamat;
    },(error:any)=>{
      console.log('error', error);
      alert('Gagal Ambil Data');
    })
  }

  editSiswa(){
    let url = this._apiService.apiURL()+"/edit.php";
    Http.request({
      method : "POST",
      url : url,
      headers : {"Content-Type" : "application/json"},
      data : {
        nis : this.nis,
        nama : this.nama,
        alamat : this.alamat,
        jenis_kelamin : this.jenis_kelamin,
      },
    }).then((data: any)=>{
      this.alertController.create({
        header : 'Notifikasi',
        message : 'Berhasil Edit Data Siswa',
        buttons : ['OK'],
      }).then(res=>{
        res.present();
      });
      this.router.navigateByUrl('/siswa');
    },(err)=>{
      this.alertController.create({
        header : 'Notifikasi',
        message : 'Gagal Edit Data Siswa',
        buttons : ['OK'],
      }).then(res=>{
        res.present();
      });
    })
  }
}
