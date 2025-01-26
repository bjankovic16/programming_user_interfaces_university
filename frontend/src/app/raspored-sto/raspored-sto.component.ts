import { ReturnStatement } from '@angular/compiler';
import {  Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Korisnik } from 'app/models/Korisnik';
import { Narucilac } from 'app/models/Narucilac';
import { Preduzece } from 'app/models/Preduzece';
import { Racun } from 'app/models/Racun';
import { Roba } from 'app/models/Roba';
import { Stavka } from 'app/models/Stavka';
import { Sto } from 'app/models/Sto';
import { PreduzeceService } from 'app/preduzece.service';
import { RacunService } from 'app/racun.service';
import { RobaService } from 'app/roba.service';

@Component({
  selector: 'app-raspored-sto',
  templateUrl: './raspored-sto.component.html',
  styleUrls: ['./raspored-sto.component.css']
})
export class RasporedStoComponent implements OnInit {
  @ViewChild('canvas', { static: true }) 
  canvas: ElementRef<HTMLCanvasElement>;
  @Input() ime:string

  constructor(private racunService:RacunService,private service:PreduzeceService,private robaService:RobaService) {}

  sacuvaj(){
    localStorage.setItem(this.ime+this.k.username,JSON.stringify(this.stolovi))
    localStorage.setItem("id"+this.ime+this.k.username,JSON.stringify(this.id))
  }
    ngOnInit(): void {
    this.k=JSON.parse(localStorage.getItem("prijavljen"));
    this.service.getPreduzece(this.k.username).subscribe((p:Preduzece)=>{
      this.p=p;})
    this.context = this.canvas.nativeElement.getContext('2d');
    this.offset=this.canvas.nativeElement.getBoundingClientRect();
    this.robaService.getRoba(this.k.username).subscribe((r:Roba[])=>{
      this.roba=r;
    });
    this.context.canvas.hidden=true;
    this.service.getNarucioce(this.k.username).subscribe((n:Narucilac[])=>{
      this.narucioci=n;
    })
    if(JSON.parse(localStorage.getItem(this.ime+this.k.username))!=null){
      this.stolovi=JSON.parse(localStorage.getItem(this.ime+this.k.username));
      this.id=JSON.parse(localStorage.getItem("id"+this.ime+this.k.username))
      this.stolovi.forEach((s:Sto)=>{
        this.oboji(s);
      })
    }
  }
  k:Korisnik
  narucioci:Narucilac[];
  private context: CanvasRenderingContext2D;
  private offset;
  stolovi:Sto[]=[];
  nadjeno:boolean=false
  xx:number
  yy:number
  id:number=0;
  nazivStola:string;
  tipStola:string;
  sirinaStola:string
  duzinaStola:string
  poluprecnikStola:string
  unosenje=false
  premes=false
  idStola
  uslov=false
  stoPremestanje:Sto;
  zavrsavanjePrem=false;
  prikazKomponenti:boolean=true
  porukaO:string;
  pibVirmana:string

  prikaziKomp(){
    this.prikazKomponenti=!this.prikazKomponenti
    this.context.canvas.hidden=this.prikazKomponenti
  }
  findSpaceK(radius){
    this.porukaO="";
    for(var x=radius;x<this.canvas.nativeElement.width-radius;x++){
      for(var y=radius;y<this.canvas.nativeElement.height-radius;y++){
        if(!this.nadjiVS(x-radius,2*radius,y-radius,2*radius)){
          continue;
        }else{
          this.xx=x;
          this.yy=y;
          this.nadjeno=true;
          break;
        }
      }
      if(this.nadjeno) break;
    }
    if(this.nadjeno==false){
      this.porukaO="nemoguce naci prostor";
    }
    else{
      let s=new Sto();
      s.pocX=this.xx-radius
      s.pocY=this.yy-radius
      s.x=this.xx;
      s.y=this.yy;
      s.width=radius*2
      s.height=radius*2
      s.id=this.id++;
      s.tip=true;
      s.naziv=this.nazivStola
      s.ispisan=true
      this.stolovi.push(JSON.parse(JSON.stringify(s)));
      this.oboji(s);
    }
    this.nadjeno=false
  }

