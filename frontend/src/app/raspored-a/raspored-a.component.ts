import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DodelaArtiklaComponent } from 'app/dodela-artikla/dodela-artikla.component';
import { KategorijaService } from 'app/kategorija.service';
import { KorisnikService } from 'app/korisnik.service';
import { Kategorija } from 'app/models/Kategorija';
import { Korisnik } from 'app/models/Korisnik';
import { Preduzece } from 'app/models/Preduzece';
import { Str } from 'app/models/TipKateg';
import { PreduzeceService } from 'app/preduzece.service';
import { RobaService } from 'app/roba.service';

@Component({
  selector: 'app-raspored-a',
  templateUrl: './raspored-a.component.html',
  styleUrls: ['./raspored-a.component.css']
})

export class RasporedAComponent implements OnInit {

  constructor(public dialog:MatDialog,private servisKategorija:KategorijaService,private service:PreduzeceService,private serR:RobaService,private serviceK:KorisnikService) { }

  ngOnInit(): void {
    this.k=JSON.parse(localStorage.getItem("prijavljen"));
    this.service.getPreduzece(this.k.username).subscribe((p:Preduzece)=>{
      this.preduzece=p;
    })
    this.servisKategorija.dohvatiKategorije().subscribe((k:Kategorija[])=>{
      this.kategorije=k
      this.kategorije.forEach((k:Kategorija)=>{
        let st=new Str();
        st.ime=k.ime
        st.tip=true
        this.str.push(JSON.parse(JSON.stringify(st)))
        k.potkategorije.forEach((s:string)=>{
          let st=new Str();
          st.ime=s
          st.tip=false
          this.str.push(JSON.parse(JSON.stringify(st)))
        })
      })
    })
  }
  ime:string;
  potkategorijaNova:string
  kategorijaNova:string
  flag=true;
  potkategorije:Array<string>=[]
  kategorije:Array<Kategorija>=[]
  potkategorija:string
  k:Korisnik
  preduzece:Preduzece
  message:string
  stl:boolean
  str:Str[]=[]

  dodajPotkategoriju(){
    this.message="";
    if(this.potkategorijaNova==null){
      this.message="nemoguce je ubaciti praznu potkategoriju"
      return;
    }
    if(this.potkategorijaNova==this.ime){
      this.message="ne mogu postojati kategorija i potkategorija sa istim imenom"
      return;
    }
    for(let j=0;j<this.potkategorije.length;j++){
      if(this.potkategorije[j]==this.potkategorijaNova){
        this.message="potkategorija postoji"
        return;
      }
    }
    this.potkategorije.push(JSON.parse(JSON.stringify(this.potkategorijaNova)));
    this.servisKategorija.ubaciPotkategoriju(this.ime,this.potkategorijaNova).subscribe((m:string)=>{
      if(m["poruka"]=="ok"){
        this.message="uspesno ubacena kategorija"
        this.potkategorijaNova=null;
      }
    })
  }

  dodajKategoriju(){
    if(this.ime==null){
      this.message="nije uneta kategorija";
      return;
    }else{
      for(let i=0;i<this.kategorije.length;i++){
        if(this.kategorije[i].ime==this.ime){
          this.ime=null;
          this.message="kategorija postoji"
          return;
        }
      }
      let kat:Kategorija=new Kategorija();
      kat.ime=this.ime
      this.servisKategorija.ubaciKategoriju(kat).subscribe((m:string)=>{
        if(m["poruka"]=="ok"){
          this.message="uspesno ubacena kategorija"
          this.kategorijaNova=this.ime;
          this.flag=false
        }
      })
    }
  }

  zavrsiDodavanje(){
    window.location.reload()
  }

  dodeliProizvod(kat:string){
    this.stl=false;
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
        kategorija: kat
    };
    const t=this.dialog.open(DodelaArtiklaComponent,dialogConfig)
    t.afterClosed().subscribe(
      (res)=>{
        this.stl=true
      } 
    )
  }
}
