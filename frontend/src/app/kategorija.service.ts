import { isPlatformWorkerApp } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KategorijaService {

  constructor(private http:HttpClient) { }

  url='http://localhost:4000'

  dohvatiKategorije(){
    return this.http.get(`${this.url}/getKategorije`);
  }

  ubaciKategoriju(ime){
    let data={
      kategorija:ime
    }
    return this.http.post(`${this.url}/ubaciKategoriju`,data)
  }

  ubaciPotkategoriju(ime,pot){
    let data={
      ime:ime,
      potkategorija:pot
    }
    return this.http.post(`${this.url}/ubaciPotkategoriju`,data)
  }
}