  findSpaceR(sirina,visina){//pravougaonik
    this.porukaO="";
    for(var x=0;x<this.canvas.nativeElement.width-sirina;x++){
      for(var y=0;y<this.canvas.nativeElement.height-visina;y++){
        if(!this.nadjiVS(x,sirina,y,visina)){
          continue;
        }else{
          this.xx=x;
          this.yy=y;
          this.nadjeno=true;
          break;
        }
      }
      if(this.nadjeno) break;
    }
    if(this.nadjeno==false){
      this.porukaO="nemoguce naci prostor";
    }
    else{
      let s=new Sto();
      s.pocX=this.xx
      s.pocY=this.yy
      s.x=this.xx;
      s.y=this.yy;
      s.width=sirina
      s.height=visina
      s.id=this.id++;
      s.tip=false;
      s.naziv=this.nazivStola
      s.ispisan=true
      this.stolovi.push(JSON.parse(JSON.stringify(s)));
      this.oboji(s);
    }
    this.nadjeno=false
  }
porukaMoguce:string
  nadjiVS(x,sirina,y,duzina){
    let flag=true;
    this.stolovi.forEach((s:Sto)=>{
      if(((x>=s.pocX && x<=s.pocX+s.width)|| (x+sirina>=s.pocX && x+sirina<=s.pocX+s.width))&&
        ((y>=s.pocY && y<=s.pocY+s.height)|| (y+duzina>=s.pocY && y+duzina<=s.pocY+s.height))||
        (((x>=s.pocX && x<=s.pocX+s.width) || x<=s.pocX)&&(y<=s.pocY && y+duzina>=s.pocY+s.height))||
        (((y>=s.pocY && y<s.pocY+s.height)|| y<=s.pocY)&&(x<=s.pocX && x+sirina>=s.pocX+s.width))){
        flag=false
        return;
      }
    })
    if(!flag){
      this.porukaMoguce="ZAUZETO MESTO"
    }else{
      this.porukaMoguce=""
    }
    return flag;
  }

  oboji(s){
      if(s.tip==true){
        this.context.beginPath();
        this.context.arc(s.x, s.y, s.width/2, 0, 2 * Math.PI, false);//radius je poluprecnik
        this.context.fillStyle='rgb(244, 13, 13)'
        this.context.fill();
        this.context.font = "25px Arial";
        this.context.strokeStyle="white"
        this.context.strokeText(s.id, s.x-7, s.y+5);
        this.context.closePath()
      }
      else{
        this.context.beginPath();
        this.context.fillStyle='rgb(244, 13, 13)'
        this.context.fillRect(s.pocX,s.pocY,s.width,s.height);
        this.context.lineWidth = 5;
        this.context.strokeStyle = 'black';
        this.context.stroke();
        this.context.font = "22px Arial";
        this.context.strokeStyle="white"
        this.context.strokeText(s.id, s.pocX+s.width/2-5, s.pocY+s.width/2);
        this.context.closePath()
      }
    }

