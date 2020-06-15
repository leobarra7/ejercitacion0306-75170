import { Component, OnInit } from '@angular/core';
import {ListadoempresasserviceService} from '../../services/listadoempresasservice.service';
import {ListadoEmpresa, ListadoEmpresas} from '../../models/listado-empresa';
import { ReactiveFormsModule } from "@angular/forms";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-listado-empresas',
  templateUrl: './listado-empresas.component.html',
  styleUrls: ['./listado-empresas.component.css']
})
export class ListadoEmpresasComponent implements OnInit {
  Items: ListadoEmpresa[] = [];
  Titulo = "Listado Empresas"
  TituloAccionBM = {
    B:"(Eliminar)",
    M:"(Editar)",
    L:"(Listado)"
  };
  AccionBM = "L"; //INICIALMENTE INICIA EN EL LISTADO DE EMPRESAS 
  Mensajes = {
    SD: " No se encontraron registros...",
    RD: " Revisar los datos ingresados..."
  };
  FormRegEmp: FormGroup;
  constructor(
    public formbuilder: FormBuilder,
    private listadoEmpresasService: ListadoempresasserviceService
  ) { }

  ngOnInit() {
    this.GetEmpresasListado();
  }

  GetEmpresasListado() {
    this.listadoEmpresasService.get()
    .subscribe((res:ListadoEmpresa[]) => {
      this.Items = res;
    });
  }
    // Obtengo un registro especifico según el Id
  BuscarPorId(Dto, AccionBM) {
    window.scroll(0, 0); // ir al incio del scroll
    this.AccionBM = AccionBM;
  }

    //comienza la modificacion, luego la confirma con el metodo Grabar
  Editar(Dto) {
    this.AccionBM = "M";
  }
   // grabar tanto altas como modificaciones
  Grabar() {
    alert("Registro Grabado!");
    this.Volver();
  }
  // Volver desde Agregar/Modificar
  Volver() {
    this.AccionBM = "L";
  }

}