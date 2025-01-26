import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"

@Injectable({
  providedIn: 'root'
})
export class RacunService {

  constructor(private http:HttpClient) { }

  url='http://localhost:4000'

  ubaciRacun(r){
    let id=JSON.parse(localStorage.getItem("idRac"));
    if(id==null){
      localStorage.setItem("idRac",JSON.stringify(0));
      id=0;
    }else{
      localStorage.setItem("idRac",JSON.stringify(id+1));
    }
    const data={
     racun:r,
     id:id
    }
    return this.http.post(`${this.url}/ubaciRacun`,data)
  }

  getRacune(kor_ime){
    const data={
      kor_ime:kor_ime
    }
    return this.http.post(`${this.url}/getRacune`,data);
  }
  getRacuneLicna(licna){
    const data={
      licna:licna
    }
    return this.http.post(`${this.url}/getRacuneLicna`,data)
  }

  getRacuneDatumOdDo(datumOd,datumDo,naziv,pib){
    const data={
      datumOd:datumOd,
      datumDo:datumDo,
      naziv:naziv,
      pib:pib
    }
    return this.http.post(`${this.url}/getRacuneDatumOdDo`,data);
  }
  getRacuneSve(){
    return this.http.get(`${this.url}/getRacuneSve`);
  }
}

