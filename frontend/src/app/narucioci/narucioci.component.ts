import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { Korisnik } from '../models/Korisnik';
import { Preduzece } from '../models/Preduzece';
import { PreduzeceService } from '../preduzece.service';

@Component({
  selector: 'app-narucioci',
  templateUrl: './narucioci.component.html',
  styleUrls: ['./narucioci.component.css']
})
export class NaruciociComponent implements OnInit {

  constructor(private router:Router,private serP:PreduzeceService,private serK:KorisnikService) { }

  ngOnInit(): void {
    this.k=JSON.parse(localStorage.getItem("prijavljen"));
    this.serP.getPreduzece(this.k.username).subscribe((pr:Preduzece)=>{
      this.p=pr;
    });
  }

  k:Korisnik
  flag:boolean=false
  broj:number
  procenat:number
  preduzeca:Preduzece[]
  p:Preduzece
  kor:String
  pib:string
  poruka:string
  naziv:string
  maticni:string
  pibNovi:string
  m:string
  izabranoPreduzece:Preduzece

  promeniFlag(){
    this.flag=!this.flag
  }

  pretraga(){
    if(this.pib==this.p.pib){
      this.poruka="nije ispravan pib"
      return
    }
    this.serP.pretrazi(this.pib).subscribe((p:Preduzece[])=>{
      this.preduzeca=p;
    })
  }

  naruci(){ 
    if((this.broj==null || this.procenat==null||this.naziv==null||this.pibNovi==null||this.m==null) && this.flag==false){
      this.poruka="nisu uneti svi podaci"
      return;
    }
    if(this.flag==true && (this.procenat==null || this.broj==null || this.izabranoPreduzece==null)){
      this.poruka="nisu uneti svi podaci"
      return;
    }
    if(this.broj<0 || this.procenat<0 || this.procenat>100){
      this.poruka="neispravno uneti podaci"
      return;
    }
    if(this.flag==true){//ubacivanje preko pib (vec postoji u bazi)
      this.serP.ubaciNarucioca(this.k.username,this.izabranoPreduzece.naziv,this.izabranoPreduzece.pib,this.izabranoPreduzece.mat_br,this.broj,this.procenat).subscribe((m:string)=>{
        if(m["poruka"]=="ok"){
          this.poruka="uspešno ubacen naručilac";
          this.izabranoPreduzece.naziv=null;
          this.izabranoPreduzece.pib=null
          this.broj=null;
          this.procenat=null;
        }
      })
    }else{//registrovanje novog preduzeca
      if(!this.pibNovi.match(/^[1-9]([0-9]){8,8}$/)){
        this.poruka="pib mora pocinjati cifrom koja nije 0 i sadrzati 9 cifara"
        return;
      }
  
      if(!this.m.match(/^[1-9]([0-9]){7,7}$/)){
        this.poruka="maticni broj firme mora pocinjati cifrom koja nije 0 i sadrzati 8 cifara"
        return;
      }
      this.serP.ubaciNarucioca(this.k.username,this.naziv,this.pibNovi,this.m,this.broj,this.procenat).subscribe((m:string)=>{
        if(m["poruka"]=="ok"){
          this.pibNovi=null;
          this.m=null;
          this.broj=null;
          this.procenat=null;
          this.naziv=null
          this.poruka="uspešno ubačen naručilac";
        }
      })
    }

  }


}
