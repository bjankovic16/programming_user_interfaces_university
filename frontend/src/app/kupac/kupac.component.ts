import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Roba } from 'app/models/Roba';
import { PromenaLozinkeComponent } from 'app/promena-lozinke/promena-lozinke.component';
import { RobaService } from 'app/roba.service';

@Component({
  selector: 'app-kupac',
  templateUrl: './kupac.component.html',
  styleUrls: ['./kupac.component.css']
})
export class KupacComponent implements OnInit {

  constructor(private service:RobaService,private dialog:MatDialog,private router:Router) { }

  ngOnInit(): void {
    this.service.getRobaPP(this.proizvod,this.proizvodjac).subscribe((p:Roba[])=>{
      this.proizvodi=p
    })
  }

  proizvod:string=""
  proizvodjac:string=""
  potvrda:boolean=false
  najnizaCena:boolean=false
  proizvodi:Roba[]
  proizvodiNajniza:Roba[]=[]

  onChangeEvent(event: any){
    this.service.getRobaPP(this.proizvod,this.proizvodjac).subscribe((p:Roba[])=>{
      this.proizvodi=p
    })
    if(this.najnizaCena==true){
      this.najnizaCenaFun(event)
    }
  }

  najnizaCenaFun(event:any){
    let cnt=0;
    let flagNastavak=true;
    this.proizvodiNajniza.length=0
    if(this.najnizaCena){
      for(let i=0;i<this.proizvodi.length;i++){
        for(let j=0;j<this.proizvodiNajniza.length;j++){
          if(this.proizvodiNajniza[j].naziv==this.proizvodi[i].naziv) {
            flagNastavak=false;
            break;
          }
          else cnt++;
        }
        if(cnt==this.proizvodiNajniza.length && flagNastavak){
          this.proizvodiNajniza.push(JSON.parse(JSON.stringify(this.proizvodi[i])));
          for(let k=i+1;k<this.proizvodi.length;k++){
            if(this.proizvodiNajniza[cnt].naziv==this.proizvodi[k].naziv &&
              this.proizvodiNajniza[cnt].prodajna>this.proizvodi[k].prodajna){
                this.proizvodiNajniza[cnt]=JSON.parse(JSON.stringify(this.proizvodi[k]))
              }
          }
        }
        cnt=0;
        flagNastavak=true;
      }
      this.proizvodi=this.proizvodiNajniza
    }else{
      this.service.getRobaPP(this.proizvod,this.proizvodjac).subscribe((p:Roba[])=>{
        this.proizvodi=p
      })
    }
  }
  openDialog(){
    this.dialog.open(PromenaLozinkeComponent)
  }
  logout(){
    localStorage.setItem("prijavljen","");
    this.router.navigate(['../../'])  
  }
}
