import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RobaService } from 'app/roba.service';
import { KorisnikService } from '../korisnik.service';
import { Banka } from '../models/Banka';
import { Kasa } from '../models/Kasa';
import { Korisnik } from '../models/Korisnik';
import { Magacin } from '../models/Magacin';
import { Preduzece } from '../models/Preduzece';
import { PreduzeceService } from '../preduzece.service';

@Component({
  selector: 'app-prikaz-podataka',
  templateUrl: './prikaz-podataka.component.html',
  styleUrls: ['./prikaz-podataka.component.css']
})
export class PrikazPodatakaComponent implements OnInit {

  constructor(private service:PreduzeceService,private router:ActivatedRoute,private serviceK:KorisnikService,private serR:RobaService) { }

  ngOnInit(): void {
    this.k=JSON.parse(localStorage.getItem("prijavljen"));
    this.service.getPreduzece(this.k.username).subscribe((p:Preduzece)=>{
      this.preduzece=p;
      if(this.preduzece.pdv==true){
        this.pdv="ima"
      }else{
        this.pdv="nema"
      }
      if(this.preduzece.tip=="p"){
        this.kategorija="prodavnica"
      }else{
        this.kategorija="ugostiteljski objekat"
      }
    })
    this.router.queryParams
      .subscribe(params => {
        this.p = params.opsti;
      })
  }
  k:Korisnik;
  preduzece:Preduzece
  p:string
  pdv:string
  kategorija:string

  mail:string
  flagMail:boolean=false;
  ime:string
  flagIme:boolean=false;
  prezime:string
  flagPrezime:boolean=false
  telefon:string
  flagTelefon:boolean=false
  tip:string
  flagKategorija:boolean=false
  flagSifre:boolean=false;
  flagPdv:boolean=false;
  sifre:string[];
  poruka:string
  pd:boolean=false;
  promenaRacunS:boolean=false;
  promenaRacunN:boolean=false;
  brojR:string
  imeBanke:string
  bankaPr:Banka;
  kasaPr:Kasa;
  promenaKasaS:boolean=false;
  promenaKasaN:boolean=false;
  tipKase:string
  lokacijaKase:string
  magacinIme:string
  promenaMagacinN:boolean=false;
  promenaMagacinS:boolean=false;
  maga:Magacin

  promenaMagacinnS(m){
    this.promenaMagacinS=true;
    this.maga=m;
  }

  promenaMagacinnN(){
    this.promenaMagacinN=true;
    this.magacinPromena();
  }

  ponistiMagacin(){
    window.location.reload()
  }

  obrisiMagacin(naziv){
    this.service.obrisiMagacin(naziv,this.k.username).subscribe((s:String)=>{
      if(s["poruka"]=="ok"){
        this.serR.obrisiProizvodMaga(this.k.username,naziv).subscribe((s:string)=>{
          if(s["poruka"]=="ok"){
            window.location.reload();
          }
        })
      }
    })
  }

  magacinPromena(){
    if(this.promenaMagacinN){
      this.service.dodajNoviMagacin(this.magacinIme,this.maga,true,this.k.username).subscribe((m:string)=>{
        if(m["poruka"]!="ok"){
          alert("ovde")
          this.poruka="postoji isti magacin"
          return;
        }else{
          window.location.reload();
        }
      })
    }else{
      this.service.postojiIstiMaga(this.k.username,this.magacinIme).subscribe((m:string)=>{
        if(m["poruka"]!="ok"){
          this.poruka="postoji isti magacin"
          return;
        }else{
          this.service.dodajNoviMagacin(this.magacinIme,this.maga,false,this.k.username).subscribe((m:string)=>{
            if(m["poruka"]=="ok"){
              window.location.reload();
            }
          })
        }
      })
    }
  }

  promenaKasaaS(k:Kasa){
    this.promenaKasaS=true;
    this.kasaPr=k;
  }

  promenaKasaaN(){
    this.promenaKasaN=true;
  }

  ponistiKasu(){
    this.promenaKasaN=false
    this.promenaKasaS=false
    this.kasaPr=null
  }

  obrisiKasu(k:Kasa){
    this.service.obrisiKasu(k,this.k.username).subscribe((s:String)=>{
      if(s["poruka"]=="ok"){
        this.poruka="kasa je uspesno obrisana"
      }
    })
    window.location.reload();
  }

  kasaPromena(){
    if(this.promenaKasaN){
      this.service.dodajNovuKasu(this.tipKase,this.lokacijaKase,true,this.kasaPr,this.k.username).subscribe((m:string)=>{
        if(m["poruka"]=="ok"){
          this.poruka="promena uspesna"
        }
      })
    }else{
      this.service.dodajNovuKasu(this.tipKase,this.lokacijaKase,false,this.kasaPr,this.k.username).subscribe((m:string)=>{
        if(m["poruka"]=="ok"){
          this.poruka="promena uspesna"
        }
      })
    }
    this.promenaKasaN=false;
    this.promenaKasaS=false;
    window.location.reload();
  }

  promenaBankaS(b:Banka){
    this.promenaRacunS=true;
    this.bankaPr=b;
  }
  promenaBankaN(){
    this.promenaRacunN=true
  }
  ponisti(){
    this.promenaRacunN=false
    this.promenaRacunS=false
    this.bankaPr=null
    this.poruka=""
  }

