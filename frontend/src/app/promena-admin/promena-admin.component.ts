import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'app/admin.service';
import { Admin } from 'app/models/Admin';

@Component({
  selector: 'app-promena-admin',
  templateUrl: './promena-admin.component.html',
  styleUrls: ['./promena-admin.component.css']
})
export class PromenaAdminComponent implements OnInit {

  constructor(private service:AdminService,private router:Router) { }

  ngOnInit(): void {
    this.a=JSON.parse(localStorage.getItem("admin"));
  }

  a:Admin
  pas:string
  pas1:string
  pas2:string
  poruka:string
  
  potvrdi(){
    if(this.pas1==null || this.pas2==null|| this.pas==null){
      this.poruka="nisu uneti svi podaci"
      return;
    }
    if(this.pas!=this.a.password){
      this.poruka="lozinka nije tačna"
      return;
    }
    if(this.pas1!=this.pas2){
      this.poruka="lozinke nisu iste";
      return;
    }
    this.service.promeniLozinku(this.a.username,this.pas1).subscribe((p:string)=>{
      if(p["poruka"]=="ok"){
        localStorage.setItem("admin","");
        this.router.navigate(['../../'])  
      }
    })
  }

}

