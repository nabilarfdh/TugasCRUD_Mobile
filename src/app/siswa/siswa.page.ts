import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-siswa',
  templateUrl: './siswa.page.html',
  styleUrls: ['./siswa.page.scss'],
})
export class SiswaPage{
  nis : any;
  nama : any;
  alamat : any;
  jenis_kelamin : any;
  siswa : any[] = [];
  
  constructor(
    public _apiService: ApiService,
    private alertController: AlertController,
    public loadingController: LoadingController,
    private authService: AuthenticationService,
    private router: Router
  ) { 
    this.getSiswa();
  }

  ngOnInit() {
    console.log('cek fungsi halaman event init berjalan');
  }

  ionViewDidEnter(){
    console.log('jika selesai loading');
    this.getSiswa();
  }

  getSiswa(){
    this._apiService.getSiswa().subscribe((res:any)=>{
      console.log("sukses", res);
      this.siswa = res;
    }, (error:any) => {
      console.log("gagal", error);
      this.alertController.create({
        header : 'Notifikasi',
        message : 'Gagal Memuat Data Siswa',
        buttons : ['OK']
      }).then(res => {
        res.present();
      })
    })
  }

  deleteSiswa(id: any){
    this.alertController.create({
      header : 'Perhatian',
      subHeader : 'Yakin Menghapus Data Ini?',
      buttons : [
        {
          text : 'Batal',
          handler : (data: any)=>{
            console.log('dibatalkan', data);
          }
        },
        {
          text : 'Yakin',
          handler : (data: any)=>{
            this._apiService.deleteSiswa(id).subscribe((res: any) => {
              console.log("sukses", res);
              this.getSiswa();
            }, (error: any)=>{
              console.log("error", error);
              this.alertController.create({
                header : 'Notifikasi',
                message : 'Gagal Memuat Data Siswa',
                buttons : ['OK']
              }).then(res => {
                res.present();
              })
            })
          }
        }
      ]
    }).then(res=>{
      res.present();
    })
  }

  logout() {
    this.authService.logout(); // lempar ke authService lalu cari fungsi logout
    this.router.navigateByUrl('/', { replaceUrl: true }); // alihkan ke halama
  }
}
