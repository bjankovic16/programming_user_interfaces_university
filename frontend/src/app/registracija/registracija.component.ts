import { Component, OnInit } from '@angular/core';
import { KorisnikService } from 'app/korisnik.service';
import { PreduzeceService } from 'app/preduzece.service';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css']
})
export class RegistracijaComponent implements OnInit {

  constructor(private korisnikService:KorisnikService,private preduzeceService:PreduzeceService) {}

  ngOnInit(): void {
    if(window.location.pathname=="/registracijaA"){
      this.prikaz=true
      this.reg=true;
    }
  }
  unesiKorisnika(){
    if(this.ime==null || this.prezime==null || this.telefon==null|| this.licna==null ||
    this.kor_ime==null || this.lozinka==null){
      this.porukaRegistracija1="nisu uneti svi podaci"
      return;
    }

    if(!this.lozinka.match(/^[a-zA-Z]((?<=[A-Z])|(?=.*[A-Z]))(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,12}$/)){
      this.porukaRegistracija1="niste uneli lozinku u formatu pocetak slovo bar jedna cifra, jedan specijalni karakter i jedno veliko slovo i duzina od 8 do 12"
      return;
    }
    if(!this.telefon.match(/^\+[0-9]*$/)){
      this.porukaRegistracija1="broj nije u vazecem formatu"
      return;
    }
    if(!this.ime.match(/^[A-Z][a-z]*$/)){
      this.porukaRegistracija1="ime mora pocinjati velikim slovom i sadrzati samo slova"
      return;
    }

    if(!this.prezime.match(/^[A-Z][a-z]*$/)){
      this.porukaRegistracija1="prezime mora pocinjati velikim slovom i sadrzati samo slova"
      return
    }
    if(!this.licna.match(/^([0-9]){9,9}$/)){
      this.porukaRegistracija1="broj licne karte mora sadrzati 9 brojeva"
      return;
    }
    this.korisnikService.ubaciKorisnika(this.kor_ime,this.lozinka,true,"k").subscribe((m:String)=>{
      if(m["poruka"]!="ok"){
        this.porukaRegistracija1="postoji korisnik sa korisnickim imenom";
        return;
      }else{
        this.korisnikService.dodaci(this.ime,this.prezime,this.telefon,this.licna,this.kor_ime).subscribe((m:String)=>{
          if(m["poruka"]=="ok"){
            this.porukaRegistracija1="korisnik je uspesno dodat"
            this.ime=null;this.prezime=null;this.kor_ime=null;
            this.licna=null;this.lozinka=null;this.telefon=null;
          }
        })
      }
    })
  }

  porukaRegistracija1:string
  licna:string
  prikaz:boolean=false
  reg:boolean=false
  registracija:boolean=false
  porukaRegistracija:string
  ime: string;
  prezime: string;
  kor_ime:string;
  lozinka:string;
  telefon:string;
  e_mail:string;
  naziv:string;
  drzava:string;
  grad:string;
  postanskiBr: string;
  ulica: string;
  broj: string;
  pib: string;
  matBr:string;
  pas1:string;
  pas2:string;
  selectedFile=null
  username1:string
  password1:string
  password2:string

  regPreduzece(){
    if(this.ime==null ||this.prezime==null || this.kor_ime==null || this.pas1==null || this.pas2==null || this.telefon==null
    || this.e_mail==null || this.naziv==null || this.drzava==null || this.grad==null || this.postanskiBr==null ||
    this.ulica==null || this.broj==null || this.pib==null || this.matBr==null||this.selectedFile==null) {
      this.porukaRegistracija="nisu uneti svi podaci"
      return
    }
    if(this.pas1!=this.pas2){
      this.porukaRegistracija="niste uneli istu lozinku";
      return;
    }else{
      this.lozinka=this.pas1;
    }
    if(!this.pas1.match(/^[a-zA-Z]((?<=[A-Z])|(?=.*[A-Z]))(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,12}$/)){
      this.porukaRegistracija="niste uneli lozinku u formatu pocetak slovo bar jedna cifra, jedan specijalni karakter i jedno veliko slovo i duzina od 8 do 12"
      return;
    }
    if(!this.telefon.match(/^\+[0-9]*$/)){
      this.porukaRegistracija="broj nije u vazecem formatu"
      return;
    }

    if(!this.e_mail.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
      this.porukaRegistracija="e-mail nije u vazecem formatu"
      return;
    }

    this.preduzeceService.istiMail(this.e_mail).subscribe((p:String)=>{
      if(p["poruka"]!="ok"){
        this.porukaRegistracija="postoji isti mail"
        return;
      }
    })

    if(!this.ime.match(/^[A-Z][a-z]*$/)){
      this.porukaRegistracija="ime mora pocinjati velikim slovom i sadrzati samo slova"
      return;
    }

    if(!this.prezime.match(/^[A-Z][a-z]*$/)){
      this.porukaRegistracija="prezime mora pocinjati velikim slovom i sadrzati samo slova"
      return
    }

    if(!this.drzava.match(/^[A-Z][A-Za-z\s]*$/)){
      this.porukaRegistracija="drzava mora pocinjati velikim slovom i sadrzati samo karaktere"
      return;
    }

    if(!this.grad.match(/^[A-Z][A-Za-z\s]*$/)){
      this.porukaRegistracija="grad mora pocinjati velikim slovom i sadrzati samo karaktere"
      return;
    }

    if(!this.pib.match(/^[1-9]([0-9]){8,8}$/)){
      this.porukaRegistracija="pib mora pocinjati cifrom koja nije 0 i sadrzati 9 cifara"
      return;
    }

    if(!this.matBr.match(/^[1-9]([0-9]){7,7}$/)){
      this.porukaRegistracija="maticni broj firme mora pocinjati cifrom koja nije 0 i sadrzati 8 cifara"
      return;
    }
    this.korisnikService.ubaciKorisnika(this.kor_ime,this.pas1,this.reg,"").subscribe((m:String)=>{
      if(m["poruka"]!="ok"){
        this.porukaRegistracija="postoji korisnik sa korisnickim imenom";
        return;
      }else{
        const res=new FormData();
        res.append("image",this.selectedFile)
        this.preduzeceService.upload(res).subscribe((m:String)=>{
          if(m["poruka"]!="ok"){
            this.porukaRegistracija="nemoguce ubacivanje slike";
          }
         })

        this.preduzeceService.registrovanjePreduzeca(this.ime, this.prezime,this.kor_ime,this.lozinka,
          this.telefon,this.e_mail,this.naziv,this.drzava,this.grad,this.postanskiBr,this.ulica,
          this.broj,this.pib,this.matBr,this.reg).subscribe((m:String)=>{
            if(m["poruka"]=="ok"){
              this.porukaRegistracija="firma je registrovana"
              window.location.reload();
            }
          })
        }
      })
  }
  onFileSelected(event){
    this.selectedFile=event.target.files[0]
  }


}
