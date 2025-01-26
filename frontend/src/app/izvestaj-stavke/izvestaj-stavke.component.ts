import { Component, OnInit } from '@angular/core';
import { Korisnik } from 'app/models/Korisnik';
import { Preduzece } from 'app/models/Preduzece';
import { Racun } from 'app/models/Racun';
import { Stavka } from 'app/models/Stavka';
import { PreduzeceService } from 'app/preduzece.service';
import { RacunService } from 'app/racun.service';

@Component({
  selector: 'app-izvestaj-stavke',
  templateUrl: './izvestaj-stavke.component.html',
  styleUrls: ['./izvestaj-stavke.component.css']
})
export class IzvestajStavkeComponent implements OnInit {

  constructor(private service:RacunService,private serviceP:PreduzeceService) {}

  ngOnInit(): void {
    this.k=JSON.parse(localStorage.getItem("prijavljen"))
    this.service.getRacune(this.k.username).subscribe((r:Racun[])=>{
      this.racuni=r
    })
    this.serviceP.getPreduzece(this.k.username).subscribe((p:Preduzece)=>{
      this.pdv=p.pdv;
    })
  }

  k:Korisnik
  pdv:boolean
  racuni:Racun[];
  idRacuna;
  stavka:Stavka[];

  odaberi(){
    if(this.idRacuna==null){
      alert("niste odabrali racun");
      return;
    }
    this.racuni.forEach((r:Racun)=>{
      if(r.id==this.idRacuna){
        this.stavka=r.stavke
        return;
      }
    })
  }

}
