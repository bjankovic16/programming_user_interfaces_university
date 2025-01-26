import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RobaBrisanjeComponent } from 'app/roba-brisanje/roba-brisanje.component';
import { KorisnikService } from '../korisnik.service';
import { Korisnik } from '../models/Korisnik';
import { Preduzece } from '../models/Preduzece';
import { Roba } from '../models/Roba';
import { PreduzeceService } from '../preduzece.service';
import { RobaService } from '../roba.service';

@Component({
  selector: 'app-roba',
  templateUrl: './roba.component.html',
  styleUrls: ['./roba.component.css']
})
export class RobaComponent implements OnInit {

  constructor(private dialog:MatDialog,private serviceRoba:RobaService,private service:PreduzeceService,private router:Router,private serviceK:KorisnikService) { }

  ngOnInit(): void {
    this.k=JSON.parse(localStorage.getItem("prijavljen"));
    this.service.getPreduzece(this.k.username).subscribe((p:Preduzece)=>{
      this.preduzece=p;
    })
    this.serviceRoba.getRoba(this.k.username).subscribe((r:Roba[])=>{
      this.roba=r;
      this.siz=this.roba.length
    })
  }
  p:number=1;
  k:Korisnik;
  preduzece:Preduzece
  roba:Roba[];
  r:Roba=new Roba();
  oba:Roba;
  flagU:boolean=false
  tip:string="o"
  flag:boolean=false
  siz:number
  message:string
  b:Roba=new Roba();
  len:number;
  nazivMagacina:string
  nabavna:number
  prodajna:number
  stanje:number
  minKolicina:number
  maxKolicina:number
  selectedFile=null

  unos(){
    if(this.r.sifra==null|| this.r.naziv==null||this.r.jedinica==null||
      this.r.nazivMagacina==null || this.r.nabavna==null|| this.r.prodajna==null||
      this.r.stanje==null || this.r.minKolicina==null||this.r.maxKolicina==null||
      this.r.stopa==null|| this.r.proizvodjac==null || (this.preduzece.tip=="u" && this.r.tip==null)){
        this.message="nisu uneti svi podaci"
        return
    }
    this.r.kor_ime=this.k.username;
    this.r.imePreduzeca=this.preduzece.naziv
    this.r.imePreduzeca=this.preduzece.naziv
    if(this.flag){//azuriranje
      this.serviceRoba.postojiIsti(this.r).subscribe((po:Roba[])=>{
        if((po.length>0 && this.r.sifra!=this.b.sifra) || (this.r.sifra==this.b.sifra && po.length>1)){
          this.message="postoji sa istom šifrom"
          return;
        }
        else{
            this.serviceRoba.obrisi(this.b).subscribe((m:string)=>{
              if(m["poruka"]!="ok"){
                this.message="neuspešno brisanje"
                return;
              }
              else{
                this.serviceRoba.ubaciR(this.r).subscribe((m:string)=>{
                  if(m["poruka"]=="ok"){
                    if(this.selectedFile!=null){//upload slike
                      const res=new FormData();
                      res.append("image",this.selectedFile)
                      this.service.upload(res).subscribe((m:String)=>{
                        if(m["poruka"]=="ok"){
                          this.serviceRoba.slikaRobe(this.k.username,this.r.sifra).subscribe((m:string)=>{
                            if(m["poruka"]=="ok"){
                              window.location.reload()
                            }
                          })
                        }
                      })
                    }
                  }
                })
              }
              window.location.reload()
            })
      }})
    }else{
      this.serviceRoba.postojiIsti(this.r).subscribe((po:Roba[])=>{
        if(po.length>0){
          this.message="postoji sa istom sifrom"
          return;
        }else{
          if(this.selectedFile==null){
            this.r.slika="puska.jpg"
          }
          this.serviceRoba.ubaciR(this.r).subscribe((m:string)=>{
            if(m["poruka"]=="ok"){
              if(this.selectedFile!=null){//upload slike
                const res=new FormData();
                res.append("image",this.selectedFile)
                this.service.upload(res).subscribe((m:String)=>{
                  if(m["poruka"]=="ok"){
                    this.serviceRoba.slikaRobe(this.k.username,this.r.sifra).subscribe((m:string)=>{
                      if(m["poruka"]=="ok"){
                        window.location.reload()
                      }
                    })
                  }
                })
              }
              window.location.reload() 
            }
          })
        }
      })
    }
  }

  ponistiU(){
    this.message=""
    this.flagU=false
  }
  tipO(){
    this.tip="o"
  }
  tipD(){
    this.tip="d"
  }
  tipS(){
    this.tip="s"
  }
  omoguciU(){
    this.flagU=true;
  }

  izmeni(rob:Roba){
    this.b=rob;
    this.r=new Roba();
    this.r=JSON.parse(JSON.stringify(rob));
    this.flagU=true;
    this.flag=true
  }
  obrisi(rob:Roba){
    localStorage.setItem("robaBrisanje",JSON.stringify(rob));
    this.dialog.open(RobaBrisanjeComponent);
  }
  onFileSelected(event){
    this.selectedFile=event.target.files[0];
  }
}
