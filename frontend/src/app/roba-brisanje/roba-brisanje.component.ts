import { Component, OnInit } from '@angular/core';
import { Roba } from 'app/models/Roba';
import { RobaService } from 'app/roba.service';

@Component({
  selector: 'app-roba-brisanje',
  templateUrl: './roba-brisanje.component.html',
  styleUrls: ['./roba-brisanje.component.css']
})
export class RobaBrisanjeComponent implements OnInit {

  constructor(private service:RobaService) { }

  ngOnInit(): void {
  }

  roba:Roba

  potvrdi(){
    this.roba=JSON.parse(localStorage.getItem("robaBrisanje"));
    this.service.obrisi(this.roba).subscribe((m:string)=>{
      if(m["poruka"]=="ok"){
        window.location.reload();
      }})
  }
}
