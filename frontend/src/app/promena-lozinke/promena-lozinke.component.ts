import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from 'app/korisnik.service';
import { Korisnik } from 'app/models/Korisnik';

@Component({
  selector: 'app-promena-lozinke',
  templateUrl: './promena-lozinke.component.html',
  styleUrls: ['./promena-lozinke.component.css']
})
export class PromenaLozinkeComponent implements OnInit {

  constructor(private service:KorisnikService,private router:Router) { }

  ngOnInit(): void {
    this.k=JSON.parse(localStorage.getItem("prijavljen"));
  }

  k:Korisnik
  pas:string
  pas1:string
  pas2:string
  poruka:string
  potvrdi(){
    if(this.pas1==null || this.pas2==null|| this.pas==null){
      this.poruka="nisu uneti svi podaci"
      return;
    }
    if(this.pas!=this.k.password){
      this.poruka="lozinka nije tačna"
      return;
    }
    if(this.pas1!=this.pas2){
      this.poruka="lozinke nisu iste";
      return;
    }
    if(!this.pas1.match(/^[a-zA-Z]((?<=[A-Z])|(?=.*[A-Z]))(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,12}$/)){
      this.poruka="niste uneli lozinku u formatu pocetak slovo bar jedna cifra, jedan specijalni karakter i jedno veliko slovo i duzina od 8 do 12"
      return;
    }
    this.service.promeniLozinku(this.k.username,this.pas1).subscribe((p:string)=>{
      if(p["poruka"]=="ok"){
        localStorage.setItem("prijavljen","");
        this.router.navigate(['../../'])  
      }
    })
  }
}
