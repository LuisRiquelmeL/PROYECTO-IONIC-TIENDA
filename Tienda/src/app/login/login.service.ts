import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  getUsuarios(){
    //retornamos una lista de productos
    return this.http.get('http://localhost:1337/Users')
    
  }


}
