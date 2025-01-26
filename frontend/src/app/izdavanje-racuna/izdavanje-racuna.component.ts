import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'app/models/Korisnik';
import { Magacin } from 'app/models/Magacin';
import { Narucilac } from 'app/models/Narucilac';
import { Preduzece } from 'app/models/Preduzece';
import { Racun } from 'app/models/Racun';
import { Roba } from 'app/models/Roba';
import { Stavka } from 'app/models/Stavka';
import { PreduzeceService } from 'app/preduzece.service';
import { RacunService } from 'app/racun.service';
import { RobaService } from 'app/roba.service';

@Component({
  selector: 'app-izdavanje-racuna',
  templateUrl: './izdavanje-racuna.component.html',
  styleUrls: ['./izdavanje-racuna.component.css']
})
export class IzdavanjeRacunaComponent implements OnInit {

  constructor(private router:Router,private racunService:RacunService,private robaService:RobaService,private service:PreduzeceService) { }

  ngOnInit(): void {
    this.k=JSON.parse(localStorage.getItem("prijavljen"));
    this.service.getPreduzece(this.k.username).subscribe((p:Preduzece)=>{
      this.p=p;
      this.magacini=this.p.magacini
    })
    this.service.getNarucioce(this.k.username).subscribe((n:Narucilac[])=>{
      this.narucioci=n;
    })
    if(window.location.pathname=="/prodavnica/IzdavanjeRacuna"){
      this.reg=false;
    }
  }

  reg:boolean=true;
  narucioci:Narucilac[]
  poruka:string
  prikaza=true;
  odakle:string
  prikaz:boolean=false
  racuni:Racun[]
  roba:Roba[];
  racun:Racun=new Racun();
  k:Korisnik
  p:Preduzece
  magacini:Magacin[];
  imeMagacina:string;
  kolicina:string
  odabranaRoba:boolean
  robaKupovina:Roba
  odabranM:boolean=false;
  biranjeTipa:boolean=false
  tipPlacanja:string
  novac:string
  kusur:number
  licna:string
  ime:string
  prezime:string
  slip:string
  poruka1:string

  platiGotovina(){
    if(this.novac==null){
      this.poruka1="nisu uneti podaci"
      return;
    }
    if(this.licna!=null)
    if(!(this.licna.match(/^([0-9]){9,9}$/))){
      this.poruka1="broj licne karte mora sadrzati 9 brojeva"
      return;
    }
    if(Number.parseInt(this.novac)<this.racun.vrednost){
      this.poruka1="nemate dovoljnu količinu novca"
      return;
    }
    this.kusur=Number.parseInt(this.novac)-this.racun.vrednost
    this.racun.brLicne=this.licna
    this.racun.datum=new Date().toISOString();
    this.racun.kor_ime=this.k.username
    this.racun.imePreduzeca=this.p.naziv
    this.racun.nacinPlacanja="gotovina"
    this.racun.pib=this.p.pib
    this.racun.imeObjekta=this.imeMagacina;
    this.racunService.ubaciRacun(this.racun).subscribe((m:string)=>{
      if(m["poruka"]=="ok"){
        window.location.reload();
      }
    });
  }
  izbaciR(){
    if(this.racun.stavke.length>0)  this.biranjeTipa=true
  }

  platiCek(){
    if(this.ime==null || this.prezime==null||
    this.slip==null  || this.licna==null){
      this.poruka1="nisu uneti svi podaci"
    }else{
      this.racun.brLicne=this.licna
      if(!(this.licna.match(/^([0-9]){9,9}$/))){
        this.poruka1="broj licne karte mora sadrzati 9 brojeva"
        return;
      }
      if(!(this.slip.match(/^([0-9]){4,4}$/))){
        this.poruka1="broj slipa mora sadrzati 4 broja"
        return;
      }
      this.racun.ime=this.ime
      this.racun.prezime=this.prezime
      this.racun.slip=this.slip
      this.racun.pib=this.p.pib
      this.racun.datum=new Date().toISOString();
      this.racun.imePreduzeca=this.p.naziv
      this.racun.nacinPlacanja="cek"
      this.racun.imeObjekta=this.imeMagacina
      this.racun.kor_ime=this.k.username;
      this.racunService.ubaciRacun(this.racun).subscribe((m:string)=>{
        if(m["poruka"]=="ok"){
          window.location.reload();
        }
      });
    }
  }
  pibVirmana:string
  platiVirman(){//ostalo da se zavrsi
    if(this.pibVirmana==null){
      this.poruka1="nisu odabrani svi podaci";
      return
    }
    this.racun.narucilac=this.pibVirmana
    this.racun.datum=new Date().toISOString();
    this.racun.kor_ime=this.k.username
    this.racun.imePreduzeca=this.p.naziv
    this.racun.nacinPlacanja="virman"
    this.racun.pib=this.p.pib
    this.racun.imeObjekta=this.imeMagacina;
    this.racunService.ubaciRacun(this.racun).subscribe((m:string)=>{
      if(m["poruka"]=="ok"){
        window.location.reload();
      }
    });
  }

  potvrdaMagacin(){
    if(this.imeMagacina.length==0){
      alert("niste uneli ime magacina");
      return
    }
    this.robaService.getRobaFromMagacin(this.imeMagacina).subscribe((r:Roba[])=>{
      this.odabranM=true
      this.roba=r;
    })
  }

  odaberi(){
    if(this.odakle==null || this.odakle==""){
      alert("morate izabrati opciju")
    }else{
      if(this.odakle=="magacin"){
        this.router.navigate(["ugostitelj/UnosStolova"])
      }else{
        this.prikaz=true;
      }
    }
  }

  kupiStavku(){
    if(this.kolicina==null || this.robaKupovina==null){
      this.poruka="nisu uneti svi podaci";
      return;
    }else{
      let s:Stavka=new Stavka();
      s.idRobe=this.robaKupovina.sifra
      s.naziv=this.robaKupovina.naziv
      s.kor_ime=this.robaKupovina.kor_ime
      if(Number.parseInt(this.kolicina)<0){
        this.poruka="nekorektno uneta količina robe"
        return;
      }
      if(this.robaKupovina.stanje<Number.parseInt(this.kolicina)){
        this.poruka="u magacinu nema količine koju zahtevate"
        return;
      }else{
        this.robaKupovina.stanje-=Number.parseInt(this.kolicina)
        s.kolicina=Number.parseInt(this.kolicina)
        this.robaService.promeniKolicinu(this.robaKupovina.stanje,this.robaKupovina).subscribe((m:string)=>{
          if(m["poruka"]=="ok"){
            this.poruka="";
            this.racun.vrednost+=s.kolicina*this.robaKupovina.prodajna
            this.racun.stavke.push(JSON.parse(JSON.stringify(s)));
          }
        })
      }
      if(this.p.pdv==true && this.robaKupovina.stopa>0){
        this.racun.porez+=this.robaKupovina.prodajna*1/this.robaKupovina.stopa
      }else{
        this.racun.porez=0
      }
    }
  }
}
