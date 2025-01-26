import { ReturnStatement } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from 'app/korisnik.service';
import { Banka } from '../models/Banka';
import { Kasa } from '../models/Kasa';
import { Korisnik } from '../models/Korisnik';
import { PreduzeceService } from '../preduzece.service';

@Component({
  selector: 'app-preduzece',
  templateUrl: './preduzece.component.html',
  styleUrls: ['./preduzece.component.css']
})
export class PreduzeceComponent implements OnInit {

  constructor(private service:PreduzeceService,private router:Router,private korServis:KorisnikService) { }

  ngOnInit(): void {
    this.korisnik=JSON.parse(localStorage.getItem("prijavljen"))
    localStorage.setItem('prijavljen', JSON.stringify(this.korisnik));
    this.banke.push(new Banka())
    this.kase.push(new Kasa())
  }
  korisnik:Korisnik;
  pdv:boolean
  sifra:String[];
  tip:String
  brojRac:number=1;
  banke:Banka[]=[];
  brojMagacina:number=1
  brojKas:number=1;
  kase:Kasa[]=[];
  mes:String

  brojRacuna(br){
    this.banke.length=0;
    for(var i=0;i<br;i++)
      this.banke.push(new Banka())
  }
  brojKasa(br){
    this.kase.length=0;
    for(var i=0;i<br;i++)
      this.kase.push(new Kasa())
    
  }

  preduzeceInfo(){
    if(this.tip==null || this.brojRac==null||this.brojKas.toString()==""||this.brojRac.toString()=="" || this.brojMagacina==null || this.brojKas==null || this.sifra==null){
      this.mes="nisu uneti svi podaci" 
      return
    }
    let flag:boolean=false;
    this.banke.forEach((b:Banka)=>{
      if(b.brojRacuna==null || b.imeBanke==null){
        this.mes="nisu uneti svi podaci"
        flag=true
        return;
      }
    })
    if(flag) return
    this.kase.forEach((k:Kasa)=>{
      if(k.lokacija==null || k.tip==null){
        this.mes="nisu uneti svi podaci"
        flag=true;
        return;
      }
    })
    if(flag) return;

    this.banke.forEach((b:Banka)=>{
     if(!(b.brojRacuna.match(/^([0-9]){3,3}\-([0-9]){12,12}\-([0-9]){2,2}$/))){
        this.mes="broj racuna nije u dobrom formatu bbb-bbbbbbbbbbbbbbbb-bb"
        flag=true
        return
      }
    })
    if(flag) return;
    this.service.preduzeceInfo(this.tip,this.sifra,this.pdv,this.brojRac,this.banke,this.brojMagacina,
      this.brojKas,this.kase,this.korisnik.username).subscribe((m:String)=>{
        if(m["poruka"]!="ok"){
          flag=true;
        }})
        this.korServis.postaviTip(this.korisnik.username,this.tip).subscribe((p:string)=>{
          if(p["poruka"]=="ok"){
            if(this.tip=="p")
              this.router.navigate(["prodavnica"]);
            else{
              this.router.navigate(["ugostitelj"])
            }  
          }
        })
  }
}
