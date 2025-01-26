import { useAnimation } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SelectMultipleControlValueAccessor } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PreduzeceService {

  constructor(private http:HttpClient) { }

  url='http://localhost:4000'

  istiMail(mail){
    const data={
      e_mail:mail
    }
    return this.http.post(`${this.url}/istiMail`,data);
  }

  registrovanjePreduzeca(ime, prezime,kor_ime,lozinka,br_tel,
    e_mail,naziv,drzava,grad,pos_br,ulica,broj,pib,mat_br,reg){
      const data={
        ime: ime,
        prezime: prezime,
        kor_ime:kor_ime,
        lozinka:lozinka,
        br_tel:br_tel,
        e_mail:e_mail,
        naziv:naziv,
        drzava:drzava,
        grad:grad,
        pos_br: pos_br,
        ulica: ulica,
        broj: broj,
        pib: pib,
        mat_br:mat_br,
        registrovan:reg
      }
    return this.http.post(`${this.url}/registrovanjePreduzeca`,data);
  }

  getNeregistrovana(){
    return this.http.get(`${this.url}/neregistrovanaPreduzeca`)
  }

  upload(file){
    return this.http.post(`${this.url}/upload`,file);
  }

  preduzeceInfo(tip,sifra,pdv,brojRac,banke,brojMagacina,
    brojKas,kase,kor_ime){
      const data={
        tip: tip,
        sifra:sifra,
        pdv:pdv,
        brojRac:brojRac,
        banke:banke,
        brojMagacina:brojMagacina,
        brojKas:brojKas,
        kase:kase,
        kor_ime:kor_ime
      }
      return this.http.post(`${this.url}/preduzeceInfo`,data)
    }

    getPreduzece(kor_ime){
      const data={
        kor_ime:kor_ime
      }
      return this.http.post(`${this.url}/getPreduzece`,data)
    }

    dodajNovuBanku(brojR,imeBanke,dodavanje,bankaPr,kor_ime){
      const data={
        brojR:brojR,
        imeBanke:imeBanke,
        dodavanje:dodavanje,
        bankaPr:bankaPr,
        kor_ime:kor_ime
      }
      return this.http.post(`${this.url}/dodajBanku`,data)
    }

    obrisiRacun(b,kor_ime){
      const data={
        banka:b,
        kor_ime:kor_ime
      }
      return this.http.post(`${this.url}/obrisiRacun`,data)
    }

    obrisiKasu(k,user){
      const data={
        kasa:k,
        kor_ime:user
      }
      return this.http.post(`${this.url}/obrisiKasu`,data)
    }

    dodajNovuKasu(tipKase,lokacijaKase,uslov,kasaPr,username){
      const data={
        tip:tipKase,
        lokacija:lokacijaKase,
        uslov:uslov,
        kasaPr:kasaPr,
        kor_ime:username
      }
      return this.http.post(`${this.url}/dodajKasu`,data)
    }

    obrisiMagacin(naziv,username){
      const data={
        naziv:naziv,
        kor_ime:username
      }
      return this.http.post(`${this.url}/obrisiMagacin`,data)
    }

    dodajNoviMagacin(magacinIme,maga,uslov,username){
      let id;
      if(JSON.parse(localStorage.getItem("id"))==null){
        id=0;
        localStorage.setItem("id",JSON.stringify(id));
      }else{
        id=JSON.parse(localStorage.getItem("id"));
      }
      const data={
        ime:magacinIme,
        maga:maga,
        uslov:uslov,
        kor_ime:username,
        id:id,
      }
      localStorage.setItem("id",JSON.stringify(id+1));
      return this.http.post(`${this.url}/dodajMagacin`,data)
    }

    promeniIme(ime,username){
      const data={
        ime:ime,
        kor_ime:username
      }
      return this.http.post(`${this.url}/promeniIme`,data);
    }

    promeniPrezime(ime,username){
      const data={
        prezime:ime,
        kor_ime:username
      }
      return this.http.post(`${this.url}/promeniPrezime`,data);
    }

    promenaM(username,mail){
      const data={
        mail:mail,
        kor_ime:username
      }
      return this.http.post(`${this.url}/promeniM`,data);
    }

    promeniTelefon(telefon,username){
      const data={
        telefon:telefon,
        kor_ime:username
      }
      return this.http.post(`${this.url}/promeniTelefon`,data);
    }

    promeniTip(tip,username){
      const data={
        tip:tip,
        kor_ime:username
      }
      return this.http.post(`${this.url}/promeniTip`,data);
    }

    promeniPdv(pdv,username){
      const data={
        pdv:pdv,
        kor_ime:username
      }
      return this.http.post(`${this.url}/promeniPdv`,data);
    }

    promeniSifra(sifra,username){
      const data={
        sifra:sifra,
        kor_ime:username
      }
      return this.http.post(`${this.url}/promeniSifra`,data);
    }

    pretrazi(pib){
      const data={
        pib:pib
      }
      return this.http.post(`${this.url}/pretrazi`,data)
    }

    ubaciNarucioca(username,naziv,pib,mat_br,broj,procenat){
      const data={
        kor_ime:username,
        naziv:naziv,
        pib:pib,
        mat_br:mat_br,
        broj:broj,
        procenat:procenat
      }
      return this.http.post(`${this.url}/ubaciNarucioca`,data);
    }

    postojiIstiMaga(username,magacinIme){
      const data={
        kor_ime:username,
        ime:magacinIme
      }
      return this.http.post(`${this.url}/postojiIstiMagacin`,data)
    }
    getNarucioce(username){
      const data={
        kor_ime:username
      }
      return this.http.post(`${this.url}/getNarucioce`,data)
    }

    registruj(kor_ime){
      const data={
        kor_ime:kor_ime
      }
      return this.http.post(`${this.url}/regPRED`,data)
    }
    obrisi(kor_ime){
      const data={
        kor_ime:kor_ime
      }
      return this.http.post(`${this.url}/obrisiPRED`,data)
    }
}

