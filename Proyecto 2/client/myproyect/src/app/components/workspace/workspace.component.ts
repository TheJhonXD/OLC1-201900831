import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent implements OnInit {

  constructor(private service:UserService) { }

  public enviar:any;

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
    this.service.sendData(json).subscribe(
      (res:any) => {
        console.log("enviado con exito");
      },
      (err) => {
        console.log(err);
      }
    );
    //console.log(this.prueba);
  }

}