 draw(x,y,s) {
  if(s.ispisan){
    this.context.clearRect(0,0,this.canvas.nativeElement.width,this.canvas.nativeElement.height)
    this.stolovi.forEach((sto:Sto,index)=>{
      if(s.id==sto.id){
        this.stolovi.splice(index,1);
        return;
      }
    })
  }
  this.stolovi.forEach((s:Sto)=>{
    this.oboji(s)
  })
  this.context.beginPath();
  if(s.tip){//krug
    if(x>this.canvas.nativeElement.width-s.width){
      x=this.canvas.nativeElement.width-s.width
    }
    if(y>this.canvas.nativeElement.height-s.height){
      y=this.canvas.nativeElement.height-s.height
    }
    if(this.nadjiVS(x,s.width,y,s.width)){
      let st=new Sto();
      st.pocX=x
      st.pocY=y
      st.x=x+s.width/2;
      st.y=y+s.width/2;
      st.width=s.width
      st.height=s.width
      st.id=s.id
      st.tip=true;
      st.naziv=s.nazivStola
      st.ispisan=true
      this.stolovi.push(JSON.parse(JSON.stringify(st)));
      this.oboji(st);
    }
  }else{
    if(x>this.canvas.nativeElement.width-s.width){
      x=this.canvas.nativeElement.width-s.width
    }
    if(y>this.canvas.nativeElement.height-s.height){
      y=this.canvas.nativeElement.height-s.height
    }
    if(this.nadjiVS(x,s.width,y,s.height)){
      let st=new Sto();
      st.pocX=x
      st.pocY=y
      st.x=x;
      st.y=y;
      st.width=s.width
      st.height=s.height
      st.id=s.id
      st.tip=false;
      st.naziv=s.nazivStola
      st.ispisan=true
      this.stoPremestanje=st;
      this.stolovi.push(JSON.parse(JSON.stringify(st)));
      this.oboji(st);
    }
  }
}

myFunc(event){
  if(this.uslov){
    this.draw(event.clientX-this.canvas.nativeElement.getBoundingClientRect().left-10, event.clientY-this.canvas.nativeElement.getBoundingClientRect().top-10,this.stoPremestanje);
  }
  }

ubaci(){
  this.porukaO="";
  let br=0;
  if(this.nazivStola=="" || this.nazivStola==null || this.tipStola=="" || this.tipStola==null ||
  ((this.duzinaStola=="" || this.duzinaStola==null || this.sirinaStola==null || this.sirinaStola=="") && this.tipStola=="pravougaoni")
  || ((this.poluprecnikStola=="" || this.poluprecnikStola==null) && this.tipStola=="okrugli")){
    this.porukaO="moraju biti uneti svi podaci";
    return;
  }
  this.stolovi.forEach((s:Sto)=>{
    if(s.naziv==this.nazivStola){
      this.porukaO="ponovite unosenje stola, postoji sto sa istim imenom";
      br=1;
      return;
    }
  })
  if(br==1) return;
  if(this.tipStola=="okrugli"){
    if(Number.parseInt(this.poluprecnikStola)<50 || Number.parseInt(this.poluprecnikStola)>150){
      this.porukaO="nekorektna dimenzija";
      return;
    }else{
      this.findSpaceK(Number.parseInt(this.poluprecnikStola))
    }
  }else{
    if(Number.parseInt(this.duzinaStola)<50 || Number.parseInt(this.sirinaStola)>150 || Number.parseInt(this.sirinaStola)<50 || Number.parseInt(this.duzinaStola)>150){
      this.porukaO="nekorektna dimenzija";
      return;
    }else{
      this.findSpaceR(Number.parseInt(this.sirinaStola),Number.parseInt(this.duzinaStola))
    }
  }
  this.ponisti();
}

unetiTip(){
  this.unosenje=true;
}
ponisti(){
  this.unosenje=false
  this.tipStola=""
  this.duzinaStola=""
  this.sirinaStola=""
  this.nazivStola=""
  this.poluprecnikStola=""
}

premestitiSto(){
  this.premes=true;
}

odaberiSto(){
  if(this.idStola=="" || this.idStola==null){
    this.porukaO="morate odabrati sto";
    return
  }
  this.stolovi.forEach((s:Sto)=>{
    if(s.id==this.idStola){
      this.stoPremestanje=s;
      this.idStola=""
      this.uslov=true;
      this.premes=false;
      this.zavrsavanjePrem=true;
      return;
    }
  })
}
zavrsiPremestanje(){
  this.uslov=false;
  this.premes=false;
  this.zavrsavanjePrem=false;
}

odabranSto:string
stoloviPoruceno:Racun[]=[]//racuni koji jos nisu zavrseni
racun:Racun
dodajNaRac:string=''//ime stola koji je odabran za porucivanje
robaKupovina:Roba
roba:Roba[]=[]
kolicina:string
p:Preduzece
odabranaRoba=false
tipPlacanja:string
biranjeTipa:boolean
novac:string
licna:string
kusur:number
prezime:string
ime1:string
slip:string
porucivanje:boolean=false
stoZavrsio:string
nString:string
porukaNaplati:string
radiFlag:boolean=true;

stoZavrsioNaplati(){
  this.porukaKupovina=""
  this.nString=""
  this.porukaNaplati=""
  this.porukaNaruci=""
  this.porukaNaruci="";
  this.radiFlag=false
  if(this.stoZavrsio==null){
    this.nString="morate odabrati sto"
    if(this.stoloviPoruceno.length==0) this.radiFlag=true;
    return;
  }
  this.stoloviPoruceno.forEach((r:Racun,index)=>{
    if(r.naziv==this.stoZavrsio){
      this.racun=r;
      this.stoloviPoruceno.splice(index,1);
      return;
    }
  })
  this.biranjeTipa=true;
  this.stoZavrsio=null;
}
porukaNaruci:string
porucivanjeMusterije(){
  this.radiFlag=false
  this.porukaNaruci=""
  this.porukaOdaberi="";
  this.nString=""
  if(this.dodajNaRac==null || this.dodajNaRac==""){
    this.porukaNaruci="morate odabrati sto koji poručuje"
    if(this.stoloviPoruceno.length==0) this.radiFlag=true;
    return;
  }
  this.porucivanje=true
  this.stoloviPoruceno.forEach((r:Racun,index)=>{
    if(r.naziv==this.dodajNaRac){
      this.racun=r;
      this.stoloviPoruceno.splice(index,1);
      this.dodajNaRac=null;
      return;
    }})
}

dodajNaRacu(){
  if(this.porukaNaplati=="račun je već naplaćen"|| this.porukaNaplati=="naplaćeno"){
  this.biranjeTipa=false;
  this.novac=null;
  this.kusur=null;
  this.ime=null;
  this.prezime=null;
  this.licna=null;
  this.pibVirmana=null;
  this.porukaNaplati="";
  }
}
platiCek(){
  if(this.racun==null){
    this.porukaNaplati="račun je već naplaćen"
    return;
  }
  if(this.ime1==null || this.ime1=="" || this.prezime=="" || this.prezime==null||
    this.slip==null || this.slip.toString()=="" || this.licna==null || this.licna==""){
      this.porukaNaplati="nisu uneti svi podaci"
      return
    }else{
      this.racun.brLicne=this.licna
      if(!(this.licna.match(/^([0-9]){9,9}$/))){
        this.porukaNaplati="broj licne karte mora sadrzati 9 brojeva"
        return;
      }
      this.racun.ime=this.ime1
      this.racun.prezime=this.prezime
      this.racun.slip=this.slip
      if(!(this.slip.match(/^([0-9]){4,4}$/))){
        this.porukaNaplati="broj slipa mora sadrzati 4 broja"
        return;
      }
      this.racun.kor_ime=this.k.username
      this.racun.imeObjekta=this.ime
      this.racun.imePreduzeca=this.p.naziv
      this.racun.nacinPlacanja="cek"
      this.racun.pib=this.p.pib
      this.racun.imeObjekta=this.ime;
      this.racun.datum=new Date().toISOString();
      this.racunService.ubaciRacun(this.racun).subscribe((m:string)=>{
        if(m["poruka"]=="ok"){
          this.radiFlag=true
          this.racun=null
          this.porukaNaplati="naplaćeno"
        }
      });
    }
}
platiVirman(){
  if(this.racun==null){
    this.porukaNaplati="račun je već naplaćen"
    return;
  }
  if(this.pibVirmana==null){
    this.porukaNaplati="nisu odabrani svi podaci";
    return
  }
  this.racun.narucilac=this.pibVirmana
  this.racun.datum=new Date().toISOString();
  this.racun.kor_ime=this.k.username
  this.racun.imePreduzeca=this.p.naziv
  this.racun.nacinPlacanja="virman"
  this.racun.pib=this.p.pib
  this.racun.imeObjekta=this.ime;
  this.racunService.ubaciRacun(this.racun).subscribe((m:string)=>{
    if(m["poruka"]=="ok"){
      this.radiFlag=true
      this.racun=null
      this.porukaNaplati="naplaćeno"
    }
  });
}

platiGotovina(){
  if(this.racun==null){
    this.porukaNaplati="racun je već naplaćen"
    return;
  }
  if(this.novac==null || this.novac==""){
    this.porukaNaplati="nisu uneti podaci"
    return;
  }
  if(this.racun.vrednost>Number.parseInt(this.novac)){
    this.porukaNaplati="nemate dovoljno novca";
    return;
  }
  this.kusur=Number.parseInt(this.novac)-this.racun.vrednost
  this.racun.brLicne=this.licna
  if(this.licna!=null)
  if(!(this.licna.match(/^([0-9]){9,9}$/))){
    this.porukaNaplati="broj licne karte mora sadrzati 9 brojeva"
    this.kusur=null
    return;
  }
  this.racun.datum=new Date().toISOString();
  this.racun.kor_ime=this.k.username
  this.racun.imeObjekta=this.ime
  this.racun.imePreduzeca=this.p.naziv
  this.racun.nacinPlacanja="gotovina"
  this.racun.pib=this.p.pib
  this.racun.imeObjekta=this.ime;
  this.racunService.ubaciRacun(this.racun).subscribe((m:string)=>{
    if(m["poruka"]=="ok"){
      this.porukaNaplati="naplaćeno"
      this.radiFlag=true;
      this.racun=null;
    }
  });
}
porukaOdaberi:string
odaberiSlobodanSto(){
  if(this.radiFlag==false) return;
  this.porukaNaruci=""
  this.racun=new Racun()
  let flag:boolean=true
  if(this.odabranSto=="" || this.odabranSto==null){
    this.porukaOdaberi="morate odabrati sto"
    return
  }
  this.stoloviPoruceno.forEach((r:Racun)=>{
    if(r.naziv==this.odabranSto){
      this.porukaOdaberi="ZAUZET";
      flag=false;
      return;
    }
  })
  if(flag){
    this.racun.naziv=this.odabranSto;
    this.porukaOdaberi="sto je ubačen"
    this.stoloviPoruceno.push(JSON.parse(JSON.stringify(this.racun)));
  }
}

odaberiRobu(){
  if(this.robaKupovina==null){
      this.porukaNaruci="artikal nije odabran"
    }
    else{
      this.odabranaRoba=true;
      this.porukaNaruci=""
    }
}
porukaKupovina:string
kupiStavku(){
  this.porukaKupovina=""
  if(this.kolicina==null || this.kolicina==""){
    this.porukaKupovina="morate uneti zeljenu kolicinu artikla";
    return;
  }else{
    let s:Stavka=new Stavka();
    s.idRobe=this.robaKupovina.sifra
    s.naziv=this.robaKupovina.naziv
    s.kor_ime=this.robaKupovina.kor_ime
    if(Number.parseInt(this.kolicina)<0){
      this.porukaKupovina="nekorektno uneta vrednost količine"
      return;
    }
    if(this.robaKupovina.stanje<Number.parseInt(this.kolicina)){
      this.porukaKupovina="u magacinu nema kolicine koju zahtevate"
      return;
    }else{
      this.robaKupovina.stanje-=Number.parseInt(this.kolicina)
      s.kolicina=Number.parseInt(this.kolicina)
      this.robaService.promeniKolicinu(this.robaKupovina.stanje,this.robaKupovina).subscribe((m:string)=>{
        if(m["poruka"]=="ok"){
          this.racun.vrednost+=s.kolicina*this.robaKupovina.prodajna
          if(this.p.pdv==true && this.robaKupovina.stopa>0){
            this.racun.porez+=this.robaKupovina.prodajna*1/this.robaKupovina.stopa
          }else{
            this.racun.porez=0
          }
          this.racun.stavke.push(JSON.parse(JSON.stringify(s)));
        }
      }) 
    }
  }
}
  zatvoriRacun(){
    this.odabranaRoba=false;
    this.porucivanje=false
    this.stoloviPoruceno.push(JSON.parse(JSON.stringify(this.racun)));
    this.porukaKupovina=""
  }
}