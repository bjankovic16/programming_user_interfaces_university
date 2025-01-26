import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class KorisnikService {

  constructor(private http:HttpClient) { }
  url='http://localhost:4000'

  prijavaNaSistem(username, password){
    const data={
      username: username,
      password: password
    }
    return this.http.post(`${this.url}/prijavaNaSistem`,data);
  }

  ubaciKorisnika(username,password1,registrovan,tip){
    const data={
      username: username,
      password1: password1,
      registrovan:registrovan,
      tip:tip
    }
    return this.http.post(`${this.url}/ubaciKorisnika`,data);
  }

  promeniMail(username,mail){
    const data={
      username:username,
      mail:mail
    }
    return this.http.post(`${this.url}/promeniMail`,data)
  }
  dodaci(ime,prezime,telefon,licna,k){
    const data={
      ime:ime,
      prezime:prezime,
      telefon:telefon,
      licna:licna,
      kor_ime:k
    }
    return this.http.post(`${this.url}/dodaciKorisnik`,data)
  }
  postaviTip(username,tip){
    const data={
      kor_ime:username,
      tip:tip
    }
    return this.http.post(`${this.url}/postaviTip`,data)
  }
  promeniLozinku(username,pas){
    const data={
      username:username,
      pas:pas
    }
    return this.http.post(`${this.url}/promeniLozinku`,data);
  }
  registruj(kor_ime){
    const data={
      kor_ime:kor_ime
    }
    return this.http.post(`${this.url}/regKOR`,data)
  }
  obrisi(kor_ime){
    const data={
      kor_ime:kor_ime
    }
    return this.http.post(`${this.url}/obrisiKOR`,data)
  }
}


