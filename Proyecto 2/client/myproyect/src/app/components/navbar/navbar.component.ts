import { Component, OnInit } from '@angular/core';
import { wasmFolder } from '@hpcc-js/wasm';
import { graphviz } from 'd3-graphviz';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private service:UserService) { }
  public cabecera = [];
  public valores = [];

  public response:any;

  public element = false;
  public elementast = false;
  public nombre = "";

  ngOnInit(): void {
    wasmFolder('/client/myproyect/src/assets');
  }

  limpiar(e:any){
    e.preventDefault();
    
    console.log(this.service.contTextArea);
    this.service.contTextArea = "";
    console.log(this.service.contTextArea);
  }

  descargar(){
    let json = {
      code: this.service.contTextArea
    }
    this.service.decargarData(json).subscribe(
      (res:any) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  downloadFile(e:any) {
    e.preventDefault();
    
    const blob = new Blob([this.service.contTextArea], { type: 'text' });
    const url= window.URL.createObjectURL(blob);
    window.open(url);
  }

  getListaError(e:any){
    e.preventDefault();
    if (this.element == false){
      this.element = true;
    }else{
      this.element = false;
    }
    this.service.getErrores().subscribe(
      (res:any) => {
        this.response = res;
        this.cabecera = this.response.header;
        this.valores = this.response.lista;
        this.nombre = "Errores";
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getTablaSimbolo(e:any){
    e.preventDefault();
    if (this.element == false){
      this.element = true;
    }else{
      this.element = false;
    }

    this.service.getSimbolos().subscribe(
      (res:any) => {
        this.response = res;
        this.cabecera = this.response.header;
        this.valores = this.response.lista;
        this.nombre = "Simbolos";
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getAST(e:any){
    e.preventDefault();
    if (this.elementast == false){
      this.elementast = true;
    }else{
      this.elementast = false;
    }

    this.service.getAST().subscribe(
      (res:any) => {
        this.response = res;
        console.log(this.response.codeAST);
        // wasmFolder('/client/myproyect/src/assets');
        // graphviz('#graph',{useWorker: false}).renderDot(this.response.codeAST);
        alert("AST creado");
      },
      (err) => {
        console.log(err);
      }
    );
  }


}
