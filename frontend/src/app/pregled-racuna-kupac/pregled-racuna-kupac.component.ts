import { Component, OnInit } from '@angular/core';
import { Korisnik } from 'app/models/Korisnik';
import { Racun } from 'app/models/Racun';
import { RacunService } from 'app/racun.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-pregled-racuna-kupac',
  templateUrl: './pregled-racuna-kupac.component.html',
  styleUrls: ['./pregled-racuna-kupac.component.css']
})
export class PregledRacunaKupacComponent implements OnInit {

  constructor(private service:RacunService) { }

  ngOnInit(): void {
    this.k=JSON.parse(localStorage.getItem("prijavljen"))
    this.date=new Date();
    for(let i=0;i<12;i++){
      this.vrednostGodisnje.push(0);
    }
    let mesec=this.date.getMonth()+1
    if(mesec==1|| mesec==3|| mesec==5||mesec==7||mesec==8||mesec==10||mesec==12){
      for(let k=0;k<31;k++){
        this.vrednostiMesecne.push(0);
        this.brojDana.push(k+1+"")
      }
    }
    if(mesec==4|| mesec==6|| mesec==9||mesec==11){
      for(let k=0;k<30;k++){
        this.vrednostiMesecne.push(0);
        this.brojDana.push(k+1+"")
      }
    }
    if(mesec==2 && this.date.getFullYear()%4==0){
      if(this.date.getFullYear()%4==0)
        for(let k=0;k<29;k++){
          this.vrednostiMesecne.push(0);
          this.brojDana.push(k+1+"")
        }
      else{
        for(let k=0;k<28;k++){
          this.vrednostiMesecne.push(0);
          this.brojDana.push(k+1+"")
        }
      }
    }
    this.service.getRacuneLicna(this.k.licna).subscribe((r:Racun[])=>{
      this.racuni=r
      let godinaUpored=new Date();
      godinaUpored.setFullYear(new Date().getFullYear()-1)
      this.racuni.forEach((r:Racun)=>{
        let datu=new Date(r.datum)
        if(datu.toISOString()>godinaUpored.toISOString()){
          this.vrednostGodisnje[datu.getMonth()]+=r.vrednost;
        }
        if(datu.getFullYear()==godinaUpored.getFullYear()+1 &&
        datu.getMonth()==godinaUpored.getMonth()){
          this.vrednostiMesecne[datu.getDate()-1]+=r.vrednost
        }
      })
      var myChart = new Chart("myChart", {
        type: 'bar',
        data: {
            labels: ['Januar', 'Februar', 'Mart', 'April', 'Maj', 'Jun'
            ,'Jul','Avgust','Septembar','Oktobar','Novembar','Decembar'],
            datasets: [{
                label: '# of Votes',
                data: this.vrednostGodisnje,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
     })
     var myChart2 = new Chart("myChart2", {
      type: 'bar',
      data: {
          labels: this.brojDana,
          datasets: [{
              label: '# of Votes',
              data: this.vrednostiMesecne,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
   })
   })
  }

  k:Korisnik
  racuni:Racun[];
  racuniGodisnji:Racun[]=[]
  vrednostGodisnje:number[]=[]
  racuniMesec:Racun[]=[]
  vrednostiMesecne:number[]=[]
  brojDana:String[]=[]
  detalji:boolean=false
  rac:Racun
  date:Date;

  dodatniDetalji(r:Racun){
    this.detalji=true;
    this.rac=r;
    this.rac.datum=new Date(this.rac.datum).toDateString();
  }
  zatvoriPregled(){
    this.detalji=false;
  }
}
