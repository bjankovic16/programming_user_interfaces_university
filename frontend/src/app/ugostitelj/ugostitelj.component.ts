import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PromenaLozinkeComponent } from 'app/promena-lozinke/promena-lozinke.component';

@Component({
  selector: 'app-ugostitelj',
  templateUrl: './ugostitelj.component.html',
  styleUrls: ['./ugostitelj.component.css']
})
export class UgostiteljComponent implements OnInit {

  constructor(private dialog:MatDialog,private router:Router) { }

  ngOnInit(): void {
  }
  openDialog(){
    this.dialog.open(PromenaLozinkeComponent)
  }
  logout(){
    localStorage.setItem("prijavljen","");
    this.router.navigate(['../../'])  
  }
}
