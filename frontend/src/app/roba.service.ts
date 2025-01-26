import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RobaService {

  constructor(private http:HttpClient) { }

  url='http://localhost:4000'

  getRoba(kor_ime){
    const data={
      kor_ime:kor_ime
    }
    return this.http.post(`${this.url}/getRoba`,data)
  }

  obrisi(roba){
    const data={
      roba:roba
    }
    return this.http.post(`${this.url}/obrisi`,data)
  }

  ubaciR(roba){
    const data={
      roba:roba
    }
    return this.http.post(`${this.url}/ubacivanjeRobe`,data)
  }

  azuriraj(roba){
    const data={
      roba:roba
    }
    return this.http.post(`${this.url}/azurirajRobu`,data)
  }

  postojiIsti(roba){
    const data={
      roba:roba
    } 
    return this.http.post(`${this.url}/postojiIstaRoba`,data)
  }

  pretraga(ime){
    const data={
      ime:ime
    }
    return this.http.post(`${this.url}/pretragaRobePoImenu`,data)
  }
  setKategorija(kat,roba){
    const data={
      kat:kat,
      roba:roba
    }
    return this.http.post(`${this.url}/setKategorija`,data)
  }

  getRobaFromMagacin(imeM){
    const data={
      imeMagacina:imeM
    }
    return this.http.post(`${this.url}/getRobaFromMagacin`,data)
  }

  promeniKolicinu(kolicina,robaKupovina){
    const data={
      kolicina:kolicina,
      kor_ime:robaKupovina.kor_ime,
      sifra:robaKupovina.sifra
    }
    return this.http.post(`${this.url}/promeniKolicinu`,data)
  }

  ubaciRacun(r){
    const data={
      racun:r
    }
    return this.http.post(`${this.url}/ubaciRacun`,data)
  }

  getRobaPP(proizvod,proizvodjac){
    const data={
      proizvod:proizvod,
      proizvodjac:proizvodjac
    }
    return this.http.post(`${this.url}/getRobaPP`,data)
  }

  obrisiProizvodMaga(kor_ime,naziv){
    const data={
      kor_ime:kor_ime,
      naziv:naziv
    }
    return this.http.post(`${this.url}/obrisiProizvodMaga`,data)
  }
  slikaRobe(kor_ime,sifra){
    let data={
      kor_ime:kor_ime,
      sifra:sifra
    }
    return this.http.post(`${this.url}/slikaRobe`,data)
  }

}
