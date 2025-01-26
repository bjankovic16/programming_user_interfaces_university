import { Component, OnInit } from '@angular/core';
import { Izvestaj } from 'app/models/Izvestaj';
import { Korisnik } from 'app/models/Korisnik';
import { Preduzece } from 'app/models/Preduzece';
import { Racun } from 'app/models/Racun';
import { PreduzeceService } from 'app/preduzece.service';
import { RacunService } from 'app/racun.service';

@Component({
  selector: 'app-dnevni-pazar',
  templateUrl: './dnevni-pazar.component.html',
  styleUrls: ['./dnevni-pazar.component.css']
})
export class DnevniPazarComponent implements OnInit {

  constructor(private service:RacunService,private serviceP:PreduzeceService) {}

  ngOnInit(): void {
    this.k=JSON.parse(localStorage.getItem("prijavljen"))
    this.service.getRacune(this.k.username).subscribe((r:Racun[])=>{
      this.racuni=r
      this.formirajTabelu()
    })
    this.serviceP.getPreduzece(this.k.username).subscribe((p:Preduzece)=>{
      this.pdv=p.pdv;
    })
  }

  k:Korisnik
  pdv:boolean
  racuni:Racun[];
  izvestaj:Izvestaj[]=[];

  formirajTabelu(){
    this.racuni.forEach((r:Racun)=>{
      r.datum=new Date(r.datum).toDateString();
      let flag=false
      for(let i=0;i<this.izvestaj.length;i++){
        if(this.izvestaj[i].datum==r.datum){
          flag=true;
          this.izvestaj[i].porez+=r.porez;
          this.izvestaj[i].vrednost+=r.vrednost
        }
      }
      if(!flag){
        let i=new Izvestaj();
        i.datum=r.datum
        i.porez=r.porez
        i.vrednost=r.vrednost
        this.izvestaj.push(JSON.parse(JSON.stringify(i)));
      }
      flag=false
    })
  }
  

}
