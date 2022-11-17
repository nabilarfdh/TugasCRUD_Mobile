import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    public http: HttpClient,
  ) { }

  apiURL() {
    return "http://localhost:8080/siswa";
  }

  getSiswa(){
    return this.http.get(this.apiURL()+'/tampil.php');
  }

  deleteSiswa(id: any){
    return this.http.delete(this.apiURL()+'/hapus.php?nis=' + id);
  }
  
  ambilSiswa(id: any){
    return this.http.get(this.apiURL()+'/lihat.php?nis=' + id);
  }
}
