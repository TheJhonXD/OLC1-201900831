import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  URL = "http://localhost:8080";
  constructor( private http:HttpClient ) { }

  contTextArea:string = "";

  decargarData(json:any){
    return this.http.post(`${this.URL}/texto`, json);
  }

  sendData(json:any){
    return this.http.post(`${this.URL}/code`, json);
  }

  getErrores(){
    return this.http.get(`${this.URL}/errores`);
  }

  getSimbolos(){
    return this.http.get(`${this.URL}/simbolos`);
  }

  getAST(){
    return this.http.get(`${this.URL}/codeArbol`);
  }

}