  obrisiRacun(b:Banka){
    this.service.obrisiRacun(b,this.k.username).subscribe((s:String)=>{
      if(s["poruka"]=="ok"){
        this.poruka="racun je uspesno obrisan"
      }
    })
    window.location.reload();
  }

  bankaPromena(){
    if(this.brojR==null || this.imeBanke==null){
      this.poruka="podaci nisu popunjeni"
      return
    }
    if(!(this.brojR.match(/^([0-9]){3,3}\-([0-9]){12,12}\-([0-9]){2,2}$/))){
      this.poruka="broj racuna nije u dobrom formatu"
      return
    }
    if(this.promenaRacunN){
      this.service.dodajNovuBanku(this.brojR,this.imeBanke,true,this.bankaPr,this.k.username).subscribe((m:string)=>{
        if(m["poruka"]=="ok"){
          this.poruka="promena uspesna"
        }
      })
    }else{
      this.service.dodajNovuBanku(this.brojR,this.imeBanke,false,this.bankaPr,this.k.username).subscribe((m:string)=>{
        if(m["poruka"]=="ok"){
          this.poruka="promena uspesna"
        }
      })
    }
    window.location.reload();
  }

  promeniIme(){
    this.flagIme=true
  }
  promeniMail(){
    this.flagMail=true
  }
  promeniPrezime(){
    this.flagPrezime=true
  }
  promeniTelefon(){
    this.flagTelefon=true
  }
  promeniKategoriju(){
    this.flagKategorija=true;
  }
  promeniSifru(){
    this.flagSifre=true;
  }
  promeniPdv(){
    this.flagPdv=true
  }
  ponistiIme(){
    window.location.reload()
  }
  ponistiMail(){
    window.location.reload()
  }
  ponistiPrezime(){
    window.location.reload()
  }
  ponistiTelefon(){
    window.location.reload()
  }
  ponistiKategoriju(){
    window.location.reload()
  }
  ponistiSifru(){
    window.location.reload()
  }
  ponistiPdv(){
    window.location.reload();
  }

  promenaIme(){
    if(this.ime==null){
      this.poruka="niste uneli podatak"
      return;
    }
    if(!this.ime.match(/^[A-Z][a-z]*$/)){
      this.poruka="ime mora pocinjati velikim slovom i sadrzati samo slova"
      return;
    }
    else{
      this.service.promeniIme(this.ime,this.k.username).subscribe((m:string)=>{
        if(m["poruka"]=="ok"){
          window.location.reload()
        }
      })
    }
  }

  promenaPrezime(){
    if(this.prezime==null){
      this.poruka="niste uneli podatak"
      return;
    }
    if(!this.prezime.match(/^[A-Z][a-z]*$/)){
      this.poruka="prezime mora pocinjati velikim slovom i sadrzati samo slova"
      return;
    }else{
      this.service.promeniPrezime(this.prezime,this.k.username).subscribe((m:string)=>{
        if(m["poruka"]=="ok"){
          window.location.reload()
        }
      })
    }
  }

  promenaMail(){
    if(this.mail==null){
      this.poruka="niste uneli podatak"
      return;
    }
    if(!this.mail.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
      this.poruka="e-mail nije u vazecem formatu"
      return;
    }
    this.service.istiMail(this.mail).subscribe((p:String)=>{
      alert(p["poruka"])
      if(p["poruka"]!="ok"){
        this.poruka="postoji isti mail"
      }else{
        this.service.promenaM(this.k.username,this.mail).subscribe((m:string)=>{
          if(m["poruka"]=="ok"){
            window.location.reload()
          }
        })
      }
    })
  }

  promenaTelefon(){
    if(this.telefon==null){
      this.poruka="niste uneli podatak"
      return;
    }
    if(!this.telefon.match(/^\+[0-9]*$/)){
      this.poruka="broj nije u vazecem formatu"
      return;
    }else{
      this.service.promeniTelefon(this.telefon,this.k.username).subscribe((m:string)=>{
        if(m["poruka"]=="ok"){
          window.location.reload()
        }
      })
    }
  }

  promenaTip(){
    if(this.tip==this.preduzece.tip){
      this.poruka="preduzece je vec tog tipa"
      return;
    }
    else{
      this.service.promeniTip(this.tip,this.k.username).subscribe((m:string)=>{
        if(m["poruka"]=="ok"){
          window.location.reload()
        }
      })
    }
  }

  promenaPdv(){
    if(this.pd==this.preduzece.pdv){
      this.poruka="preduzece je vec tog tip pdv"
      return;
    }else{
      this.service.promeniPdv(this.pd,this.k.username).subscribe((m:string)=>{
        if(m["poruka"]=="ok"){
          window.location.reload()
        }
      })
    }
  }

  promenaSifra(){
    if(this.sifre==null){
      this.poruka="niste odabrali podatak";
      return
    }
    this.service.promeniSifra(this.sifre,this.k.username).subscribe((m:string)=>{
      if(m["poruka"]=="ok"){
        window.location.reload()
      }
    })
  }
}