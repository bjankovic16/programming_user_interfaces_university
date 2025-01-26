import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient){}

  url="http://localhost:4000"

  prijava(username, password){
    const data={
      username: username,
      password: password
    }
    return this.http.post(`${this.url}/prijavaAdmin`,data);
  }

  promeniLozinku(username,pas){
    const data={
      username:username,
      pas:pas
    }
    return this.http.post(`${this.url}/promeniLozAdmin`,data);
  }

}
