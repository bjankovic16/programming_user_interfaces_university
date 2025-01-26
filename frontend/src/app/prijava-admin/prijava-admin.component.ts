import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { Admin } from '../models/Admin';

@Component({
  selector: 'app-prijava-admin',
  templateUrl: './prijava-admin.component.html',
  styleUrls: ['./prijava-admin.component.css']
})
export class PrijavaAdminComponent implements OnInit {

  constructor(private adminServis:AdminService,private router:Router) { }

  ngOnInit(): void {}

  
  username:String;
  password:String;
  message:String;

  prijavaAdmin(){
    this.adminServis.prijava(this.username,this.password).subscribe((a:Admin)=>{
      if(a==null){
        this.message="neispravno uneti podaci"
        return;}
      else
        localStorage.setItem("admin",JSON.stringify(a));
        this.router.navigate(["admin"])                          
    })
  }

}
