import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { KorisnikService } from 'app/korisnik.service';
import { Preduzece } from 'app/models/Preduzece';
import { Racun } from 'app/models/Racun';
import { PreduzeceService } from 'app/preduzece.service';
import { PromenaAdminComponent } from 'app/promena-admin/promena-admin.component';
import { PromenaLozinkeComponent } from 'app/promena-lozinke/promena-lozinke.component';
import { RacunService } from 'app/racun.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private dialog:MatDialog,private router:Router,private servisPred:PreduzeceService,private korisnikService:KorisnikService,private service:RacunService) { }

  ngOnInit(): void {
    this.servisPred.getNeregistrovana().subscribe((p:Preduzece[])=>{
      this.neregistrovana=p
    })
  }

  ime:string
  prezime:string
  telefon:string
  licna:string
  kor_ime:string
  lozinka:string
  message:string
  naziv:string=""
  pib:string=""
  datumOd:string
  datumDo:string
  poPib:boolean=false
  poNazivu:boolean=false;
  racuni:Racun[]
  racuniPrikaz:Racun[];
  mes:string
  neregistrovana:Preduzece[];

  onChangeEvent(event: any){
    if(this.datumDo==null ||this.datumOd==null){
      this.mes="morate odabrati datume"
      return
    }
    this.service.getRacuneDatumOdDo(this.datumOd,this.datumDo,this.naziv,this.pib).subscribe((r:Racun[])=>{
      this.racuni=r;
      this.racuniPrikaz=[]
      for(let i=0;i<this.racuni.length;i++){
        let num=0;
        for(let j=0;j<this.racuniPrikaz.length;j++){
          if(this.racuni[i].imePreduzeca==this.racuniPrikaz[j].imePreduzeca){
            this.racuniPrikaz[j].vrednost+=this.racuni[i].vrednost
            this.racuniPrikaz[j].porez+=this.racuni[i].porez
            break;
          }
          num++;
        }
        if(num==this.racuniPrikaz.length){
          this.racuniPrikaz.push(JSON.parse(JSON.stringify(this.racuni[i])))
        }
        num=0;
      }
    })
  }

  registruj(kor_ime){
    this.servisPred.registruj(kor_ime).subscribe((p:string)=>{
      if(p["poruka"]=="ok"){
        this.korisnikService.registruj(kor_ime).subscribe((p:string)=>{
          if(p["poruka"]=="ok") window.location.reload();
        })
      }
    })
  }
  obrisi(kor_ime){
    this.servisPred.obrisi(kor_ime).subscribe((p:string)=>{
      if(p["poruka"]=="ok"){
        this.korisnikService.obrisi(kor_ime).subscribe((p:string)=>{
          if(p["poruka"]=="ok") window.location.reload();
        })
      }
    })
  }
  openDialog(){
    this.dialog.open(PromenaAdminComponent)
  }
  logout(){
    localStorage.setItem("prijavljen","");
    this.router.navigate(['../../'])  
  }
}
