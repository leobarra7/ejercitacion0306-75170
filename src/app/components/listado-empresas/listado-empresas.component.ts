import { Component, OnInit } from '@angular/core';
import {ListadoempresasserviceService} from '../../services/listadoempresasservice.service';
import {ListadoEmpresa, ListadoEmpresas} from '../../models/listado-empresa';

@Component({
  selector: 'app-listado-empresas',
  templateUrl: './listado-empresas.component.html',
  styleUrls: ['./listado-empresas.component.css']
})
export class ListadoEmpresasComponent implements OnInit {
  Items: ListadoEmpresas[] = [];
  Titulo = "Listado Empresas"
  constructor(
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

}