import { Component, Inject, OnInit } from '@angular/core';
import {  MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Korisnik } from 'app/models/Korisnik';
import { Roba } from 'app/models/Roba';
import { RobaService } from 'app/roba.service';

@Component({
  selector: 'app-dodela-artikla',
  templateUrl: './dodela-artikla.component.html',
  styleUrls: ['./dodela-artikla.component.css']
})
export class DodelaArtiklaComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) data,private serviceR:RobaService) {
      this.kategorija=data.kategorija
     }

  ngOnInit(): void {
    this.k=JSON.parse(localStorage.getItem("prijavljen"));
    this.serviceR.getRoba(this.k.username).subscribe((r:Roba[])=>{
      this.roba=r;
      this.rob=r;
    })
  }

  roba:Roba[];
  rob:Roba[];
  k:Korisnik
  imeR:string
  kategorija:string
  mes:string

  pretraga(){
    this.serviceR.pretraga(this.imeR).subscribe((r:Roba[])=>{
      this.roba=r;
    })
    this.mes=""
  }

  dodela(r){
    if(r.kategorija!=null){
      this.mes="taj artikal već ima svoju kategoriju"
    }else{
      this.serviceR.setKategorija(this.kategorija,r).subscribe((m:string)=>{
        if(m["poruka"]=="ok"){
          window.location.reload();
        }
      })
    }
  }

}
