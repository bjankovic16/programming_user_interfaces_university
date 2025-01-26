import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Racun } from 'app/models/Racun';
import { Stavka } from 'app/models/Stavka';
import { RacunService } from 'app/racun.service';
import { KorisnikService } from '../korisnik.service';
import { Korisnik } from '../models/Korisnik';
import { PreduzeceService } from '../preduzece.service';

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.css']
})
export class PrijavaComponent implements OnInit {

  constructor(private korisnikService:KorisnikService,private router:Router,private servis:RacunService,private preduzeceService:PreduzeceService) { }

  ngOnInit(): void {
    this.servis.getRacuneSve().subscribe((r:Racun[])=>{
      this.racuni=r;
      this.racuni.sort((a,b)=>{
        if(new Date(a.datum).toISOString()>new Date(b.datum).toISOString())
          return -1
          else return 1;
        })
        for(let i=0;i<5 && i<this.racuni.length;i++){
          this.racuniPosl.push(JSON.parse(JSON.stringify(this.racuni[i])));
        }
        for(let j=0;j<this.racuniPosl.length;j++){
          this.racuniPosl[j].stavke.forEach((s:Stavka)=>{
            s.id=this.racuniPosl[j].id;
            this.stavke.push(JSON.parse(JSON.stringify(s)));
          })
        }
    })
  }

  password: string;
  username: string;
  message: string;
  registracija:boolean=true
  password1:string;
  password2:string;
  username1:string
  porukaRegistracijaKupca:string;
  prikaz:boolean=false;
  racuni:Racun[];
  racuniPosl:Racun[]=[];
  stavke:Stavka[]=[];

  prijavaAdmin(){
    this.router.navigate(["prijavaAdmin"])
  }

  prijava(){
    this.korisnikService.prijavaNaSistem(this.username,this.password).subscribe((korisnik:Korisnik)=>{
      if(!korisnik || korisnik.tip=="a"||korisnik.registrovan==false){
        this.message="uneli ste loš e-mail ili lozinku";
      }else{
        localStorage.setItem('prijavljen', JSON.stringify(korisnik));
        if(korisnik.tip=="k"){
          this.router.navigate(["kupac"])
        }else if(korisnik.tip=="p"){
          this.router.navigate(["prodavnica"])
        }else if(korisnik.tip=="u"){
          this.router.navigate(["ugostitelj"])
        }else if(korisnik.tip==""){
          this.router.navigate(["preduzece"])
        }
      }
    })
  }
}
