import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { wasmFolder } from '@hpcc-js/wasm';
import { graphviz } from 'd3-graphviz';
// import '../../../../node_modules/d3/dist/d3.js';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent implements OnInit {

  constructor(private service:UserService) { }

  public astGraph:any;
  public contenido = this.service.contTextArea;

  ngOnInit(): void {
  }

  readFile(evento:any){
    //console.log("XD");
    let areaTexto:any = document.querySelector('#codigo');
    let file = evento.target.files[0];
    if (file){
      let reader = new FileReader();
      reader.onload = function(e){
        let contenido = e.target?.result;
        areaTexto.value = contenido;
      };
      reader.readAsText(file);
    }
  }

  sendText(){
    let areaTexto:any = document.querySelector('#codigo');
    let json = {
      code: areaTexto.value
    }
    this.service.contTextArea = areaTexto.value;
    this.service.sendData(json).subscribe(
      (res:any) => {
        console.log("enviado a backend con exito");
        this.astGraph = res;
        console.log(this.astGraph.message);
      },
      (err) => {
        console.log(err);
      }
    );
    //console.log(this.prueba);
  }

  d3Graph(){
    // wasmFolder('/client/myproyect/src/assets');
    // graphviz('#graph').renderDot('digraph {node[shape=\"box\" style="rounded" fontname="Helvetica"] n1497[label="Global"];n1494[label="tinicio = inicio"];n1497->n1494;}')
    // this.service.getData
  }

  limpiar(){
    let areaTexto:any = document.querySelector('#codigo');
    areaTexto.value = "";
  }


}


