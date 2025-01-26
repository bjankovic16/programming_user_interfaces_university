import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'app/models/Korisnik';
import { RasporedStoComponent } from 'app/raspored-sto/raspored-sto.component';

@Component({
  selector: 'app-unos-stolova',
  templateUrl: './unos-stolova.component.html',
  styleUrls: ['./unos-stolova.component.css']
})

export class UnosStolovaComponent implements OnInit {

  @ViewChild('container',{read:ViewContainerRef,static:true})
  container:ViewContainerRef

  constructor(private router:Router) { 
    window.addEventListener('popstate',e=>{
      localStorage.setItem("stolovi"+this.k.username,JSON.stringify(this.imena))
    })
  }

  ngOnInit(): void {
    this.k=JSON.parse(localStorage.getItem("prijavljen"));
    if(JSON.parse(localStorage.getItem("stolovi"+this.k.username))){
      this.imena=JSON.parse(localStorage.getItem("stolovi"+this.k.username))
      this.imena.forEach((s:string)=>{
        const component=this.container.createComponent(RasporedStoComponent)
        component.instance.ime=s;
      })
    }
  }

  k:Korisnik
  unos:boolean=false;
  ime:string
  flag:boolean=true
  imena:string[]=[];

  obrisi(){
    localStorage.setItem("stolovi"+this.k.username,JSON.stringify([]));
    window.location.reload()
  }

  unesiOdeljenje(){
    this.unos=true
  }
  potvrda(){
    if(this.ime==null || this.ime==""){
      alert("nisu uneti svi podaci");
      return;
    }
    this.imena.forEach((s:string)=>{
      if(s==this.ime){
        alert("dati objekat vec postoji")
        this.flag=false
        return
      }
    })
    if(this.flag){
      this.unos=false
      const component=this.container.createComponent(RasporedStoComponent)
      component.instance.ime=this.ime;
      this.imena.push(JSON.parse(JSON.stringify(this.ime)))
    }
  }

}
